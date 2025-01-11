import React, { useState } from "react";
import useUpdateFoodChart from "../hooks/useUpdateFoodChart";

const UpdateFoodChart = () => {
  const [foodChartData, setFoodChartData] = useState({
    patientId: "677f7a0cf245c112a4c5dad0", // Example patient ID
    morningMeal: "Pancakes",
    afternoonMeal: "Grilled chicken with rice",
    eveningMeal: "Salad with dressing",
    specialInstructions: "No spicy food",
  });

  const { updateFoodChart, isLoading, error, message } = useUpdateFoodChart("677f7e45234f0c852939eab8"); // Example food chart ID

  // Handle food chart data updates
  const handleUpdate = async () => {
    await updateFoodChart(foodChartData);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFoodChartData({
      ...foodChartData,
      [e.target.name]: e.target.value,
    });
  };

  // Show loading indicator while updating
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Display error message if update fails
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Update Food Chart</h2>
      <label>Morning Meal:</label>
      <input
        type="text"
        name="morningMeal"
        value={foodChartData.morningMeal}
        onChange={handleChange}
      />
      <br />

      <label>Afternoon Meal:</label>
      <input
        type="text"
        name="afternoonMeal"
        value={foodChartData.afternoonMeal}
        onChange={handleChange}
      />
      <br />

      <label>Evening Meal:</label>
      <input
        type="text"
        name="eveningMeal"
        value={foodChartData.eveningMeal}
        onChange={handleChange}
      />
      <br />

      <label>Special Instructions:</label>
      <input
        type="text"
        name="specialInstructions"
        value={foodChartData.specialInstructions}
        onChange={handleChange}
      />
      <br />

      <button onClick={handleUpdate}>Update Food Chart</button>

      {/* Display success message after successful update */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateFoodChart;
