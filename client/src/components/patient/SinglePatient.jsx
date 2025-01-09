import React, { useState } from "react";
import useSinglePatient from "../hooks/useSinglePatient";

const SinglePatient = () => {
  const [patientId, setPatientId] = useState("677f83e778b317414a4f09e7"); // Example patient ID
  const { patient, isLoading, error } = useSinglePatient(patientId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!patient) {
    return <p>No patient found.</p>;
  }

  return (
    <div>
      <h2>Patient Details</h2>
      <h3>{patient.name}</h3>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <p>Contact: {patient.contact}</p>
      <p>Emergency Contact: {patient.emergencyContact}</p>
      <p>Allergies: {patient.allergies.join(", ")}</p>
      <p>Disease: {patient.disease}</p>
      <p>Room: {patient.room}</p>
      {patient.dietChart && (
        <div>
          <h4>Diet Chart</h4>
          <p>Morning Meal: {patient.dietChart.morningMeal}</p>
          <p>Afternoon Meal: {patient.dietChart.afternoonMeal}</p>
          <p>Evening Meal: {patient.dietChart.eveningMeal}</p>
          <p>Special Instructions: {patient.dietChart.specialInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default SinglePatient;
