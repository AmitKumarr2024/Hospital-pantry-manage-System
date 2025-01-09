import React, { useState } from "react";
import useCreateFoodChart from "../hooks/useCreateFoodChart";

const CreateFoodChart = () => {
  const { createFoodChart, isLoading, error, message } = useCreateFoodChart();
  const [foodChartData, setFoodChartData] = useState({
    patientId: "677f973b07a122e4b5cbd78b", // Example patient ID
    morningMeal: "Oatmeal with fruits",
    afternoonMeal: "Grilled chicken with vegetables",
    eveningMeal: "Salad with quinoa",
    specialInstructions: "No salt in evening meal",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createFoodChart(foodChartData);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Create Food Chart</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Morning Meal:</label>
          <input
            type="text"
            value={foodChartData.morningMeal}
            onChange={(e) =>
              setFoodChartData({ ...foodChartData, morningMeal: e.target.value })
            }
          />
        </div>
        <div>
          <label>Afternoon Meal:</label>
          <input
            type="text"
            value={foodChartData.afternoonMeal}
            onChange={(e) =>
              setFoodChartData({ ...foodChartData, afternoonMeal: e.target.value })
            }
          />
        </div>
        <div>
          <label>Evening Meal:</label>
          <input
            type="text"
            value={foodChartData.eveningMeal}
            onChange={(e) =>
              setFoodChartData({ ...foodChartData, eveningMeal: e.target.value })
            }
          />
        </div>
        <div>
          <label>Special Instructions:</label>
          <input
            type="text"
            value={foodChartData.specialInstructions}
            onChange={(e) =>
              setFoodChartData({ ...foodChartData, specialInstructions: e.target.value })
            }
          />
        </div>
        <button type="submit">Create Food Chart</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateFoodChart;
