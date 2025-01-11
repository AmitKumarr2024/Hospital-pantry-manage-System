import React, { useState } from "react";
import useSingleFoodChart from "../hooks/useSingleFoodChart";

const FoodChartDetails = () => {
  const [foodChartId, setFoodChartId] = useState("677f7e45234f0c852939eab8"); // Example food chart ID
  const { foodChart, isLoading, error } = useSingleFoodChart(foodChartId);

  // Show loading indicator while fetching data
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Display error message if something goes wrong
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Food Chart Details</h2>
      {foodChart ? (
        <div>
          {/* Display food chart details */}
          <p><strong>Morning Meal:</strong> {foodChart.morningMeal}</p>
          <p><strong>Afternoon Meal:</strong> {foodChart.afternoonMeal}</p>
          <p><strong>Evening Meal:</strong> {foodChart.eveningMeal}</p>
          <p><strong>Special Instructions:</strong> {foodChart.specialInstructions}</p>
        </div>
      ) : (
        // Show message when no food chart is found
        <p>No food chart found.</p>
      )}
    </div>
  );
};

export default FoodChartDetails;
