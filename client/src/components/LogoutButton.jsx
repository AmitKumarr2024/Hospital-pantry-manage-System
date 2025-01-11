import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // For displaying toast notifications
import useLogout from "../hooks/user/useLogout";

const LogoutButton = () => {
  const { logout, isLoading, error, isSuccess } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    if (isSuccess) {
      toast.success("Logged out successfully!"); // Notify user of successful logout
      navigate("/login"); // Redirect to login page
    } else if (error) {
      toast.error(error || "An error occurred while logging out."); // Notify user of logout error
    }
  };

  return (
    <div>
      <button
        className="font-bold text-2xl"
        onClick={handleLogout}
        disabled={isLoading} // Disable button while logout is in progress
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
