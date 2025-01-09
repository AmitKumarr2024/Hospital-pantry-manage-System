import { useState, useEffect } from "react";

const useAllFoodCharts = () => {
  const [foodCharts, setFoodCharts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodCharts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:6002/api/foodChart/all-food-charts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch food charts");
        }

        setFoodCharts(data.foodCharts); // Store the fetched food charts
      } catch (err) {
        console.error("Error fetching food charts:", err.message);
        setError(err.message); // Set error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodCharts();
  }, []);

  return { foodCharts, isLoading, error };
};

export default useAllFoodCharts;
