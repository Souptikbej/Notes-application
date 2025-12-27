import React from "react";
import { FileText, Trash2, Pencil } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const Notecard = ({ note }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted");
      navigate(0); // soft refresh, keeps SPA behavior
    } catch {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div
      onClick={() => navigate(`/note/${note._id}`)}
      className="
        group cursor-pointer
        rounded-2xl 
        bg-white/10 
        backdrop-blur-xl 
        border border-white/20 
        text-white 
        p-5 
        shadow-lg 
        hover:shadow-2xl 
        transition-all 
        duration-300 
        hover:-translate-y-2
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-semibold min-w-0">
          <FileText className="w-5 h-5 text-indigo-400 transition-transform group-hover:rotate-6" />
          <h2 className="text-lg truncate">{note.title}</h2>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/note/${note._id}`);
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-indigo-300"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 transition text-red-300"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-200/90 text-sm leading-relaxed line-clamp-3">
        {note.content}
      </p>

      {/* Footer */}
      <div className="mt-4 text-xs text-gray-300 flex justify-between items-center">
        <span>{formatDate(new Date(note.createdAt))}</span>

        <Link
          to="/create"
          onClick={(e) => e.stopPropagation()}
          className="
            bg-gradient-to-r 
            from-indigo-500 
            to-purple-500 
            text-white 
            px-3 py-1 
            rounded-full 
            shadow 
            hover:shadow-md 
            transition-transform 
            group-hover:scale-105
          "
        >
          New
        </Link>
      </div>
    </div>
  );
};

export default Notecard;
