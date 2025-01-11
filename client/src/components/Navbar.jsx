import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import useSingleUser from "../hooks/user/useSingleUser";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const oldToken = localStorage.getItem("token");
  const newToken = jwtDecode(oldToken);

  

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, [newToken]);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Successfully logged out!");
    console.log("Logged out");
    navigate("/login");
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-8 md:px-16 flex items-center justify-between py-2 bg-slate-200">
      <div>
        <Link className="text-lg font-bold bg-orange-100 p-2 rounded-full tracking-wider">
          Hospital <span className="text-red-500 font-extrabold">Pantry</span>{" "}
          System
        </Link>
      </div>
      <p className="text-base">
        Role:{" "}
        <span className=" text-2xl font-extrabold text-green-400">
          {" "}
          {newToken.role}
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
      {/* Mobile view */}
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
