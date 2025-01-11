import React from "react";
import CreatePatient from "../../components/patient/CreatePatient";
import CreateFoodChart from "../../components/foodchart/CreateFoodChart";

const CreateNewPatient = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Create New Patient and chart
      </h2>
      
        <CreatePatient />
      
    </>
  );
};

export default CreateNewPatient;
