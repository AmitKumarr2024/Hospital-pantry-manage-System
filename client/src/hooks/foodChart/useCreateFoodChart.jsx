import { useState } from "react";

const useCreateFoodChart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const createFoodChart = async (foodChartData) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:6002/api/foodChart/create-food-chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
        },
        body: JSON.stringify(foodChartData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to create food chart");
      }

      setMessage(responseData.message); // Set success message
    } catch (err) {
      console.error("Error creating food chart:", err.message);
      setError(err.message); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  return { createFoodChart, isLoading, error, message };
};

export default useCreateFoodChart;
