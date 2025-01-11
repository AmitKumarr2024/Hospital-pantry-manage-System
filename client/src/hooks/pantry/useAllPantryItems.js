import { useState, useEffect } from "react";

const useAllPantryItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pantryItems, setPantryItems] = useState([]);

  const fetchAllPantryItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/pantry-item/all-pantry-item",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach authorization token
          },
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to fetch pantry items");
      }

      const responseData = await response.json();

      // Ensure response contains an array of pantry items
      if (Array.isArray(responseData.data)) {
        setPantryItems(responseData.data);
      } else {
        setPantryItems([]);
        setError("Unexpected data format. Expected an array in 'data'.");
      }
    } catch (err) {
      setError(err.message); // Handle errors from fetch or parsing
    } finally {
      setIsLoading(false); // Stop loading state after completion
    }
  };

  useEffect(() => {
    fetchAllPantryItems(); // Fetch pantry items when hook is mounted
  }, []);

  return { pantryItems, isLoading, error, refetch: fetchAllPantryItems };
};

export default useAllPantryItems;
