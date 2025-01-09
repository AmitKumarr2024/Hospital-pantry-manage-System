import React, { useState } from "react";
import useSingleDelivery from "../hooks/useSingleDelivery";

const SingleDelivery = () => {
  const [deliveryId, setDeliveryId] = useState("677f80b4f285ab1e4348efa8"); // Example delivery ID
  const { delivery, isLoading, error } = useSingleDelivery(deliveryId);

  return (
    <div>
      <h2>Delivery Details</h2>
      
      {isLoading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {delivery && (
        <div>
          <h3>Delivery Info</h3>
          <p><strong>Delivery Person:</strong> {delivery.deliveryPerson}</p>
          <p><strong>Patient ID:</strong> {delivery.patientId}</p>
          <p><strong>Room Details:</strong> {delivery.roomDetails}</p>
          <p><strong>Status:</strong> {delivery.status}</p>
          <p><strong>Notes:</strong> {delivery.notes}</p>
          <p><strong>Created At:</strong> {new Date(delivery.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default SingleDelivery;
