import React, { useState } from "react";
import useUpdatePatient from "../hooks/useUpdatePatient";

const UpdatePatient = () => {
  const [patientId, setPatientId] = useState("677f83e778b317414a4f09e7"); // Example patient ID
  const [updatedName, setUpdatedName] = useState("");
  const { patient, updatePatient, isLoading, error } = useUpdatePatient(patientId);

  const handleUpdate = async () => {
    const message = await updatePatient({ name: updatedName });
    if (message) {
      alert(message); // Notify user
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Update Patient</h2>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>Update Patient</button>

      {patient && (
        <div>
          <h3>Updated Patient Details</h3>
          <p>Name: {patient.name}</p>
          <p>Age: {patient.age}</p>
          <p>Gender: {patient.gender}</p>
          <p>Contact: {patient.contact}</p>
          <p>Emergency Contact: {patient.emergencyContact}</p>
          <p>Allergies: {patient.allergies.join(", ")}</p>
          <p>Disease: {patient.disease}</p>
          <p>Room: {patient.room}</p>
        </div>
      )}
    </div>
  );
};

export default UpdatePatient;
