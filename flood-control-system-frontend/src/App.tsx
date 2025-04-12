import { createBrowserRouter, RouterProvider } from "react-router";
import { SingIn } from "./pages/SingIn";
import theme from "./configs/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Main } from "./layouts/Main";
import { OptimizationRequest } from "./pages/OptimizationRequest";
import { Requests } from "./pages/Requests";
import { OptimizationProjectPage } from "./pages/static/OptimizationProjectPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GlobalProvider } from "./contexts/GlobalContext";
import { General } from "./pages/static/General";

// Создаем маршруты с помощью createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <General />,
      },
      {
        path: "services/optimization",
        element: <OptimizationProjectPage />,
      },
      {
        path: "services/optimization/create-request",
        element: (
          <ProtectedRoute>
            <OptimizationRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: "services/optimization/requests",
        element: (
          <ProtectedRoute>
            <Requests />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <SingIn />,
  },
  {
    path: "*",
    element: <div>400000004</div>,
  },
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </ThemeProvider>
  );
}
