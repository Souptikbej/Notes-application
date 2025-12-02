import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import Notedetailspage from "./pages/Notedetailspage";

const App = () => {
  return (
    <div>
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<Notedetailspage />} />
      </Routes>
    </div>
  );
};

export default App;
