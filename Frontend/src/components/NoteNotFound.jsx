import React from "react";
import { FileWarning, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const NoteNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass rounded-3xl p-10 max-w-md text-center animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FileWarning className="h-20 w-20 text-red-500 drop-shadow-md animate-bounce-slow" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Note Not Found
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          The note you are looking for doesn’t exist or may have been deleted.
          Please go back or create a new note.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl font-semibold hover:bg-slate-900 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={18} />
            Back to Notes
          </Link>

          <Link
            to="/create"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Create New Note
          </Link>
        </div>
      </div>
      <style>
        {`@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}
`}
      </style>
    </div>
  );
};

export default NoteNotFound;
