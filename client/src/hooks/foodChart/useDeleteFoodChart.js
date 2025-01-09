import { useState } from "react";

const useDeleteFoodChart = (foodChartId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const deleteFoodChart = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`http://localhost:6002/api/foodChart/delete-food-chart/${foodChartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to delete food chart");
      }

      setMessage(responseData.message); // Set success message
    } catch (err) {
      console.error("Error deleting food chart:", err.message);
      setError(err.message); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteFoodChart, isLoading, error, message };
};

export default useDeleteFoodChart;
