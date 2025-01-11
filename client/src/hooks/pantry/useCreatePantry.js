import { useState } from "react";

const usePantry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const addPantryItem = async (pantryItem) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pantry-item/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authentication token
        },
        body: JSON.stringify(pantryItem), // Convert pantry item to JSON format
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to add pantry item");
      }

      const responseData = await response.json();
      setData(responseData); // Store the response data

      return responseData; // Return response for additional processing
    } catch (err) {
      setError(err.message); // Handle errors during the request
    } finally {
      setIsLoading(false); // Stop loading after the request completes
    }
  };

  return { addPantryItem, isLoading, error, data };
};

export default usePantry;
