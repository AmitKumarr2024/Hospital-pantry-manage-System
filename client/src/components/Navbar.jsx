import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // Use 'react-router-dom' instead of 'react-router'
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // To store user role
  const navigate = useNavigate();

  const oldToken = localStorage.getItem("token");

  useEffect(() => {
    if (oldToken) {
      try {
        const decodedToken = jwtDecode(oldToken); // Decode token if valid
        setRole(decodedToken.role); // Set user role
        setIsLoggedIn(true); // User is logged in
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false); // If decoding fails, set logged in status to false
      }
    } else {
      setIsLoggedIn(false); // If no token, user is not logged in
    }
  }, [oldToken]); // Dependency on the token

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
          Hospital <span className="text-red-500 font-extrabold">Pantry</span>{" "}
          System
        </Link>
      </div>
      <p className="text-base">
        Role:{" "}
        <span className="text-2xl font-extrabold text-green-400">
          {role || "Please click Logout to Re-Login"} {/* Display user role decoded from the token */}
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
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
