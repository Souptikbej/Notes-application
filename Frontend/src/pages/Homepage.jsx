import React, { useEffect, useState } from "react";
import Navber from "../components/Navber";
import RateLimitedUI from "../components/RateLimitUI";
import toast from "react-hot-toast";
import Notecard from "../components/Notecard";
import api from "../lib/axios";

const Homepage = () => {
  const [isRatelimit, SetRatelimit] = useState(false);
  const [notes, setnotes] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setnotes(res.data);
        SetRatelimit(false);
      } catch (error) {
        console.log("Error fetching notes");
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
  return (
    <div className="min-h-screen">
      <Navber />
      {isRatelimit && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}
        {notes.length > 0 && !isRatelimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-primary">
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
