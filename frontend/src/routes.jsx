import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login-page";
import ErrorPage from "./pages/error-page";
import HomePage from "./pages/home-page";
import SetUp2FA from "./pages/setup-2fa";
import Verify2FA from "./pages/verify-2fa";
import ProtectedRoute from "./components/protected-route";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/setup-2fa",
        element: <SetUp2FA />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/verify-2fa",
        element: <Verify2FA />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
