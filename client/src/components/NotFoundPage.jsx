import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1> {/* Display large 404 error */}
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <button
        onClick={() => window.history.back()} // Navigate back to the previous page
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
      >
        Go Back
      </button>
      <p className="mt-4 text-sm text-gray-500">
        If the issue persists, please contact support. {/* Friendly footer message */}
      </p>
    </div>
  );
};

export default NotFoundPage;
