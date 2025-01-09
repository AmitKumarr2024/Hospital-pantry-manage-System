import React, { useState } from "react";
import useCreateDelivery from "../hooks/useCreateDelivery";

const CreateDelivery = () => {
  const [deliveryPerson, setDeliveryPerson] = useState("moni Smith");
  const [patientId, setPatientId] = useState("677f7a0cf245c112a4c5dad0");
  const [roomDetails, setRoomDetails] = useState("Room 307, Building B");
  const [notes, setNotes] = useState("Deliver the package before noon");

  const { createDelivery, isLoading, error, deliveryData } = useCreateDelivery();

  const handleSubmit = () => {
    const deliveryInfo = {
      deliveryPerson,
      patientId,
      roomDetails,
      notes,
    };
    createDelivery(deliveryInfo); // Trigger the delivery creation
  };

  return (
    <div>
      <h2>Create Delivery</h2>

      <form>
        <div>
          <label>Delivery Person</label>
          <input
            type="text"
            value={deliveryPerson}
            onChange={(e) => setDeliveryPerson(e.target.value)}
          />
        </div>

        <div>
          <label>Patient ID</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>

        <div>
          <label>Room Details</label>
          <input
            type="text"
            value={roomDetails}
            onChange={(e) => setRoomDetails(e.target.value)}
          />
        </div>

        <div>
          <label>Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Creating Delivery..." : "Create Delivery"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {deliveryData && (
        <div>
          <h3>Delivery Created Successfully</h3>
          <pre>{JSON.stringify(deliveryData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreateDelivery;
