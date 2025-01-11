import React, { useState } from "react";
import { useSelector } from "react-redux";
import useViewAllDeliveries from "../../hooks/delivery/useViewAllDeliveries";

const DeliveryOrder = () => {
  const { deliveries, isLoading, error, refetch } = useViewAllDeliveries(); // Use the hook

  // Summarizing data by delivery person
  const summary = deliveries.reduce((acc, delivery) => {
    const { deliveryPerson, status } = delivery;

    if (!acc[deliveryPerson]) {
      acc[deliveryPerson] = {
        deliveryPerson,
        totalTasks: 0,
        assigned: 0,
        delivered: 0,
        canceled: 0,
      };
    }

    acc[deliveryPerson].totalTasks += 1;

    if (status === "Assigned") acc[deliveryPerson].assigned += 1;
    else if (status === "Delivered") acc[deliveryPerson].delivered += 1;
    else if (status === "Cancel") acc[deliveryPerson].canceled += 1;

    return acc;
  }, {});

  const summaryArray = Object.values(summary); // Convert summary object to an array for mapping

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15; // Number of rows per page

  // Calculate pagination details
  const totalPages = Math.ceil(summaryArray.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = summaryArray.slice(startIndex, startIndex + rowsPerPage);

  // Pagination handlers
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="h-screen grid grid-rows-[auto,1fr] p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Delivery Orders Summary</h1>

      {isLoading ? (
        <p className="text-center text-gray-500 mt-4">Loading deliveries...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-4">{error}</p>
      ) : deliveries.length > 0 ? (
        <div className="overflow-auto border border-gray-800 flex flex-col justify-between rounded-lg shadow-md bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 sticky top-0">
                <th className="px-6 py-3 text-left text-base font-bold">Delivery Person</th>
                <th className="px-6 py-3 text-left text-base font-bold">Total Tasks</th>
                <th className="px-6 py-3 text-left text-base font-bold">Assigned</th>
                <th className="px-6 py-3 text-left text-base font-bold">Delivered</th>
                <th className="px-6 py-3 text-left text-base font-bold">Canceled</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((person) => (
                <tr key={person.deliveryPerson} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-lg text-gray-900">{person.deliveryPerson}</td>
                  <td className="px-6 py-4 text-lg text-gray-900">{person.totalTasks}</td>
                  <td className="px-6 py-4 text-lg text-gray-900">{person.assigned}</td>
                  <td className="px-6 py-4 text-lg text-gray-900">{person.delivered}</td>
                  <td className="px-6 py-4 text-lg text-gray-900">{person.canceled}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4 bg-gray-50">
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
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No deliveries available.</p>
      )}
    </div>
  );
};

export default DeliveryOrder;
