import React from "react";
import { useState } from "react";
import { FileText, Type, AlignLeft, Save } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Createpage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title & content are required!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5001/api/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2 text-indigo-600 mb-2">
            <FileText size={32} className="animate-bounce" />
            <h1 className="text-3xl font-bold">Create New Note</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Write something cool and creative ✨
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="space-y-5">
          {/* Title Input */}
          <div className="relative group">
            <Type className="absolute top-3 left-3 text-gray-400 group-focus-within:text-indigo-500 transition-all" />
            <input
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>

          {/* Content Textarea */}
          <div className="relative group">
            <AlignLeft className="absolute top-3 left-3 text-gray-400 group-focus-within:text-indigo-500 transition-all" />
            <textarea
              rows="5"
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50"
          >
            <Save className={loading ? "animate-spin" : ""} />
            {loading ? "Saving..." : "Save Note"}
          </button>
        </form>
      </div>

      {/* Custom animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Createpage;
