import React, { useEffect, useState } from "react";
import Navber from "../components/Navber";
import RateLimitedUI from "../components/RateLimitUI";
import toast from "react-hot-toast";
import Notecard from "../components/Notecard";
import api from "../lib/axios";
import NoteNotFound from "../components/NoteNotFound";
import { LoaderCircleIcon } from "lucide-react";

const Homepage = () => {
  const [isRatelimit, SetRatelimit] = useState(false);
  const [notes, setnotes] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setnotes(res.data);
        SetRatelimit(false);
      } catch (error) {
        if (error.response?.status === 429) {
          SetRatelimit(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setloading(false);
      }
    };
    fetchNotes();
  }, []);
  console.log({ notes });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] to-[#111827]">
      {/* Navbar */}
      <Navber />

      {/* Rate Limit */}
      {isRatelimit && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* Loading State */}
        {loading && (
          <div className="flex text-center items-center justify-center text-white py-10">
            <LoaderCircleIcon className="animate-spin size-15" />
            Loading note...
          </div>
        )}

        {/* Empty State */}
        {!loading && notes.length === 0 && !isRatelimit && <NoteNotFound />}

        {/* Notes Grid */}
        {notes.length > 0 && !isRatelimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Notecard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
