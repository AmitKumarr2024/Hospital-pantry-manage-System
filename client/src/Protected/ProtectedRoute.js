import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // Check if the user is authenticated (you can replace this logic with your actual authentication check)
  const isAuthenticated = !!localStorage.getItem("token"); // Example: token in localStorage

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    navigate("/login");
    console.log("protected");
    
    return;
  }

  // If authenticated, render the child component
  return children;
};

export default ProtectedRoute;
