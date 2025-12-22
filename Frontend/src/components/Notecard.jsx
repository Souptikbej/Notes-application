import React from "react";
import { FileText, Trash2, Pencil } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const Notecard = ({ note }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete note");
      console.log("Error in handleDelete", error);
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="
        group
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
        <div className="flex items-center gap-2 font-semibold">
          <FileText className="w-5 h-5 text-blue-400 group-hover:rotate-6 transition-transform duration-300" />
          <h2 className="text-lg truncate">{note.title}</h2>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link to={`/note/${note._id}`}>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-blue-300 hover:text-blue-400">
              <Pencil size={18} />
            </button>
          </Link>
          <button
            onClick={(e) => handleDelete(e, note._id)}
            className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 transition-all text-red-300 hover:text-red-400"
          >
            <Trash2 size={18} />
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
            from-blue-500 
            to-purple-500 
            text-white 
            px-3 py-1 
            rounded-full 
            text-xs 
            shadow 
            hover:shadow-md 
            transition-transform 
            duration-300 
            group-hover:scale-105
          "
        >
          New
        </Link>
      </div>
    </Link>
  );
};

export default Notecard;
