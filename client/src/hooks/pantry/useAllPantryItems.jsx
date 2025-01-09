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
        "http://localhost:6002/api/pantry-item/all-pantry-item",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token for authentication if required
          },
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to fetch pantry items");
      }

      const responseData = await response.json();
      setPantryItems(responseData);
    } catch (err) {
      console.error("Error fetching pantry items:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPantryItems();
  }, []); // Fetch items when the hook is used

  return { pantryItems, isLoading, error, refetch: fetchAllPantryItems };
};

export default useAllPantryItems;
