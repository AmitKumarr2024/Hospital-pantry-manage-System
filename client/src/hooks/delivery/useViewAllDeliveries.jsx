import { useState, useEffect } from "react";

const useViewAllDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllDeliveries = async () => {
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
    };

    fetchAllDeliveries();
  }, []);

  return { deliveries, isLoading, error };
};

export default useViewAllDeliveries;
