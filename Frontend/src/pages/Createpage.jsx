import React, { useState, useEffect } from "react";
import { FileText, Type, AlignLeft, Save, ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import Snowfall from "react-snowfall";

const Createpage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [snowflakes, setSnowflakes] = useState(60);

  const navigate = useNavigate();

  /* Enable snowfall only on larger screens */
  /* Adaptive snowfall */
  useEffect(() => {
    const updateSnowflakes = () => {
      if (window.innerWidth < 640) setSnowflakes(30);
      else if (window.innerWidth < 1024) setSnowflakes(50);
      else setSnowflakes(80);
    };

    updateSnowflakes();
    window.addEventListener("resize", updateSnowflakes);
    return () => window.removeEventListener("resize", updateSnowflakes);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-900 p-4 overflow-hidden">
      <Snowfall
        color="#82C3D9"
        snowflakeCount={snowflakes}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 animate-fadeIn">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Notes
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FileText className="w-8 h-8 text-indigo-400" />
            <h1 className="text-3xl font-bold text-white">Create New Note</h1>
          </div>
          <p className="text-gray-300 text-sm">
            Capture your thoughts and ideas beautifully.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="space-y-5">
          {/* Title */}
          <div className="relative group">
            <label className="sr-only">Title</label>
            <Type className="absolute top-3 left-3 text-gray-400 group-focus-within:text-indigo-400 transition" />
            <input
              type="text"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white border border-white/20 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Content */}
          <div className="relative group">
            <label className="sr-only">Content</label>
            <AlignLeft className="absolute top-3 left-3 text-gray-400 group-focus-within:text-indigo-400 transition" />
            <textarea
              rows="5"
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white border border-white/20 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 disabled:opacity-60"
          >
            <Save className={loading ? "animate-spin" : ""} />
            {loading ? "Saving..." : "Save Note"}
          </button>
        </form>
      </div>

      {/* Animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
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
