import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

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
    ],
  },
  {
    path: "/home",
    element: <App></App>,
    children: [
      
    ],
  },
]);

export default router;
