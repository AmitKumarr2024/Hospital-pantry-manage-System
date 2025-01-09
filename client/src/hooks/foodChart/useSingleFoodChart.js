import { useState, useEffect } from "react";

const useSingleFoodChart = (foodChartId) => {
  const [foodChart, setFoodChart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodChart = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:6002/api/foodChart/single-foodChart/${foodChartId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
          },
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error || "Failed to fetch food chart");
        }

        setFoodChart(responseData.foodChart); // Set food chart data
      } catch (err) {
        console.error("Error fetching food chart:", err.message);
        setError(err.message); // Set error message
      } finally {
        setIsLoading(false);
      }
    };

    if (foodChartId) {
      fetchFoodChart();
    }
  }, [foodChartId]);

  return { foodChart, isLoading, error };
};

export default useSingleFoodChart;
