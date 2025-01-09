import React, { useState } from "react";
import useUpdateDelivery from "../hooks/useUpdateDelivery";

const UpdateDelivery = ({ deliveryId }) => {
  const { delivery, updateDelivery, isLoading, error, successMessage } = useUpdateDelivery();
  const [roomDetails, setRoomDetails] = useState("");

  const handleUpdate = () => {
    updateDelivery(deliveryId, { roomDetails });
  };

  return (
    <div>
      <h2>Update Delivery</h2>

      {isLoading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <div>
        <label>Room Details:</label>
        <input
          type="text"
          value={roomDetails}
          onChange={(e) => setRoomDetails(e.target.value)}
        />
      </div>

      <button onClick={handleUpdate} disabled={isLoading}>
        Update Delivery
      </button>

      {delivery && (
        <div>
          <h3>Updated Delivery Info</h3>
          <p><strong>Delivery Person:</strong> {delivery.deliveryPerson}</p>
          <p><strong>Room Details:</strong> {delivery.roomDetails}</p>
          <p><strong>Status:</strong> {delivery.status}</p>
          <p><strong>Notes:</strong> {delivery.notes}</p>
          <p><strong>Created At:</strong> {new Date(delivery.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default UpdateDelivery;
