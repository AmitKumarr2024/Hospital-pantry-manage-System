import { useState, useEffect } from "react";

const useSinglePantryView = (itemId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pantryItem, setPantryItem] = useState(null);

  const fetchSinglePantryItem = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:6002/api/pantry-item/single-Item/${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Token for authentication if required
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to fetch pantry item");
      }

      const responseData = await response.json();
      setPantryItem(responseData);
    } catch (err) {
      console.error("Error fetching pantry item:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchSinglePantryItem();
    }
  }, [itemId]); // Fetch item when itemId changes

  return { pantryItem, isLoading, error, refetch: fetchSinglePantryItem };
};

export default useSinglePantryView;
