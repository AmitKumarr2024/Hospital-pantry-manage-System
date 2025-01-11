import React from "react";
import SinglePatient from "../../components/patient/SinglePatient";
import { useParams } from "react-router";
import UpdatePatient from "../../components/patient/UpdatePatient";

const PatientDetails = () => {
  const { id } = useParams();

  return (
    <div className="w-full min-h-screen bg-cover bg-center bg-opacity-40 flex justify-center items-center">
      <div className="bg-white w-full sm:w-11/12 md:w-11/12  bg-opacity-90 rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Update Patient Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <SinglePatient id={id} />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <UpdatePatient id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
