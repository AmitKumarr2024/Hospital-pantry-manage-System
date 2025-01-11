import React from "react";
import AddPantryItem from "../../components/Pantry/AddPantryItem";

const PantryStaff = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <AddPantryItem />
      </div>
    </div>
  );
};

export default PantryStaff;
