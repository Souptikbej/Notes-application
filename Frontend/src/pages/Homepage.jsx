import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitUI";
import Notecard from "../components/Notecard";
import NoteNotFound from "../components/NoteNotFound";
import LoadingNotes from "../components/LoadingNotes";
import WinterQuoteModal from "../components/WinterQuoteModal";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Snowfall from "react-snowfall";
import { motion } from "framer-motion";

/* Page animation */
const pageAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Homepage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [snowflakes, setSnowflakes] = useState(60);
  const [showWinterModal, setShowWinterModal] = useState(false);

  /* Close modal permanently */
  const closeWinterModal = () => {
    localStorage.setItem("winterModalSeen", "true");
    setShowWinterModal(false);
  };

  /* Show winter quote ONLY ONCE */
  useEffect(() => {
    const hasSeen = localStorage.getItem("winterModalSeen");

    if (!hasSeen) {
      setShowWinterModal(true);

      const timer = setTimeout(() => {
        closeWinterModal();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

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

  /* Fetch notes */
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <motion.main
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden"
    >
      {/* Winter Modal */}
      <WinterQuoteModal open={showWinterModal} onClose={closeWinterModal} />

      {/* Snowfall */}
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

      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6 relative z-20">
        {loading && <LoadingNotes />}

        {!loading && notes.length === 0 && !isRateLimited && <NoteNotFound />}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Notecard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </motion.main>
  );
};

export default Homepage;
