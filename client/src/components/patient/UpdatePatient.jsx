import React, { useState, useEffect } from "react";
import useUpdatePatient from "../../hooks/patient/useUpdatePatient";

const UpdatePatient = ({ id }) => {
  const [patientId] = useState(id); // Patient ID passed as a prop
  const [updatedData, setUpdatedData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    emergencyContact: "",
    allergies: "",
    disease: "",
    room: "",
  });

  const { patient, updatePatient, isLoading, error } = useUpdatePatient(patientId);

  useEffect(() => {
    // Populate the form with existing patient details when they are fetched
    if (patient) {
      setUpdatedData({
        name: patient.name || "",
        age: patient.age || "",
        gender: patient.gender || "",
        contact: patient.contact || "",
        emergencyContact: patient.emergencyContact || "",
        allergies: patient.allergies.join(", ") || "",
        disease: patient.disease || "",
        room: patient.room || "",
      });
    }
  }, [patient]);

  const handleUpdate = async () => {
    // Trigger patient update and notify the user
    const message = await updatePatient(updatedData);
    if (message) {
      alert(message);
    }
  };

  const handleChange = (e) => {
    // Update form values dynamically based on user input
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Update Exist Patient</h2>

      <form className="space-y-4">
        {/* Render input fields dynamically for each patient attribute */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter patient's name"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-semibold">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={updatedData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter patient's age"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-semibold">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={updatedData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter patient's gender"
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-semibold">Contact:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={updatedData.contact}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter patient's contact number"
          />
        </div>

        <div>
          <label htmlFor="emergencyContact" className="block text-sm font-semibold">Emergency Contact:</label>
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            value={updatedData.emergencyContact}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter emergency contact number"
          />
        </div>

        <div>
          <label htmlFor="allergies" className="block text-sm font-semibold">Allergies:</label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            value={updatedData.allergies}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter patient's allergies"
          />
        </div>

        <div>
          <label htmlFor="disease" className="block text-sm font-semibold">Disease:</label>
          <input
            type="text"
            id="disease"
            name="disease"
            value={updatedData.disease}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter patient's disease"
          />
        </div>

        <div>
          <label htmlFor="room" className="block text-sm font-semibold">Room:</label>
          <input
            type="text"
            id="room"
            name="room"
            value={updatedData.room}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter room number"
          />
        </div>

        <button
          type="button"
          onClick={handleUpdate}
          className="w-full bg-purple-600 text-white p-2 rounded-lg mt-4 hover:bg-purple-700"
        >
          Update Patient
        </button>
      </form>

      {patient && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-purple-700">Updated Patient Details</h3>
          <div className="space-y-2">
            <p>Name: {patient.name}</p>
            <p>Age: {patient.age}</p>
            <p>Gender: {patient.gender}</p>
            <p>Contact: {patient.contact}</p>
            <p>Emergency Contact: {patient.emergencyContact}</p>
            <p>Allergies: {patient.allergies.join(", ")}</p>
            <p>Disease: {patient.disease}</p>
            <p>Room: {patient.room}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePatient;
