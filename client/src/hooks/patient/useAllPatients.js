import { useState, useEffect } from "react";

const useAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:6002/api/patient/all-patients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || "Failed to fetch patients");
      }

      const responseData = await response.json();
      setPatients(responseData.patients);
    } catch (err) {
      console.error("Error fetching patients:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, isLoading, error };
};

export default useAllPatients;
