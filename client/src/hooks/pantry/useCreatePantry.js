import { useState } from "react";

const usePantry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const addPantryItem = async (pantryItem) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:6002/api/pantry-item/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authentication if required
        },
        body: JSON.stringify(pantryItem),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to add pantry item");
      }

      const responseData = await response.json();
      setData(responseData);

      return responseData; // Return response for additional processing if needed
    } catch (err) {
      console.error("Error adding pantry item:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { addPantryItem, isLoading, error, data };
};

export default usePantry;
