import { useState } from "react";

const useUpdatePantryItem = (itemId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedItem, setUpdatedItem] = useState(null);

  const updatePantryItem = async (updatedData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:6002/api/pantry-item/update-item/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to update pantry item");
      }

      const responseData = await response.json();
      setUpdatedItem(responseData);
    } catch (err) {
      console.error("Error updating pantry item:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { updatePantryItem, isLoading, error, updatedItem };
};

export default useUpdatePantryItem;
