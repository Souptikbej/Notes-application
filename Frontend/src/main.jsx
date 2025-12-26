import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import AnimatedRoutes from "./AnimatedRoutes";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AnimatedRoutes />
    <Toaster />
  </BrowserRouter>
);
