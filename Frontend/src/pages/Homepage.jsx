import React, { useEffect, useState } from "react";
import Navber from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitUI";
import Notecard from "../components/Notecard";
import NoteNotFound from "../components/NoteNotFound";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import Snowfall from "react-snowfall";
import { motion } from "framer-motion";
import LoadingNotes from "../components/LoadingNotes";

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
  const [showSnow, setShowSnow] = useState(false);

  /* Enable snowfall only on desktop */
  useEffect(() => {
    if (window.innerWidth > 768) setShowSnow(true);
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
      <Navber />

      {showSnow && <Snowfall color="#82C3D9" snowflakeCount={80} />}

      {/* Rate limit UI */}
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* Loading */}
        {loading && <LoadingNotes />}

        {/* Empty state */}
        {!loading && notes.length === 0 && !isRateLimited && <NoteNotFound />}

        {/* Notes grid */}
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
