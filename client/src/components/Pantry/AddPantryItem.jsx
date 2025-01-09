import React, { useState } from "react";
import usePantry from "../hooks/usePantry";

const AddPantryItem = () => {
  const { addPantryItem, isLoading, error, data } = usePantry();
  const [formData, setFormData] = useState({
    staffName: "",
    contact: "",
    location: "",
    assignedTasks: [],
    pantryItems: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exampleData = {
      staffName: "Tony Stark",
      contact: "1234567890",
      location: "Pantry Room 3",
      assignedTasks: [
        {
          task: "Restock Items",
          status: "Pending",
        },
      ],
      pantryItems: [
        {
          name: "Brinjal",
          quantity: 50,
          category: "Vegetable",
          expiryDate: "2025-01-01T00:00:00.000Z",
          unit: "Kg",
          supplier: "EFG Supplies",
          storageLocation: "Shelf C",
        },
      ],
    };

    await addPantryItem(exampleData);

    if (data) {
      alert("Pantry item added successfully!");
    }
  };

  return (
    <div>
      <h2>Add Pantry Item</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for staffName, contact, etc. */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Pantry Item"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <p style={{ color: "green" }}>Pantry item added successfully!</p>}
    </div>
  );
};

export default AddPantryItem;
