import React, { useState } from "react";
import usePantry from "../../hooks/pantry/useCreatePantry";

const AddPantryItem = () => {
  const { addPantryItem, isLoading, error, data } = usePantry();
  const [formData, setFormData] = useState({
    staffName: "Monty Kumar",
    contact: "1234567890",
    location: "Pantry Room 2",
    assignedTasks: [{ task: "Restock Items", status: "Pending" }],
    pantryItems: [
      {
        name: "Brinjal",
        quantity: 50,
        category: "Vegetable",
        expiryDate: "2025-01-01",
        unit: "Kg",
        supplier: "EFG Supplies",
        storageLocation: "Shelf C",
      },
    ],
  });

  const handleChange = (e, index, field, type) => {
    const updated = [...formData[type]];
    updated[index][field] = e.target.value;
    setFormData({ ...formData, [type]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPantryItem(formData);
    if (data) alert("Pantry item added successfully!");
  };

  return (
    <div className="max-w-screen-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Add Pantry Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["staffName", "contact", "location"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 font-semibold mb-2"
              >
                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-purple-700">
            Assigned Tasks
          </h3>
          {formData.assignedTasks.map((task, index) => (
            <div key={index} className="flex items-center space-x-4">
              {["task", "status"].map((field) => (
                <div key={field} className="w-full">
                  <label
                    htmlFor={`${field}-${index}`}
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    {field.toUpperCase()}
                  </label>
                  {field === "status" ? (
                    <select
                      id={`${field}-${index}`}
                      name={field}
                      value={task[field]}
                      onChange={(e) =>
                        handleChange(e, index, field, "assignedTasks")
                      }
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      id={`${field}-${index}`}
                      name={field}
                      value={task[field]}
                      onChange={(e) =>
                        handleChange(e, index, field, "assignedTasks")
                      }
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-purple-700">
            Pantry Items
          </h3>
          {formData.pantryItems.map((item, index) => (
            <div key={index} className="grid md:grid-cols-3 grid-cols-1 gap-6">
              {[
                "name",
                "quantity",
                "category",
                "expiryDate",
                "unit",
                "supplier",
                "storageLocation",
              ].map((field) => (
                <div key={field} className="w-full">
                  <label
                    htmlFor={`${field}-${index}`}
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    {field.toUpperCase()}
                  </label>
                  <input
                    type={field === "expiryDate" ? "date" : "text"}
                    id={`${field}-${index}`}
                    name={field}
                    value={item[field]}
                    onChange={(e) =>
                      handleChange(e, index, field, "pantryItems")
                    }
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-400"
        >
          {isLoading ? "Adding..." : "Add Pantry Item"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-500 text-center font-medium">{error}</p>
      )}
      {data && (
        <p className="mt-4 text-green-500 text-center font-medium">
          Pantry item added successfully!
        </p>
      )}
    </div>
  );
};

export default AddPantryItem;
