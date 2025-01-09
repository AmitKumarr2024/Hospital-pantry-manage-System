import React, { useState } from "react";
import useDeleteFoodChart from "../hooks/useDeleteFoodChart";

const DeleteFoodChart = () => {
  const [foodChartId, setFoodChartId] = useState("677f7e45234f0c852939eab8"); // Example food chart ID
  const { deleteFoodChart, isLoading, error, message } = useDeleteFoodChart(foodChartId);

  const handleDelete = async () => {
    await deleteFoodChart();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Delete Food Chart</h2>
      <button onClick={handleDelete}>Delete Food Chart</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteFoodChart;
