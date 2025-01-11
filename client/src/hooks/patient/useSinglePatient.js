import { useState, useEffect } from "react";

const useSinglePatient = (patientId) => {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatient = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/patient/single-patient/${patientId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || "Failed to fetch patient");
      }

      const responseData = await response.json();
      setPatient(responseData.patient);
    } catch (err) {
      console.error("Error fetching patient:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  return { patient, isLoading, error };
};

export default useSinglePatient;
