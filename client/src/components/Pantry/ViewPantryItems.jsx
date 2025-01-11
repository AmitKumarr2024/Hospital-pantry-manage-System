import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAllPantryItems from "../../hooks/pantry/useAllPantryItems";
import { setPantryItems, setError } from "../../redux/pantrySlice"; // Ensure the path is correct
import UpdatePantryItem from "./UpdatePantryItem";
import UpdatePantryItemComponent from "./UpdatePantryItem";

const ViewPantryItems = () => {
  const dispatch = useDispatch();

  const { pantryItems, isLoading, error, refetch } = useAllPantryItems();

  // Dispatch pantry items to the redux store when data is fetched
  useEffect(() => {
    if (pantryItems.length) {
      dispatch(setPantryItems(pantryItems));
    }
  }, [dispatch, pantryItems]);

  return (
    <div className="p-6 bg-gray-200 w-full">
      {/* Display loading message while fetching pantry items */}
      {isLoading && (
        <p className="text-center text-gray-500">Loading pantry items...</p>
      )}
      {/* Display error message if any error occurs */}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}
      {/* Display pantry items if no loading or error */}
      {!isLoading && !error && (
        <div>
          {pantryItems.length === 0 ? (
            <p className="text-center text-gray-500">
              No pantry items available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 text-center">
              {pantryItems.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 w-full"
                >
                  <h3 className="text-xl font-semibold">{item.staffName}</h3>
                  <p className="text-sm text-gray-500">
                    Contact: {item.contact}
                  </p>
                  <p className="text-sm text-gray-500">
                    Location: {item.location}
                  </p>

                  <div className="mt-4">
                    <h4 className="font-medium text-lg">Assigned Tasks:</h4>
                    {item.assignedTasks && item.assignedTasks.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {item.assignedTasks.map((task, i) => (
                          <li key={i} className="text-sm text-gray-700">
                            <span className="font-semibold">{task.task}</span> (
                            {task.status})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No tasks assigned</p>
                    )}
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-lg">Pantry Items:</h4>
                    {item.pantryItems && item.pantryItems.length > 0 ? (
                      <div className="space-y-4">
                        {item.pantryItems.map((pantryItem, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 p-3 rounded-md border border-gray-200 w-full"
                          >
                            <p className="text-sm font-semibold">
                              {pantryItem.name}
                            </p>
                            <p className="text-sm text-gray-700">
                              {pantryItem.quantity} {pantryItem.unit} (
                              {pantryItem.category})
                            </p>
                            <p className="text-sm text-gray-500">
                              Expiry Date:{" "}
                              {new Date(
                                pantryItem.expiryDate
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              Supplier: {pantryItem.supplier}
                            </p>
                            <p className="text-sm text-gray-500">
                              Storage Location: {pantryItem.storageLocation}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No pantry items available
                      </p>
                    )}
                  </div>
                  {/* Button to update pantry item */}
                  <UpdatePantryItemComponent id={item._id} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Refresh
        </button>
      </div>

      {/* Show update form if oldId is available */}
    </div>
  );
};

export default ViewPantryItems;
