import React, { useState } from "react";
import useDeleteDelivery from "../hooks/useDeleteDelivery";

const DeleteDelivery = ({ deliveryId }) => {
  const { deleteDelivery, isLoading, error, successMessage } = useDeleteDelivery();

  const handleDelete = () => {
    deleteDelivery(deliveryId);
  };

  return (
    <div>
      <h2>Delete Delivery</h2>

      {isLoading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <button onClick={handleDelete} disabled={isLoading}>
        Delete Delivery
      </button>
    </div>
  );
};

export default DeleteDelivery;
