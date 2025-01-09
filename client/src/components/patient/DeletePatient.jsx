import React, { useState } from "react";
import useDeletePatient from "../hooks/useDeletePatient";

const DeletePatient = () => {
  const [patientId, setPatientId] = useState("677f83e778b317414a4f09e7"); // Example patient ID
  const { deletePatient, isLoading, error, message } = useDeletePatient(patientId);

  const handleDelete = async () => {
    await deletePatient();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Delete Patient</h2>
      <button onClick={handleDelete}>Delete Patient</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default DeletePatient;
