import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const oldToken = localStorage.getItem("token");
  const newToken = jwtDecode(oldToken); // Decode token to get user details

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update login status based on token presence
  }, [newToken]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear user session by removing token
    setIsLoggedIn(false);
    toast.success("Successfully logged out!"); // Notify user of successful logout
    navigate("/login"); // Redirect user to login page
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-8 md:px-16 flex items-center justify-between py-2 bg-slate-200">
      <div>
        <Link className="text-lg font-bold bg-orange-100 p-2 rounded-full tracking-wider">
          Hospital <span className="text-red-500 font-extrabold">Pantry</span> System
        </Link>
      </div>
      <p className="text-base">
        Role:{" "}
        <span className="text-2xl font-extrabold text-green-400">
          {newToken.role} {/* Display user role decoded from the token */}
        </span>
      </p>
      <div className="hidden md:block">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      {/* Mobile view logout button */}
      <div className="md:hidden">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
