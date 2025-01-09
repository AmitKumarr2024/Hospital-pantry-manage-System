import { useState, useEffect } from "react";

const useSingleDelivery = (deliveryId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    const fetchSingleDelivery = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:6002/api/delivery/single-delivery/${deliveryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
          },
        });

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(responseData.message || "Failed to fetch delivery details");
        }

        const responseData = await response.json();
        setDelivery(responseData.delivery);
      } catch (err) {
        console.error("Error fetching delivery:", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (deliveryId) {
      fetchSingleDelivery();
    }
  }, [deliveryId]);

  return { delivery, isLoading, error };
};

export default useSingleDelivery;
