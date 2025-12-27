import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/Homepage";
import CreatePage from "./pages/Createpage";
import NoteDetailsPage from "./pages/Notedetailspage";
import NoteNotFound from "./pages/NoteNotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />

        {/* 404 fallback */}
        <Route path="*" element={<NoteNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
