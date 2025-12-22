import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import NoteDetails from "./pages/Notedetailspage";
import NotesList from "./pages/Homepage";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NotesList />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
