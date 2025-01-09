import React, { useState } from "react";
import useSinglePantryView from "../../hooks/pantry/useSinglePantryView";

const ViewSinglePantryItem = () => {
  const [itemId, setItemId] = useState("677ec49a87b4a4022120f068"); // Example itemId
  const { pantryItem, isLoading, error, refetch } = useSinglePantryView(itemId);

  return (
    <div>
      <h2>View Single Pantry Item</h2>

      <input
        type="text"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
        placeholder="Enter Item ID"
      />
      <button onClick={refetch}>Fetch Item</button>

      {isLoading && <p>Loading pantry item...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pantryItem && (
        <div>
          <h3>Pantry Item Details</h3>
          <p><strong>Staff Name:</strong> {pantryItem.staffName}</p>
          <p><strong>Contact:</strong> {pantryItem.contact}</p>
          <p><strong>Location:</strong> {pantryItem.location}</p>
          <p><strong>Assigned Tasks:</strong></p>
          <ul>
            {pantryItem.assignedTasks.map((task, index) => (
              <li key={index}>{task.task} - {task.status}</li>
            ))}
          </ul>
          <p><strong>Pantry Items:</strong></p>
          {pantryItem.pantryItems.map((item, index) => (
            <div key={index}>
              <p>Name: {item.name}</p>
              <p>Quantity: {item.quantity} {item.unit}</p>
              <p>Category: {item.category}</p>
              <p>Supplier: {item.supplier}</p>
              <p>Storage Location: {item.storageLocation}</p>
              <p>Expiry Date: {new Date(item.expiryDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewSinglePantryItem;
