import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import ProtectedRoute from "../Protected/ProtectedRoute";

// Lazy-loaded components
const Dashboard = lazy(() => import("../pages/HospitalManager/Dashboard"));
const NotFoundPage = lazy(() => import("../components/NotFoundPage"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const PantryDashboard = lazy(() => import("../pages/PantryStaff/PantryDashboard"));
const DeliveryDashboard = lazy(() =>
  import("../pages/DeliveryPersonnel/DeliveryDashboard")
);
const PatientDetails = lazy(() => import("../pages/HospitalManager/PatientDetails"));
const CreateNewPatient = lazy(() =>
  import("../pages/HospitalManager/CreateNewPatient")
);
const PatientList = lazy(() => import("../pages/HospitalManager/PatientList"));
const PantryOrder = lazy(() => import("../pages/HospitalManager/PantryOrder"));
const AssignedDeliveries = lazy(() =>
  import("../pages/DeliveryPersonnel/AssignedDeliveries")
);
const Orders = lazy(() => import("../pages/PantryStaff/Orders"));
const Inventory = lazy(() => import("../pages/PantryStaff/Inventory"));
const PantryStaff = lazy(() => import("../pages/PantryStaff/PantryStaff"));
const DeliveryStaff = lazy(() =>
  import("../pages/DeliveryPersonnel/DeliveryStaff")
);
const DeliveryOrder = lazy(() => import("../pages/DeliveryPersonnel/DeliveryOrder"));
const SinglePatient = lazy(() => import("../components/patient/SinglePatient"));
const PantryAssign = lazy(() => import("../pages/HospitalManager/PantryAssign"));
const NewDeliveryStaff = lazy(() =>
  import("../pages/DeliveryPersonnel/NewDeliveryStaff")
);

// Router configuration
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
