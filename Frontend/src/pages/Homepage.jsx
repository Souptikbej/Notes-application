import React, { useEffect, useState } from "react";
import Navber from "../components/Navber";
import RateLimitedUI from "../components/RateLimitUI";
import axios from "axios";
import toast from "react-hot-toast";

const Homepage = () => {
  const [isRatelimit, SetRatelimit] = useState(false);
  const [notes, setnotes] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
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
    </div>
  );
};

export default Homepage;
