import { useState } from "react";

const useDeleteDelivery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const deleteDelivery = async (deliveryId) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(`http://localhost:6002/api/delivery/delete-delivery/${deliveryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to delete delivery");
      }

      const responseData = await response.json();
      setSuccessMessage(responseData.message);
    } catch (err) {
      console.error("Error deleting delivery:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteDelivery, isLoading, error, successMessage };
};

export default useDeleteDelivery;
