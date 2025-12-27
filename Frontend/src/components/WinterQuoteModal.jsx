import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const quotes = [
  "Winter is not just a season, it is a quiet state of mind.",
  "Cold air, warm thoughts, and a peaceful heart.",
  "Even the longest winter yields to gentle spring.",
  "Snow teaches us how to slow down and listen.",
  "In winter’s silence, clarity is born.",
  "Let your worries melt with the falling snow.",
  "Winter reminds us that rest is also progress.",
  "Stillness is winter’s greatest gift.",
];

const modalAnim = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 40,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const WinterQuoteModal = ({ open, onClose }) => {
  if (!open) return null;

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          variants={modalAnim}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="
            relative max-w-md w-[90%]
            rounded-3xl
            bg-gradient-to-br from-sky-400/20 via-indigo-500/20 to-purple-500/20
            border border-white/20
            shadow-2xl
            px-6 py-8
            text-center
          "
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close winter quote"
            className="
              absolute top-4 right-4
              text-white/70 hover:text-white
              transition
            "
          >
            <X className="w-5 h-5" />
          </button>

          {/* Frost Glow */}
          <div className="absolute inset-0 rounded-3xl bg-white/10 blur-2xl -z-10" />

          {/* Title */}
          <h2 className="text-sm uppercase tracking-widest text-sky-300 mb-3">
            Winter Note
          </h2>

          {/* Quote */}
          <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
            “{quote}”
          </p>

          {/* Footer */}
          <p className="mt-6 text-xs text-white/60">
            Stay warm. Stay inspired.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WinterQuoteModal;
