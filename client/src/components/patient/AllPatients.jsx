import React, { useEffect, useState } from "react";
import useAllPatients from "../../hooks/patient/useAllPatients";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPatientItems } from "../../redux/patientSlice";

const AllPatients = () => {
  const dispatch = useDispatch();

  const { patients, isLoading, error } = useAllPatients();

  const patientSummary = Object.values(patients);

  console.log("patients", patientSummary);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const totalPages = Math.ceil(patientSummary.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = patientSummary.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  useEffect(() => {
    if (patients.length) {
      dispatch(setPatientItems(patients));
    }
  }, [dispatch, patients]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">
        All Patients
      </h2>
      {patients.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8">
          {patients.map((patient) => (
            <Link
              to={`/dashboard/patient-Details/${patient._id}`}
              key={patient._id}
              className="block bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {patient.name}
              </h3>
              <div className="text-gray-600 space-y-2">
                <p>
                  <span className="font-medium text-purple-600">Age:</span>{" "}
                  {patient.age}
                </p>
                <p>
                  <span className="font-medium text-purple-600">Gender:</span>{" "}
                  {patient.gender}
                </p>
                <p>
                  <span className="font-medium text-purple-600">Contact:</span>{" "}
                  {patient.contact}
                </p>
                <p>
                  <span className="font-medium text-purple-600">
                    Emergency Contact:
                  </span>{" "}
                  {patient.emergencyContact}
                </p>
                <p>
                  <span className="font-medium text-purple-600">
                    Allergies:
                  </span>{" "}
                  {patient.allergies.join(", ")}
                </p>
                <p>
                  <span className="font-medium text-purple-600">Disease:</span>{" "}
                  {patient.disease}
                </p>
                <p>
                  <span className="font-medium text-purple-600">Room:</span>{" "}
                  {patient.room}
                </p>
              </div>

              {patient.dietChart && (
                <div className="mt-6 bg-purple-50 p-4 rounded-md border-l-4 border-purple-500">
                  <h4 className="font-bold text-purple-700 mb-3">Diet Chart</h4>
                  <p>
                    <span className="font-medium text-purple-600">
                      Morning Meal:
                    </span>{" "}
                    {patient.dietChart.morningMeal}
                  </p>
                  <p>
                    <span className="font-medium text-purple-600">
                      Afternoon Meal:
                    </span>{" "}
                    {patient.dietChart.afternoonMeal}
                  </p>
                  <p>
                    <span className="font-medium text-purple-600">
                      Evening Meal:
                    </span>{" "}
                    {patient.dietChart.eveningMeal}
                  </p>
                  <p>
                    <span className="font-medium text-purple-600">
                      Special Instructions:
                    </span>{" "}
                    {patient.dietChart.specialInstructions}
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 bg-gray-50 mt-8 rounded-lg shadow-md">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPatients;
