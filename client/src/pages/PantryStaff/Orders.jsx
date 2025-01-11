import React from "react";
import ViewPantryItems from "../../components/Pantry/ViewPantryItems";
import UpdatePantryItem from "../../components/Pantry/UpdatePantryItem";

const Orders = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Title Section */}
      <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-1">Orders & Pantry Management</h1>

      {/* View Pantry Items Section */}
      <div className="mb-8">
       
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ViewPantryItems />
        </div>
      </div>

     
    </div>
  );
};

export default Orders;
