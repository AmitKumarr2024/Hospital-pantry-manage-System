import React from "react";
import useAllFoodCharts from "../hooks/useAllFoodCharts";

const AllFoodCharts = () => {
  const { foodCharts, isLoading, error } = useAllFoodCharts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>All Food Charts</h2>
      {foodCharts.length === 0 ? (
        <p>No food charts available</p>
      ) : (
        <ul>
          {foodCharts.map((chart) => (
            <li key={chart._id}>
              <h3>{chart.morningMeal}</h3>
              <p>Afternoon Meal: {chart.afternoonMeal}</p>
              <p>Evening Meal: {chart.eveningMeal}</p>
              <p>Special Instructions: {chart.specialInstructions}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllFoodCharts;
