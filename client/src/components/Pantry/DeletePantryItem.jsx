import React, { useState } from "react";
import useDeletePantryItem from "../hooks/useDeletePantryItem";

const DeletePantryItem = () => {
  const [itemId, setItemId] = useState("677ec4ca87b4a4022120f06c"); // Example Item ID
  const { deletePantryItem, isLoading, error, deletedItem } = useDeletePantryItem(itemId);

  const handleDelete = () => {
    deletePantryItem(); // Trigger the deletion
  };

  return (
    <div>
      <h2>Delete Pantry Item</h2>

      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete Item"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {deletedItem && (
        <div>
          <h3>Item Deleted Successfully</h3>
          <pre>{JSON.stringify(deletedItem, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DeletePantryItem;
