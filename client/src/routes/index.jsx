import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import ProtectedRoute from "../Protected/ProtectedRoute";

// Utility function to simulate delay for demo purposes
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Lazy-loaded components
const Dashboard = lazy(() =>
  wait(2000).then(() => import("../pages/HospitalManager/Dashboard"))
);
const NotFoundPage = lazy(() =>
  wait(2000).then(() => import("../components/NotFoundPage"))
);
const Login = lazy(() => wait(2000).then(() => import("../pages/Login")));
const Signup = lazy(() => wait(2000).then(() => import("../pages/Signup")));
const PantryDashboard = lazy(() =>
  wait(2000).then(() => import("../pages/PantryStaff/PantryDashboard"))
);
const DeliveryDashboard = lazy(() =>
  wait(2000).then(() => import("../pages/DeliveryPersonnel/DeliveryDashboard"))
);
const PatientDetails = lazy(() =>
  wait(2000).then(() => import("../pages/HospitalManager/PatientDetails"))
);
const CreateNewPatient = lazy(() =>
  wait(2000).then(() => import("../pages/HospitalManager/CreateNewPatient"))
);
const PatientList = lazy(() =>
  wait(2000).then(() => import("../pages/HospitalManager/PatientList"))
);
const PantryOrder = lazy(() =>
  wait(2000).then(() => import("../pages/HospitalManager/PantryOrder"))
);
const AssignedDeliveries = lazy(() =>
  wait(2000).then(() => import("../pages/DeliveryPersonnel/AssignedDeliveries"))
);
const Orders = lazy(() =>
  wait(2000).then(() => import("../pages/PantryStaff/Orders"))
);
const Inventory = lazy(() =>
  wait(2000).then(() => import("../pages/PantryStaff/Inventory"))
);
const PantryStaff = lazy(() =>
  wait(2000).then(() => import("../pages/PantryStaff/PantryStaff"))
);
const DeliveryStaff = lazy(() =>
  wait(2000).then(() => import("../pages/DeliveryPersonnel/DeliveryStaff"))
);
const DeliveryOrder = lazy(() =>
  wait(2000).then(() => import("../pages/DeliveryPersonnel/DeliveryOrder"))
);
const SinglePatient = lazy(() =>
  wait(2000).then(() => import("../components/patient/SinglePatient"))
);
const PantryAssign = lazy(() =>
  wait(2000).then(() => import("../pages/HospitalManager/PantryAssign"))
);
const NewDeliveryStaff = lazy(() =>
  wait(2000).then(() => import("../pages/DeliveryPersonnel/NewDeliveryStaff"))
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
