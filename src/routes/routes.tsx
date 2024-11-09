import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Service from "../pages/Service";
import ServiceDetails from "../pages/ServiceDetails";
import BookingPage from "../pages/BookingPage";
import DashboardLayout from "../components/layouts/dashboard/DashboardLayout";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import { adminPaths } from "./adminRoutes";
import { routeGenerator } from "../utils/routesGenerator";
import { userPaths } from "./userRoutes";
import AboutUs from "../pages/AboutUs";
import ReviewPage from "../pages/ReviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "services",
        element: <Service />,
      },
      {
        path: "reviews",
        element: <ReviewPage />,
      },
      {
        path: "services/:id",
        element: (
          // <ProtectedRoute role="user">
            <ServiceDetails />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/bookings",
        element: <BookingPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <Register />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
]);

export default router;
