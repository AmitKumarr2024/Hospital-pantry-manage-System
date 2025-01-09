import { useState } from "react";

const useCreatePatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const createPatient = async (patientData) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:6002/api/patient/create-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || "Failed to create patient");
      }

      const responseData = await response.json();
      setSuccessMessage(responseData.message);
    } catch (err) {
      console.error("Error creating patient:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { createPatient, isLoading, error, successMessage };
};

export default useCreatePatient;
