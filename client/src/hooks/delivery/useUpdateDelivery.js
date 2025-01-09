import { useState } from "react";

const useUpdateDelivery = () => {
  const [delivery, setDelivery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const updateDelivery = async (deliveryId, updatedData) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(`http://localhost:6002/api/delivery/update-delivery/${deliveryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to update delivery");
      }

      const responseData = await response.json();
      setDelivery(responseData.delivery);
      setSuccessMessage(responseData.message);
    } catch (err) {
      console.error("Error updating delivery:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { delivery, updateDelivery, isLoading, error, successMessage };
};

export default useUpdateDelivery;
