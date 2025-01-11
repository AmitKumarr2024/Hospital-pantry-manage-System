import React from "react";
import useSinglePatient from "../../hooks/patient/useSinglePatient";

const SinglePatient = ({ id }) => {
  const { patient, isLoading, error } = useSinglePatient(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-24">
        <p className="text-xl text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-24">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex justify-center items-center h-24">
        <p className="text-xl text-gray-500">No patient found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto mt-8">
      <h3 className="text-3xl font-bold text-center text-purple-700 mb-6">Patient Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-700">Name:</h4>
          <p className="text-gray-600">{patient.name}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Age:</h4>
          <p className="text-gray-600">{patient.age}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Gender:</h4>
          <p className="text-gray-600">{patient.gender}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Contact:</h4>
          <p className="text-gray-600">{patient.contact}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Emergency Contact:</h4>
          <p className="text-gray-600">{patient.emergencyContact}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Allergies:</h4>
          <p className="text-gray-600">{patient.allergies.join(", ")}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Disease:</h4>
          <p className="text-gray-600">{patient.disease}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Room:</h4>
          <p className="text-gray-600">{patient.room}</p>
        </div>
      </div>

      {patient.dietChart && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-purple-700 mb-4">Diet Chart</h4>
          <div className="space-y-4">
            <p>
              <span className="font-semibold text-gray-800">Morning Meal:</span>{" "}
              {patient.dietChart.morningMeal}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Afternoon Meal:</span>{" "}
              {patient.dietChart.afternoonMeal}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Evening Meal:</span>{" "}
              {patient.dietChart.eveningMeal}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Special Instructions:</span>{" "}
              {patient.dietChart.specialInstructions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePatient;
