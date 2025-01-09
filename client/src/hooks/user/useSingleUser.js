import { useState, useEffect } from "react";

const useSingleUser = (userId) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleUser = async () => {
      setIsLoading(true);
      setError(null); // Clear any previous errors

      try {
        const response = await fetch(
          `http://localhost:6002/api/users/singleUser?id=${userId}`, // Pass the userId as a query param
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user details");
        }

        setUser(data);
      } catch (err) {
        console.error("Error fetching user details:", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchSingleUser();
    }
  }, [userId]);

  return { user, isLoading, error };
};

export default useSingleUser;
