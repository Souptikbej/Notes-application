import React from "react";
import { Link } from "react-router";
import { ListPlus } from "lucide-react";
const Navber = () => {
  return (
    <header>
      <nav className="bg-neutral px-10 py-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-wider">
            MyNotesApp
          </h1>
          <Link to={"/create"} className="btn btn-active btn-primary gap-4">
            <ListPlus className="size-5" />
            <span className="hidden sm:inline">Add Note</span>
            <span className="sm:hidden">Newww</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navber;
