import { useState } from "react";

const useCreateDelivery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deliveryData, setDeliveryData] = useState(null);

  const createDelivery = async (deliveryInfo) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:6002/api/delivery/create-delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
        body: JSON.stringify(deliveryInfo),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to create delivery");
      }

      const responseData = await response.json();
      setDeliveryData(responseData);
    } catch (err) {
      console.error("Error creating delivery:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { createDelivery, isLoading, error, deliveryData };
};

export default useCreateDelivery;
