import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../pages/HospitalManager/Dashboard";
import NotFoundPage from "../components/NotFoundPage";
import Login from "../pages/Login";
import PantryDashboard from "../pages/PantryStaff/PantryDashboard";
import DeliveryDashboard from "../pages/DeliveryPersonnel/DeliveryDashboard";
import ProtectedRoute from "../Protected/ProtectedRoute";
import Signup from "../pages/Signup";

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
        children: [{}],
      },
      {
        path: "/pantry",
        element: (
          <ProtectedRoute>
            <PantryDashboard />
          </ProtectedRoute>
        ),
        children: [{}],
      },
      {
        path: "/delivery",
        element: (
          <ProtectedRoute>
            <DeliveryDashboard />
          </ProtectedRoute>
        ),
        children: [{}],
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
