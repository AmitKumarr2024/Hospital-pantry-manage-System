import React, { useState } from "react";
import useUpdatePantryItem from "../hooks/useUpdatePantryItem";

const UpdatePantryItem = () => {
  const [itemData, setItemData] = useState({
    staffName: "tttt kumar",
    contact: "1234567890",
    location: "Pantry Room 3",
    assignedTasks: [
      {
        task: "Restock Items",
        status: "Completed",
        _id: "677ec4ca87b4a4022120f06d",
      },
    ],
    pantryItems: [
      {
        name: "brinjals",
        quantity: 450,
        category: "vegetable",
        expiryDate: "2025-01-01T00:00:00.000Z",
        unit: "Kg",
        supplier: "EFG Supplies",
        storageLocation: "Shelf c",
        _id: "677ec4ca87b4a4022120f06e",
        addedDate: "2025-01-08T18:32:42.822Z",
      },
    ],
  });

  const { updatePantryItem, isLoading, error, updatedItem } = useUpdatePantryItem("677ec4ca87b4a4022120f06c");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePantryItem(itemData); // Pass updated item data
  };

  return (
    <div>
      <h2>Update Pantry Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="staffName"
          value={itemData.staffName}
          onChange={handleChange}
          placeholder="Staff Name"
        />
        <input
          type="text"
          name="contact"
          value={itemData.contact}
          onChange={handleChange}
          placeholder="Contact"
        />
        <input
          type="text"
          name="location"
          value={itemData.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Item"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {updatedItem && (
        <div>
          <h3>Item Updated Successfully</h3>
          <pre>{JSON.stringify(updatedItem, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdatePantryItem;
