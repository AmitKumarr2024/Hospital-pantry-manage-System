import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/sideMenu";

const DashboardLayout = () => {
  const links = [
    { path: "new-delivery-staff", label: "Add New Delivery staff" },
    { path: "delivery-staff", label: "Delivery-staff-Info" },
    { path: "delivery-Order", label: "Delivery-Order" },
  ];
  return (
    <div className="flex flex-col h-screen">
    {/* Header Section */}
   

    {/* Main Content */}
    <div className="flex flex-1 md:flex-row flex-col">
      {/* Sidebar */}
      <aside className="w-full md:w-1/5 bg-gray-200 p-4 space-y-4 md:space-y-8">
        <SideMenu
          title="Manager"
          links={links}
          containerClass="custom-container-class"
          headerClass="custom-header-class"
          linkClass="custom-link-class"
        />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-white overflow-y-auto">
        <Outlet />
      </main>
    </div>

    {/* Footer Section */}
    <footer className="w-full bg-gray-800 text-white p-4 text-center">
      © 2025 Hospital Pantry Management System
    </footer>
  </div>
  );
};

export default DashboardLayout;
