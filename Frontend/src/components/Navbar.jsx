import { Link } from "react-router-dom";
import { ListPlus } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedLogo from "../components/AnimatedLogo";
const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-50"
    >
      <nav
        className="
          bg-white/0
          backdrop-blur-sm
          border-b border-white/15
        "
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <AnimatedLogo />
          </Link>

          {/* Action */}
          <Link
            to="/create"
            aria-label="Create new note"
            className="glow-container inline-flex items-center gap-2"
          >
            <span className="glow-button">
              <ListPlus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Note</span>
            </span>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
