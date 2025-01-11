import React, { useState } from "react";
import useSinglePantryView from "../../hooks/pantry/useSinglePantryView";

const ViewSinglePantryItem = () => {
  const [itemId, setItemId] = useState("677ec49a87b4a4022120f068"); // Example itemId
  const { pantryItem, isLoading, error, refetch } = useSinglePantryView(itemId);

  return (
    <div>
      <h2>View Single Pantry Item</h2>

      {/* Input field to enter item ID */}
      <input
        type="text"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
        placeholder="Enter Item ID"
      />
      {/* Button to fetch pantry item details */}
      <button onClick={refetch}>Fetch Item</button>

      {/* Show loading message while data is being fetched */}
      {isLoading && <p>Loading pantry item...</p>}
      {/* Show error message if there is an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Display pantry item details if data is available */}
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
