import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import Notedetailspage from "./pages/Notedetailspage";

const App = () => {
  return (
    <div>
      <button className="btn btn-active">Default</button>
      <button className="btn btn-active btn-neutral">Neutral</button>
      <button className="btn btn-active btn-primary">Primary</button>
      <button className="btn btn-active btn-secondary">Secondary</button>
      <button className="btn btn-active btn-accent">Accent</button>
      <button className="btn btn-active btn-ghost">Ghost</button>
      <button className="btn btn-active btn-link">Link</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<Notedetailspage />} />
      </Routes>
    </div>
  );
};

export default App;
