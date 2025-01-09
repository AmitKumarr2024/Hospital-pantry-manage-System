import { useState } from "react";

const useDeletePatient = (patientId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const deletePatient = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`http://localhost:6002/api/patient/delete-patient/${patientId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to delete patient");
      }

      setMessage(responseData.message); // Set success message
    } catch (err) {
      console.error("Error deleting patient:", err.message);
      setError(err.message); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  return { deletePatient, isLoading, error, message };
};

export default useDeletePatient;
