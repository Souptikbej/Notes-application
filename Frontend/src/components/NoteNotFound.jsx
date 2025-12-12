import React from "react";
import { FileWarning, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const NoteNotFound = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="
          max-w-md w-full 
          bg-white/10 
          border border-white/20 
          backdrop-blur-xl 
          rounded-3xl 
          p-10 
          text-center 
          shadow-2xl 
          animate-fadeIn
        "
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FileWarning className="h-20 w-20 text-red-400 drop-shadow-lg animate-bounce-slow" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-3">
          Note Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-8">
          The note you are looking for does not exist or may have been deleted.
          You can return to the notes list or create a new note.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="
              flex items-center justify-center gap-2 
              bg-white/10 
              border border-white/20 
              text-white 
              py-3 rounded-xl font-semibold 
              hover:bg-white/20 
              transition-all duration-300 
              shadow-lg hover:shadow-xl
            "
          >
            <ArrowLeft size={18} />
            Back to Notes
          </Link>

          <Link
            to="/create"
            className="
              bg-gradient-to-r from-blue-600 to-purple-600 
              text-white py-3 rounded-xl font-semibold 
              hover:scale-105 
              transition-all duration-300 
              shadow-xl hover:shadow-2xl
            "
          >
            Create New Note
          </Link>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }

          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }

          .animate-bounce-slow {
            animation: bounce-slow 2.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default NoteNotFound;
