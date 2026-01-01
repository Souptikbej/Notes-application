import React from "react";
import { FileText, Trash2, Pencil } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

/* Animation */
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Notecard = ({ note }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted");
      navigate(0);
    } catch {
      toast.error("Failed to delete note");
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={() => navigate(`/note/${note._id}`)}
      className="
        relative group cursor-pointer
        rounded-3xl
        bg-white/0
        backdrop-blur-sm
        border border-white/20
        p-6
        text-white
        shadow-[0_0_40px_rgba(99,102,241,0.12)]
        hover:shadow-[0_0_80px_rgba(99,102,241,0.25)]
        transition-all
        overflow-hidden
      "
    >
      {/* Glow Orbs */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-semibold truncate">{note.title}</h2>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/note/${note._id}`);
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-indigo-300 transition"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 text-red-300 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="relative text-gray-300 text-sm leading-relaxed line-clamp-3">
        {note.content}
      </p>

      {/* Footer */}
      <div className="relative mt-5 flex items-center justify-between text-xs text-gray-400">
        <span>{formatDate(new Date(note.createdAt))}</span>

        <Link
          to="/create"
          onClick={(e) => e.stopPropagation()}
          className="
            px-3 py-1
            rounded-full
            bg-gradient-to-r from-indigo-500 to-purple-500
            text-white
            font-medium
            shadow-md
            hover:shadow-lg
            transition
            group-hover:scale-105
          "
        >
          New
        </Link>
      </div>
    </motion.div>
  );
};

export default Notecard;
