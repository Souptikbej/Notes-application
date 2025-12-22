import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Edit3,
  Trash2,
  Save,
  X,
  FileText,
  ArrowLeft,
  LoaderCircleIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../lib/axios";
import toast from "react-hot-toast";

/* Page animation */
const pageAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const Notedetailspage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log({ id });

  const [note, setNote] = useState();
  const [draft, setDraft] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  /* Fetch note */
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  console.log({ note });
  /* Sync draft AFTER note loads */
  useEffect(() => {
    if (note) setDraft(note);
  }, [note]);

  /* Save */
  const handleSave = async () => {
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

  /* Delete */
  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <LoaderCircleIcon className="animate-spin size-15" />
        Loading note...
      </div>
    );
  }

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
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4"
    >
      {/* Back button */}
      <div className="max-w-2xl mx-auto mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back to Notes
        </Link>
      </div>

      {/* Card */}
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <FileText className="text-indigo-400" />
          <h1 className="text-2xl font-bold">Note Details</h1>
        </div>

        {/* Title */}
        {isEditing ? (
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 mb-4 focus:outline-none"
          />
        ) : (
          <h2 className="text-xl font-semibold mb-4">{note.title}</h2>
        )}

        {/* Content */}
        {isEditing ? (
          <textarea
            rows="5"
            value={draft.content}
            onChange={(e) => setDraft({ ...draft, content: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none resize-none"
          />
        ) : (
          <p className="text-gray-200 whitespace-pre-line">{note.content}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          {isEditing ? (
            <>
              <button
                disabled={saving}
                onClick={handleSave}
                className="flex-1 bg-green-600 py-2 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save size={18} />
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setDraft(note);
                  setIsEditing(false);
                }}
                className="flex-1 bg-gray-600 py-2 rounded-xl flex items-center justify-center gap-2"
              >
                <X size={18} /> Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-indigo-600 py-2 rounded-xl flex items-center justify-center gap-2"
              >
                <Edit3 size={18} /> Edit
              </button>

              <button
                onClick={() => setShowDelete(true)}
                className="flex-1 bg-red-600 py-2 rounded-xl flex items-center justify-center gap-2"
              >
                <Trash2 size={18} /> Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete modal */}
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
                className="flex-1 bg-gray-700 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 py-2 rounded-xl"
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
