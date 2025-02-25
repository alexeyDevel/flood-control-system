import { Routes, Route, Outlet } from "react-router";
import { SingIn } from "./pages/SingIn";
import theme from "./configs/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Main } from "./layouts/Main";
import { OptimizationRequest } from "./pages/OptimizationRequest";
import { Requests } from "./pages/Requests";
//test
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="services" element={<Outlet />}>
            <Route path="optimization" element={<OptimizationRequest />} />
            <Route path="optimization/requests" element={<Requests />} />
          </Route>
        </Route>
        <Route path="login" element={<SingIn />} />
      </Routes>
    </ThemeProvider>
  );
}
