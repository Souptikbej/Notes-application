import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Edit3,
  Trash2,
  Save,
  X,
  FileText,
  ArrowLeft,
  LoaderCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Snowfall from "react-snowfall";

/* Page animation */
const pageAnim = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

/* Card animations */
const cardVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const Notedetailspage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [draft, setDraft] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showSnow, setShowSnow] = useState(false);

  /* Enable snowfall only on desktop */
  useEffect(() => {
    if (window.innerWidth > 768) setShowSnow(true);
  }, []);

  /* Fetch note */
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setDraft({
          title: res.data?.title || "",
          content: res.data?.content || "",
        });
      } catch {
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  /* Save note */
  const handleSave = async () => {
    if (!draft.title.trim() || !draft.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setSaving(true);
      const res = await api.put(`/notes/${id}`, draft);
      setNote(res.data);
      setIsEditing(false);
      toast.success("Note updated");
      navigate("/");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* Delete note */
  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white gap-3">
        <LoaderCircle className="animate-spin w-6 h-6" />
        Loading note...
      </div>
    );
  }

  /* Not found */
  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Note not found
      </div>
    );
  }

  return (
    <motion.main
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 overflow-hidden"
    >
      {/* Snowfall */}
      {showSnow && (
        <Snowfall
          snowflakeCount={70}
          color="#82C3D9"
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="
          relative
          max-w-2xl mx-auto w-full
          rounded-3xl
          bg-white/5
          backdrop-blur-sm
          border border-white/20
          shadow-[0_0_80px_rgba(99,102,241,0.18)]
          p-6 sm:p-8
          text-white
          overflow-hidden
        "
      >
        {/* Glow orbs */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl" />

        {/* Back */}
        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-6"
          >
            <ArrowLeft size={16} />
            Back to Notes
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mb-6"
        >
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-white/20">
            <FileText className="text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold">Note Details</h1>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants}>
          {isEditing ? (
            <input
              value={draft.title}
              onChange={(e) =>
                setDraft((d) => ({ ...d, title: e.target.value }))
              }
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          ) : (
            <h2 className="text-xl font-semibold mb-4">{note.title}</h2>
          )}
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants}>
          {isEditing ? (
            <textarea
              rows="6"
              value={draft.content}
              onChange={(e) =>
                setDraft((d) => ({ ...d, content: e.target.value }))
              }
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
          ) : (
            <p className="text-gray-200 whitespace-pre-line leading-relaxed">
              {note.content}
            </p>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 mt-8">
          {isEditing ? (
            <>
              <button
                disabled={saving}
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 py-2 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition disabled:opacity-50"
              >
                <Save size={18} />
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setDraft(note);
                  setIsEditing(false);
                }}
                className="flex-1 bg-white/10 border border-white/20 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition"
              >
                <X size={18} />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 py-2 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition"
              >
                <Edit3 size={18} />
                Edit
              </button>

              <button
                onClick={() => setShowDelete(true)}
                className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 py-2 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Delete Modal */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 text-white rounded-2xl p-6 w-full max-w-sm"
          >
            <h3 className="text-lg font-bold mb-3">Delete Note?</h3>
            <p className="text-gray-400 mb-6">This action cannot be undone.</p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 transition py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 transition py-2 rounded-xl"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.main>
  );
};

export default Notedetailspage;
