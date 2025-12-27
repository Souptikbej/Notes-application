import React from "react";
import { FileWarning, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NoteNotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-h-[60vh] flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-10 text-center shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FileWarning className="h-16 w-16 text-red-400 drop-shadow-lg" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Note Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-8">
          The note you are trying to access does not exist or may have been
          deleted. You can go back to your notes or create a new one.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition shadow-lg"
          >
            <ArrowLeft size={18} />
            Back to Notes
          </Link>

          <Link
            to="/create"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium transition hover:scale-[1.03] shadow-xl"
          >
            Create New Note
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteNotFound;
