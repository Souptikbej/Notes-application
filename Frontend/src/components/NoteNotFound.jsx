import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileX, ArrowLeft, PlusCircle, Search } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
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

const NoteNotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          relative
          max-w-lg w-full
          rounded-3xl
          bg-white/0
          backdrop-blur-10
          border border-white/20
          shadow-[0_0_80px_rgba(99,102,241,0.15)]
          p-10
          text-center
          overflow-hidden
        "
      >
        {/* Glow Orbs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl" />

        {/* Icon */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div className="p-5 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20">
            <FileX className="w-14 h-14 text-blue-400" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-white mb-3 tracking-wide"
        >
          Note Not Found
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-sm leading-relaxed mb-8"
        >
          The note you are trying to access does not exist or may have been
          deleted. You can go back to your notes or create a new one.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <Link
            to="/"
            className="
              flex items-center justify-center gap-2
              rounded-xl
              bg-white/10
              border border-white/20
              py-3
              text-white font-medium
              hover:bg-white/20
              transition-all
              hover:scale-[1.03]
            "
          >
            <ArrowLeft size={18} />
            Back to Notes
          </Link>

          <Link
            to="/create"
            className="
              flex items-center justify-center gap-2
              rounded-xl
              bg-gradient-to-r from-blue-600 to-purple-600
              py-3
              text-white font-semibold
              shadow-lg
              hover:shadow-xl
              transition-all
              hover:scale-[1.03]
            "
          >
            <PlusCircle size={18} />
            Create Note
          </Link>
        </motion.div>

        {/* Footer hint */}
        {/* <motion.div
          variants={itemVariants}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400"
        >
          <Search size={14} />
          Tip: Check the URL or return to your notes
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default NoteNotFound;
