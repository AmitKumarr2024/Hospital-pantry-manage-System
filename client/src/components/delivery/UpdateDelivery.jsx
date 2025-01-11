import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import useUpdateDelivery from "../../hooks/delivery/useUpdateDelivery";

const UpdateDelivery = ({ id, refetch }) => {
  const { delivery, updateDelivery, isLoading, error, successMessage } =
    useUpdateDelivery();
  const [roomDetails, setRoomDetails] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (delivery) {
      setRoomDetails(delivery.roomDetails || "");
      setStatus(delivery.status || "");
    }
  }, [delivery]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating delivery...");
    }

    if (error) {
      toast.error("Failed to update delivery. Please try again!");
    }

    if (successMessage) {
      toast.success("Delivery updated successfully!");
    }

    return () => {
      toast.dismiss();
    };
  }, [isLoading, error, successMessage]);

  const handleUpdate = () => {
    if (!roomDetails || !status) {
      toast.error("Please fill all fields before updating.");
      return;
    }

    updateDelivery(id, { roomDetails, status }).then(() => {
      toast.success("Delivery updated successfully!");
      refetch(); // Call refetch to update the deliveries list
    }).catch((err) => {
      toast.error("Failed to update delivery: " + err.message);
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Toast notifications for different states */}
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-center">Update Delivery</h2>

      {/* Show loading message while updating */}
      {isLoading && <p className="text-center text-blue-500">Loading...</p>}

      {/* Display error message if updating fails */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Show success message once delivery is updated */}
      {successMessage && (
        <p className="text-center text-green-500">{successMessage}</p>
      )}

      <div className="space-y-4">
        {/* Room Details input field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Room Details:
          </label>
          <input
            type="text"
            value={roomDetails}
            onChange={(e) => setRoomDetails(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status select field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Assigned">Assigned</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancel">Cancel</option>
          </select>
        </div>

        {/* Update delivery button */}
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
        >
          {isLoading ? "Updating..." : "Update Delivery"}
        </button>
      </div>
    </div>
  );
};

export default UpdateDelivery;
