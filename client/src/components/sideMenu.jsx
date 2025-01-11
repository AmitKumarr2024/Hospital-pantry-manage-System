import React from "react";
import { Link } from "react-router-dom"; // Ensure you're using react-router-dom

const SideMenu = ({ title, links, containerClass, headerClass, linkClass }) => {
  return (
    <div
      className={`w-full md:w-72 flex gap-4 items-center flex-col ${containerClass || ""}`}
    >
      {/* Title with dynamic styling */}
      <div className={`bg-white rounded-full text-center p-3 ${headerClass || ""}`}>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-500 tracking-wide">
          Welcome to <span className="text-fuchsia-500 font-bold">{title}</span> Dashboard
        </h1>
      </div>

      {/* Link container */}
      <div className="w-full flex flex-col items-center justify-center mt-4 px-2">
        <ul className="w-full max-w-xs md:max-w-none flex flex-col md:flex-col items-center gap-3 sm:gap-4 md:justify-center md:gap-8">
          {/* Dynamically render links */}
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`py-2 px-6 text-white font-semibold capitalize hover:bg-blue-300 cursor-pointer duration-500 ease-in-out text-sm sm:text-lg md:text-xl rounded-2xl bg-blue-400 ${linkClass || ""}`}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
