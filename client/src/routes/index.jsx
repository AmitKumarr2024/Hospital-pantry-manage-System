import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../pages/HospitalManager/Dashboard";
import NotFoundPage from "../components/NotFoundPage";
import Login from "../pages/Login";
import PantryDashboard from "../pages/PantryStaff/PantryDashboard";
import DeliveryDashboard from "../pages/DeliveryPersonnel/DeliveryDashboard";
import ProtectedRoute from "../Protected/ProtectedRoute";
import Signup from "../pages/Signup";
import PatientDetails from "../pages/HospitalManager/PatientDetails";
import CreateNewPatient from "../pages/HospitalManager/CreateNewPatient";
import PatientList from "../pages/HospitalManager/PatientList";
import PantryOrder from "../pages/HospitalManager/PantryOrder";
import AssignedDeliveries from "../pages/DeliveryPersonnel/AssignedDeliveries";
import Orders from "../pages/PantryStaff/Orders";
import Inventory from "../pages/PantryStaff/Inventory";
import PantryStaff from "../pages/PantryStaff/PantryStaff";
import DeliveryStaff from "../pages/DeliveryPersonnel/DeliveryStaff";
import DeliveryOrder from "../pages/DeliveryPersonnel/DeliveryOrder";
import SinglePatient from "../components/patient/SinglePatient";
import PantryAssign from "../pages/HospitalManager/PantryAssign";
import NewDeliveryStaff from "../pages/DeliveryPersonnel/NewDeliveryStaff";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "patient-Details/:id",
            element: <PatientDetails />,
          },
          { path: "create-new-patient", element: <CreateNewPatient /> },
          { path: "patient-list", element: <PatientList /> },
          { path: "pantry-Assign", element: <PantryAssign /> },
          { path: "pantry-order", element: <PantryOrder /> },
          { path: "delivery-Order", element: <DeliveryOrder /> },
        ],
      },
      {
        path: "/pantry",
        element: (
          <ProtectedRoute>
            <PantryDashboard />
          </ProtectedRoute>
        ),
        children: [
          { path: "pantry-order", element: <Orders /> },
          { path: "pantry-inventory", element: <Inventory /> },
          { path: "Assigned-Delivery", element: <AssignedDeliveries /> },
          { path: "pantry-staff", element: <PantryStaff /> },
        ],
      },
      {
        path: "/delivery",
        element: (
          <ProtectedRoute>
            <DeliveryDashboard />
          </ProtectedRoute>
        ),
        children: [
          { path: "new-delivery-staff", element: <NewDeliveryStaff /> },
          { path: "delivery-staff", element: <DeliveryStaff /> },
          { path: "delivery-Order", element: <DeliveryOrder /> },
        ],
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
