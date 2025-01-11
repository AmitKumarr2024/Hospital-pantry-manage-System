import React from "react";
import AllPatients from "../../components/patient/AllPatients";

const PatientList = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white w-full h-full bg-opacity-90 rounded-lg shadow-xl p-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          All Patients
        </h2>
        <AllPatients />
      </div>
    </div>
  );
};

export default PatientList;
