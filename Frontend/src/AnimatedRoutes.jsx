import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import NoteDetailsPage from "./pages/Notedetailspage";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
