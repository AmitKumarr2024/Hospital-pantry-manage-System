import React from "react";
import { useSelector } from "react-redux";

const Inventory = () => {
  const { pantryItems } = useSelector((state) => state.pantry); // Access pantry items from Redux store

  // Log all pantry items to inspect them
  console.log("All pantry items:", pantryItems);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-semibold mb-8 text-center text-indigo-600">Pantry Items</h2>
      {pantryItems.length === 0 ? (
        <p className="text-xl text-center text-gray-500">No pantry items available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pantryItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 border rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300"
            >
              <div className="mt-4">
                <h1 className="text-xl font-semibold mb-3 text-indigo-800">Pantry Item {index + 1}</h1>
                {item.pantryItems.map((pantryItem, i) => (
                  <div key={i} className="border-t pt-3 mt-3">
                    <p className="text-lg font-medium text-indigo-600">Name: {pantryItem.name}</p>
                    <p className="text-gray-600">Category: {pantryItem.category}</p>
                    <p className="text-gray-600">
                      Quantity: {pantryItem.quantity} {pantryItem.unit}
                    </p>
                    <p className="text-gray-600">
                      Expiry Date:{" "}
                      {new Date(pantryItem.expiryDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">Supplier: {pantryItem.supplier}</p>
                    <p className="text-gray-600">
                      Storage Location: {pantryItem.storageLocation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
