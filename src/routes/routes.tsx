import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Service from "../pages/Service";

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
        element: 'About Us',
      },
      {
        path: "services",
        element: <Service />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signUp",
    element: <Register />
  },
  {
    path: "/dashboard",
    element: <App></App>,
    children: [
      
    ],
  },
]);

export default router;
