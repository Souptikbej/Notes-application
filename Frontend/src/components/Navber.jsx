import React from "react";
import { ListPlus } from "lucide-react";
const Navber = () => {
  return (
    <header>
      <nav class="bg-neutral px-10 py-4 shadow-lg">
        <div class="container mx-auto flex items-center justify-between">
          <a href="#" class="text-2xl font-bold text-white tracking-wider">
            MyNotesApp
          </a>
          <button className="btn btn-active btn-primary">
            <ListPlus />
            <span class="hidden sm:inline">Add Note</span>
            <span class="sm:hidden">New</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navber;
