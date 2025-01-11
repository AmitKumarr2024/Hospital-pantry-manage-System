import { useState } from "react";

const useUpdatePantryItem = (itemId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedItem, setUpdatedItem] = useState(null);

  const updatePantryItem = async (updatedData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/pantry-item/update-item/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header with token
          },
          body: JSON.stringify(updatedData), // Convert update data to JSON format
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to update pantry item");
      }

      const responseData = await response.json();
      setUpdatedItem(responseData.data); // Update state with response data
    } catch (err) {
      setError(err.message); // Set error message on failure
    } finally {
      setIsLoading(false); // End loading state after request
    }
  };

  return { updatePantryItem, isLoading, error, updatedItem };
};

export default useUpdatePantryItem;
