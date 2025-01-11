import { useState } from "react";
import toast from "react-hot-toast";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.ok) {
        toast.success(result.message || "Login Successful");
      }
      // Handle login success (e.g., store token or user data in localStorage)
      localStorage.setItem("token", data.data);
      localStorage.setItem("user", JSON.stringify(data.data));

      return data;
    } catch (err) {
      toast.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
