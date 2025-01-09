import { useState } from "react";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (email, password, role) => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await fetch("http://localhost:6002/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Return success data or handle further processing
      console.log("signup", data);
      return data;
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
