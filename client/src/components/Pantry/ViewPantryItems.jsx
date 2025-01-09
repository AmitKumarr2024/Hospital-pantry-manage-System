import React from "react";
import useAllPantryItems from "../../hooks/pantry/useAllPantryItems";

const ViewPantryItems = () => {
  const { pantryItems, isLoading, error, refetch } = useAllPantryItems();

  return (
    <div>
      <h2>All Pantry Items</h2>
      {isLoading && <p>Loading pantry items...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isLoading && !error && (
        <div>
          {pantryItems.length === 0 ? (
            <p>No pantry items available.</p>
          ) : (
            <ul>
              {pantryItems.map((item, index) => (
                <li key={index}>
                  <strong>Staff Name:</strong> {item.staffName} <br />
                  <strong>Contact:</strong> {item.contact} <br />
                  <strong>Location:</strong> {item.location} <br />
                  <strong>Assigned Tasks:</strong>{" "}
                  {item.assignedTasks.map((task, i) => (
                    <span key={i}>
                      {task.task} ({task.status})
                    </span>
                  ))}
                  <br />
                  <strong>Pantry Items:</strong>{" "}
                  {item.pantryItems.map((pantryItem, i) => (
                    <span key={i}>
                      {pantryItem.name} - {pantryItem.quantity} {pantryItem.unit} (
                      {pantryItem.category})
                    </span>
                  ))}
                  <hr />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};

export default ViewPantryItems;
