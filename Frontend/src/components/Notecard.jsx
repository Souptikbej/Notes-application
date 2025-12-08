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
    if (!window.confirm("Are you sure you want to delete this notes?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Notes deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete note");
      console.log("Error in handleDelete", error);
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="group bg-white/80 backdrop-blur-lg border border-slate-200 p-5 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <FileText className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
          <h2 className="text-lg truncate">{note.title}</h2>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-2 rounded-full hover:bg-blue-100 text-blue-600">
            <Pencil size={18} />
          </button>
          <button
            className="p-2 rounded-full hover:bg-red-100 text-red-600"
            onClick={(e) => handleDelete(e, note._id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
        {note.content}
      </p>

      {/* Footer */}
      <div className="mt-4 text-xs text-gray-400 flex justify-between items-center">
        <span>{formatDate(new Date(note.createdAt))}</span>
        <Link
          to="/create"
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs group-hover:scale-105 transition-transform duration-300"
        >
          New
        </Link>
      </div>
    </Link>
  );
};

export default Notecard;
