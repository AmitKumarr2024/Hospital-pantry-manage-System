import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

// Assuming useAllPantryItems is your custom hook that fetches pantry items
import useAllPantryItems from "../../hooks/pantry/useAllPantryItems";

const PantryOrder = () => {
  // Use the hook to fetch pantry items, loading state, error, and refetch
  const { pantryItems, isLoading, error, refetch } = useAllPantryItems();

  // If pantryItems is undefined, fall back to an empty array
  const allPantry = pantryItems ? Object.values(pantryItems) : [];

  // Log pantry items for debugging

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full min-h-screen bg-cover bg-center bg-opacity-40 flex justify-center items-center">
        <div className="bg-gray-200 w-full bg-opacity-90 rounded-lg shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            All Pantry Items
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {allPantry.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {item.staffName}
                </h3>
                <p className="text-gray-600">Location: {item.location}</p>

                {/* Task Status Highlight */}
                {item.assignedTasks && item.assignedTasks.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-lg">Assigned Task:</h4>
                    {item.assignedTasks.map((task, idx) => (
                      <div
                        key={task._id}
                        className={`p-4 mt-2 rounded-lg ${
                          task.status === "Completed"
                            ? "bg-green-200"
                            : task.status === "In Progress"
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        }`}
                      >
                        <p>
                          <strong>Task:</strong> {task.task}
                        </p>
                        <p>
                          <strong>Status:</strong>
                          <span
                            className={`font-bold ${
                              task.status === "Completed"
                                ? "text-green-600"
                                : task.status === "In Progress"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {task.status}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <h4 className="font-semibold text-lg">Pantry Items:</h4>
                  {item.pantryItems.map((pantryItem) => (
                    <div
                      key={pantryItem._id}
                      className="mt-2 p-4 bg-gray-100 rounded-lg"
                    >
                      <p>
                        <strong>Item Name:</strong> {pantryItem.name}
                      </p>
                      <p>
                        <strong>Category:</strong> {pantryItem.category}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {pantryItem.quantity}{" "}
                        {pantryItem.unit}
                      </p>
                      <p>
                        <strong>Supplier:</strong> {pantryItem.supplier}
                      </p>
                      <p>
                        <strong>Storage Location:</strong>{" "}
                        {pantryItem.storageLocation}
                      </p>
                      <p>
                        <strong>Expiry Date:</strong>{" "}
                        {new Date(pantryItem.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PantryOrder;
