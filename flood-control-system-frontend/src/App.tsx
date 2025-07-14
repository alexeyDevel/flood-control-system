import { createBrowserRouter, RouterProvider } from "react-router";
import { SingIn } from "./pages/SingIn";
import theme from "./configs/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Main } from "./layouts/Main";
import { OptimizationRequest } from "./pages/FloodControlSystem/OptimizationRequest";
import { Requests } from "./pages/FloodControlSystem/Requests";
import { OptimizationProjectPage } from "./pages/static/OptimizationProjectPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GlobalProvider } from "./contexts/GlobalContext";
import { General } from "./pages/static/General";
import { FloodControlSystem } from "./pages/FloodControlSystem/FloodControlSystem";
import { ForecastForOptions } from "./pages/FloodControlSystem/ForecastForOptions";
import { useEffect } from "react";
import { fetchUserData } from "./stores/user/user.action";
import { $user } from "src/stores/user/user";
import { useStore } from "@nanostores/react";
import { $auth } from "./stores/auth";
import { InfluenceOfWells } from "./pages/FloodControlSystem/InfluenceOfWells";

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
        element: <FloodControlSystem />,
        children: [
          {
            path: "about",
            element: (
              <ProtectedRoute>
                <OptimizationProjectPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "forecast-for-options",
            element: (
              <ProtectedRoute>
                <ForecastForOptions />
              </ProtectedRoute>
            ),
          },
          {
            path: "create-request",
            element: (
              <ProtectedRoute>
                <OptimizationRequest />
              </ProtectedRoute>
            ),
          },
          {
            path: "influence",
            element: (
              <ProtectedRoute>
                <InfluenceOfWells />
              </ProtectedRoute>
            ),
          },
          {
            path: "requests",
            element: (
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            ),
          },
        ],
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
  const { user } = useStore($user);
  const { accessToken } = useStore($auth);

  useEffect(() => {
    if (accessToken && !user) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </ThemeProvider>
  );
}
