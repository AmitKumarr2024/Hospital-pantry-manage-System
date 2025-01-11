import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import useViewAllDeliveries from "../../hooks/delivery/useViewAllDeliveries";
import { setDeliveryDetails } from "../../redux/deliverySlice";
import UpdateDelivery from "./UpdateDelivery";
import { useDispatch } from "react-redux";

const ViewAllDeliveries = () => {
  const dispatch = useDispatch();
  const { deliveries, isLoading, error, refetch } = useViewAllDeliveries();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    if (isLoading) toast.loading("Loading deliveries...");
    if (error) toast.error("Error fetching deliveries. Please try again!");
    if (!isLoading && !error) toast.dismiss();

    if (deliveries.length === 0) {
      toast("No deliveries available.");
    } else if (deliveries.length > 0) {
      dispatch(setDeliveryDetails(deliveries));
    }
  }, [isLoading, error, deliveries, dispatch]);

  const totalPages = Math.ceil(deliveries.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = deliveries.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
     
      <h2 className="text-3xl font-bold mb-6 text-center">All Deliveries</h2>

      {isLoading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {deliveries.length > 0 && !isLoading && !error ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {currentRows.map((delivery) => (
              <div
                key={delivery._id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Delivery Info
                </h3>
                <p className="text-sm">
                  <strong>Delivery Person:</strong> {delivery.deliveryPerson}
                </p>
                <p className="text-sm">
                  <strong>Patient Name:</strong> {delivery.patientId.name}
                </p>
                <p className="text-sm">
                  <strong>Room Details:</strong> {delivery.roomDetails}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      delivery.status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    } font-semibold`}
                  >
                    {delivery.status}
                  </span>
                </p>
                <p className="text-sm">
                  <strong>Notes:</strong> {delivery.notes || "None"}
                </p>
                <p className="text-sm">
                  <strong>Created At:</strong>{" "}
                  {new Date(delivery.createdAt).toLocaleString()}
                </p>
                <p className="text-sm">
                  <strong>Updated At:</strong>{" "}
                  {new Date(delivery.updatedAt).toLocaleString()}
                </p>
                <UpdateDelivery id={delivery._id} refetch={refetch} />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium rounded ${
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
              className={`px-4 py-2 text-sm font-medium rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">
          No deliveries available at the moment.
        </p>
      )}
    </div>
  );
};

export default ViewAllDeliveries;
