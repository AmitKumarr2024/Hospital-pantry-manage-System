import { useState } from "react";

const useDeletePantryItem = (itemId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);

  const deletePantryItem = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:6002/api/pantry-item/delete-item/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to delete pantry item");
      }

      const responseData = await response.json();
      setDeletedItem(responseData);
    } catch (err) {
      console.error("Error deleting pantry item:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { deletePantryItem, isLoading, error, deletedItem };
};

export default useDeletePantryItem;
