import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/user/useLogout";

const LogoutButton = () => {
  const { logout, isLoading, error, isSuccess } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    if (isSuccess) {
      // Redirect to login page after successful logout
      navigate("/login");
    }
  };

  return (
    <div>
      <button onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isSuccess && <p style={{ color: "green" }}>Logged out successfully!</p>}
    </div>
  );
};

export default LogoutButton;
