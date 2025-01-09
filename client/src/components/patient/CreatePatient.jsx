import React, { useState } from "react";
import useCreatePatient from "../hooks/useCreatePatient";

const CreatePatient = () => {
  const { createPatient, isLoading, error, successMessage } = useCreatePatient();

  const [patientData, setPatientData] = useState({
    name: "monty moe",
    age: 35,
    gender: "Male",
    contact: "123-456-7890",
    emergencyContact: "987-654-3210",
    allergies: "Peanuts",
    disease: "Diabetes",
    room: "101A",
    dietChartId: "677f7e45234f0c852939eab8", // You can fetch this dynamically
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = () => {
    createPatient(patientData);
  };

  return (
    <div>
      <h2>Create Patient</h2>

      {isLoading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={patientData.name}
          onChange={handleChange}
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={patientData.age}
          onChange={handleChange}
        />

        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={patientData.gender}
          onChange={handleChange}
        />

        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={patientData.contact}
          onChange={handleChange}
        />

        <label>Emergency Contact:</label>
        <input
          type="text"
          name="emergencyContact"
          value={patientData.emergencyContact}
          onChange={handleChange}
        />

        <label>Allergies:</label>
        <input
          type="text"
          name="allergies"
          value={patientData.allergies}
          onChange={handleChange}
        />

        <label>Disease:</label>
        <input
          type="text"
          name="disease"
          value={patientData.disease}
          onChange={handleChange}
        />

        <label>Room:</label>
        <input
          type="text"
          name="room"
          value={patientData.room}
          onChange={handleChange}
        />

        <label>Diet Chart ID:</label>
        <input
          type="text"
          name="dietChartId"
          value={patientData.dietChartId}
          onChange={handleChange}
        />

        <button onClick={handleSubmit} disabled={isLoading}>
          Create Patient
        </button>
      </div>
    </div>
  );
};

export default CreatePatient;
