import React from "react";
import useViewAllDeliveries from "../hooks/useViewAllDeliveries";

const ViewAllDeliveries = () => {
  const { deliveries, isLoading, error } = useViewAllDeliveries();

  return (
    <div>
      <h2>All Deliveries</h2>

      {isLoading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {deliveries && deliveries.length > 0 ? (
        <div>
          {deliveries.map((delivery) => (
            <div key={delivery._id} style={{ marginBottom: "20px" }}>
              <h3>Delivery Info</h3>
              <p><strong>Delivery Person:</strong> {delivery.deliveryPerson}</p>
              <p><strong>Patient Name:</strong> {delivery.patientId.name}</p>
              <p><strong>Room Details:</strong> {delivery.roomDetails}</p>
              <p><strong>Status:</strong> {delivery.status}</p>
              <p><strong>Notes:</strong> {delivery.notes}</p>
              <p><strong>Created At:</strong> {new Date(delivery.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No deliveries available</p>
      )}
    </div>
  );
};

export default ViewAllDeliveries;
