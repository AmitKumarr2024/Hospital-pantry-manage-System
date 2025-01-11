import { useState, useEffect, useCallback } from "react";

const useViewAllDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllDeliveries = useCallback(async () => {
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:6002/api/delivery/get-All-Delivery", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to fetch deliveries");
      }

      const responseData = await response.json();
      setDeliveries(responseData.deliveries);
    } catch (err) {
      console.error("Error fetching deliveries:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Run the fetch on component mount
  useEffect(() => {
    fetchAllDeliveries();
  }, [fetchAllDeliveries]);

  // Function to manually trigger the refetch
  const refetch = () => {
    fetchAllDeliveries();
  };

  return { deliveries, isLoading, error, refetch };
};

export default useViewAllDeliveries;
