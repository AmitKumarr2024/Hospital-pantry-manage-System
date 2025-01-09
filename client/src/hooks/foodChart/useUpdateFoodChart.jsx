import { useState } from "react";

const useUpdateFoodChart = (foodChartId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const updateFoodChart = async (foodChartData) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`http://localhost:6002/api/foodChart/update-food-chart/${foodChartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
        body: JSON.stringify(foodChartData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to update food chart");
      }

      setMessage(responseData.message); // Set success message
    } catch (err) {
      console.error("Error updating food chart:", err.message);
      setError(err.message); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  return { updateFoodChart, isLoading, error, message };
};

export default useUpdateFoodChart;
