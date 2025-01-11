import { useState } from "react";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authenticated logout
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to logout");
      }

      // Clear localStorage or any other stored user data
      localStorage.removeItem("token");

      setIsSuccess(true);
    } catch (err) {
      console.error("Logout error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error, isSuccess };
};

export default useLogout;
