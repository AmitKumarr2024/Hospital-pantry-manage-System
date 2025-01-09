import React from "react";
import useAllPatients from "../hooks/useAllPatients";

const AllPatients = () => {
  const { patients, isLoading, error } = useAllPatients();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>All Patients</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient._id}>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllPatients;
