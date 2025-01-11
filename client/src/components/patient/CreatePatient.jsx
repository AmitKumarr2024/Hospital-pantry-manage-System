import React, { useState } from "react";
import useCreatePatient from "../../hooks/patient/useCreatePatient";
import useAllFoodCharts from "../../hooks/foodChart/useAllFoodCharts";
import CreateFoodChart from "../foodchart/CreateFoodChart";

const CreatePatient = () => {
  const { createPatient, isLoading, error, successMessage } = useCreatePatient();
  const { foodCharts } = useAllFoodCharts();

  const [patientData, setPatientData] = useState({
    name: "monty moe",
    age: 35,
    gender: "Male",
    contact: "123-456-7890",
    emergencyContact: "987-654-3210",
    allergies: "Peanuts",
    disease: "Diabetes",
    room: "101A",
    dietChartId: "", // Initially empty, will be populated by the select option
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = () => {
    createPatient(patientData);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-1">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Create Patient
        </h2>

        {isLoading && <p className="text-center text-gray-500">Loading...</p>}

        {error && <p className="text-center text-red-500">{error}</p>}

        {successMessage && (
          <p className="text-center text-green-500">{successMessage}</p>
        )}

        <form className="space-y-4 w-full">
          {/* Form Fields */}
          <div className="flex flex-col md:flex-row md:space-x-4 w-full">
            <div className="flex-1 w-full">
              <label htmlFor="name" className="font-semibold text-gray-700">
                Name:
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={patientData.name}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
            </div>

            <div className="flex-1 w-full">
              <label htmlFor="age" className="font-semibold text-gray-700">
                Age:
              </label>
              <input
                id="age"
                type="number"
                name="age"
                value={patientData.age}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 w-full">
            <div className="flex-1 w-full">
              <label htmlFor="gender" className="font-semibold text-gray-700">
                Gender:
              </label>
              <input
                id="gender"
                type="text"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
            </div>

            <div className="flex-1 w-full">
              <label htmlFor="contact" className="font-semibold text-gray-700">
                Contact:
              </label>
              <input
                id="contact"
                type="text"
                name="contact"
                value={patientData.contact}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 w-full">
            <div className="flex-1 w-full">
              <label htmlFor="emergencyContact" className="font-semibold text-gray-700">
                Emergency Contact:
              </label>
              <input
                id="emergencyContact"
                type="text"
                name="emergencyContact"
                value={patientData.emergencyContact}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
            </div>

            <div className="flex-1 w-full">
              <label htmlFor="allergies" className="font-semibold text-gray-700">
                Allergies:
              </label>
              <input
                id="allergies"
                type="text"
                name="allergies"
                value={patientData.allergies}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 w-full">
            <div className="flex-1 w-full">
              <label htmlFor="disease" className="font-semibold text-gray-700">
                Disease:
              </label>
              <input
                id="disease"
                type="text"
                name="disease"
                value={patientData.disease}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
            </div>

            <div className="flex-1 w-full">
              <label htmlFor="room" className="font-semibold text-gray-700">
                Room:
              </label>
              <input
                id="room"
                type="text"
                name="room"
                value={patientData.room}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 w-full">
            <div className="flex-1 w-full">
              <label htmlFor="dietChartId" className="font-semibold text-gray-700">
                Diet Chart:
              </label>

              <select
                name="dietChartId"
                value={patientData.dietChartId}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              >
                <option value="">Select a diet chart</option>
                {foodCharts.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.patientId.name || "Unnamed Diet Chart"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-6 w-full">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {isLoading ? "Creating..." : "Create Patient"}
            </button>
          </div>
        </form>
      </div>

      <div className="col-span-1">
        <CreateFoodChart />
      </div>
    </div>
  );
};

export default CreatePatient;
