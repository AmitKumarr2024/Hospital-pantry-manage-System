import React, { useState } from "react";
import useUpdatePantryItem from "../../hooks/pantry/useUpdatePantryItem"; // Import your hook
import toast, { Toaster } from "react-hot-toast";

const UpdatePantryItemComponent = ({ id }) => {
  const { updatePantryItem, isLoading, error, updatedItem } =
    useUpdatePantryItem(id);
  const [updatedData, setUpdatedData] = useState({
    assignedTasks: [
      {
        task: "Restock Items",
        status: "Pending", // Default status
        _id: "677ec4ca87b4a4022120f06d",
      },
    ],
  });

  // Handle task status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setUpdatedData((prevData) => ({
      ...prevData,
      assignedTasks: prevData.assignedTasks.map((task) =>
        task._id === "677ec4ca87b4a4022120f06d"
          ? { ...task, status: newStatus }
          : task
      ),
    }));
  };

  // Submit the updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePantryItem(updatedData);
  };

  // Display toast notifications based on the update status
  React.useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
    if (updatedItem) {
      toast.success("Pantry item updated successfully!");
    }
  }, [error, updatedItem]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Pantry Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700">
            Task Status:
          </label>
          <select
            id="taskStatus"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={updatedData.assignedTasks[0].status}
            onChange={handleStatusChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default UpdatePantryItemComponent;
