import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import NoteDetailsPage from "./pages/NoteDetailsPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
