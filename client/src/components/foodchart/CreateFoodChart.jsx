import React, { useState } from "react";
import useCreateFoodChart from "../../hooks/foodChart/useCreateFoodChart";
import useAllPatients from "../../hooks/patient/useAllPatients";

const CreateFoodChart = () => {
  const { createFoodChart, isLoading, error, message } = useCreateFoodChart();
  const { patients } = useAllPatients();
  const [foodChartData, setFoodChartData] = useState({
    patientId: "", // Initially empty, will be populated by the select option
    morningMeal: "Oatmeal with fruits",
    afternoonMeal: "Grilled chicken with vegetables",
    eveningMeal: "Salad with quinoa",
    specialInstructions: "No salt in evening meal",
  });

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createFoodChart(foodChartData);
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Create Food Chart
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Select Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Patient:
          </label>
          <select
            name="patientId"
            value={foodChartData.patientId}
            onChange={(e) =>
              setFoodChartData({
                ...foodChartData,
                patientId: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        {/* Meal Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Morning Meal:
          </label>
          <input
            type="text"
            value={foodChartData.morningMeal}
            onChange={(e) =>
              setFoodChartData({
                ...foodChartData,
                morningMeal: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Afternoon Meal:
          </label>
          <input
            type="text"
            value={foodChartData.afternoonMeal}
            onChange={(e) =>
              setFoodChartData({
                ...foodChartData,
                afternoonMeal: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Evening Meal:
          </label>
          <input
            type="text"
            value={foodChartData.eveningMeal}
            onChange={(e) =>
              setFoodChartData({
                ...foodChartData,
                eveningMeal: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Instructions:
          </label>
          <input
            type="text"
            value={foodChartData.specialInstructions}
            onChange={(e) =>
              setFoodChartData({
                ...foodChartData,
                specialInstructions: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Food Chart
        </button>
      </form>

      {/* Display success message */}
      {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
    </div>
  );
};

export default CreateFoodChart;
