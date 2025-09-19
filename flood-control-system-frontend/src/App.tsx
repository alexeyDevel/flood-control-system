import { ThemeProvider } from "@mui/material/styles";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { $user } from "src/stores/user/user";
import { ProtectedRoute } from "./components/ProtectedRoute";
import theme from "./configs/theme";
import { GlobalProvider } from "./contexts/GlobalContext";
import { Main } from "./layouts/Main";
import { FloodControlSystem } from "./pages/FloodControlSystem/FloodControlSystem";
import { ForecastForOptions } from "./pages/FloodControlSystem/ForecastForOptions";
import { InfluenceOfWells } from "./pages/FloodControlSystem/InfluenceOfWells";
import { OptimizationRequest } from "./pages/FloodControlSystem/OptimizationRequest";
import { Requests } from "./pages/FloodControlSystem/Requests";
import { PageNotFound } from "./pages/PageNotFound";
import { SingIn } from "./pages/SingIn";
import { General } from "./pages/static/General";
import { OptimizationProjectPage } from "./pages/static/OptimizationProjectPage";
import { $auth } from "./stores/auth";
import { fetchUserData } from "./stores/user/user.action";

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
    element: <PageNotFound/>,
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
