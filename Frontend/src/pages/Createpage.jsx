import React, { useState, useEffect } from "react";
import { FileText, Type, AlignLeft, Save, ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import Snowfall from "react-snowfall";
import { motion } from "framer-motion";

/* Motion variants */
const containerVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Createpage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [snowflakes, setSnowflakes] = useState(60);

  const navigate = useNavigate();

  /* Adaptive snowfall */
  useEffect(() => {
    const updateSnowflakes = () => {
      if (window.innerWidth < 640) setSnowflakes(25);
      else if (window.innerWidth < 1024) setSnowflakes(45);
      else setSnowflakes(70);
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
    } catch {
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
    relative
    min-h-screen
    flex
    justify-center
    bg-gradient-to-br from-gray-900 to-black
    px-4
    pt-5
    sm:pt-10
    lg:pt-0
    lg:items-center
    overflow-hidden
  "
    >
      {/* Snowfall */}
      <Snowfall
        snowflakeCount={snowflakes}
        color="#82C3D9"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
                    relative
                    max-w-lg w-full
                    rounded-3xl
                    bg-white/5
                    backdrop-blur-sm
                    border border-white/20
                    shadow-[0_0_80px_rgba(99,102,241,0.18)]
                    pt-10 px-6 pb-6
                    sm:pt-10 sm:px-8 sm:pb-8
                    lg:p-10
                    text-white
                    overflow-hidden
                  "
      >
        {/* Glow Orbs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl" />

        {/* Back */}
        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Notes
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/20">
              <FileText className="w-7 h-7 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-wide">Create New Note</h1>
          <p className="text-gray-300 text-sm mt-2">
            Capture your thoughts and ideas beautifully.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleCreate}
          className="space-y-5"
        >
          {/* Title */}
          <div className="relative group">
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
            className="
              w-full flex items-center justify-center gap-2
              rounded-xl
              bg-gradient-to-r from-indigo-600 to-purple-600
              py-3
              font-semibold
              transition-all
              hover:scale-[1.03]
              hover:shadow-xl
              active:scale-95
              disabled:opacity-60
            "
          >
            <Save className={loading ? "animate-spin" : ""} />
            {loading ? "Saving..." : "Save Note"}
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Createpage;
