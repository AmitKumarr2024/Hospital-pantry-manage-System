import React, { useState, useEffect } from "react";
import useCreateDelivery from "../../hooks/delivery/useCreateDelivery";
import useAllPatients from "../../hooks/patient/useAllPatients";

const CreateDelivery = () => {
  const { patients } = useAllPatients();
  const [deliveryPerson, setDeliveryPerson] = useState("");
  const [patientId, setPatientId] = useState(null);
  const [roomDetails, setRoomDetails] = useState("");
  const [notes, setNotes] = useState("");

  const { createDelivery, isLoading, error, deliveryData } = useCreateDelivery();

  // Set default patientId when patients are loaded
  useEffect(() => {
    if (patients && patients.length > 0) {
      setPatientId(patients[0]._id);
    }
  }, [patients]);

  const handleSubmit = () => {
    const deliveryInfo = {
      deliveryPerson,
      patientId,
      roomDetails,
      notes,
    };
    createDelivery(deliveryInfo);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Delivery</h2>

      <form className="space-y-6">
        {/* Input for Delivery Person */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Person
          </label>
          <input
            type="text"
            value={deliveryPerson}
            onChange={(e) => setDeliveryPerson(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="Enter delivery person name"
          />
        </div>

        {/* Dropdown for Select Patient */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Patient
          </label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          >
            {patients && patients.length > 0 ? (
              patients.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))
            ) : (
              <option value="">No Patients Available</option>
            )}
          </select>
        </div>

        {/* Input for Room Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Room Details
          </label>
          <input
            type="text"
            value={roomDetails}
            onChange={(e) => setRoomDetails(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="Enter room details (e.g., Room 307, Building B)"
          />
        </div>

        {/* Input for Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="Enter additional notes (e.g., Deliver before noon)"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full py-2 px-4 text-white font-medium rounded-md shadow ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Creating Delivery..." : "Create Delivery"}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Success Message */}
      {deliveryData && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-md text-green-700">
          <h3 className="font-bold">Delivery Created Successfully</h3>
          <pre className="text-sm">{JSON.stringify(deliveryData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreateDelivery;
