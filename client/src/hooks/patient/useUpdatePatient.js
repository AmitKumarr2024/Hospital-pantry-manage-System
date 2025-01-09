import { useState } from "react";

const useUpdatePatient = (patientId) => {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePatient = async (updatedData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:6002/api/patient/update-patient/${patientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || "Failed to update patient");
      }

      const responseData = await response.json();
      setPatient(responseData.patient);
      return responseData.message; // Return success message
    } catch (err) {
      console.error("Error updating patient:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { patient, updatePatient, isLoading, error };
};

export default useUpdatePatient;
