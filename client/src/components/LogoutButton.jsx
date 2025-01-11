import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast
import useLogout from "../hooks/user/useLogout";

const LogoutButton = () => {
  const { logout, isLoading, error, isSuccess } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    if (isSuccess) {
      // Show success toast and redirect to login page after successful logout
      toast.success("Logged out successfully!");
      navigate("/login");
    } else if (error) {
      // Show error toast if there was an error during logout
      toast.error(error || "An error occurred while logging out.");
    }
  };

  return (
    <div>
      <button
        className="font-bold text-2xl"
        onClick={handleLogout}
        disabled={isLoading}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
