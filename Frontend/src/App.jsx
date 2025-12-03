import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import Notedetailspage from "./pages/Notedetailspage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<Notedetailspage />} />
      </Routes>
    </div>
  );
};

export default App;
