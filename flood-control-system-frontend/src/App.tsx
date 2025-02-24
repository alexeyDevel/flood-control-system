import { Routes, Route } from "react-router";
import { SingIn } from "./pages/SingIn";
import theme from "./configs/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Main } from "./layouts/Main";
import { OptimizationRequest } from "./pages/OptimizationRequest";
import { Requests } from "./pages/Requests";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="login" element={<SingIn />} />
        <Route element={<Main />}>
          <Route path="" element={<Requests />} />
          <Route path="createRequest" element={<OptimizationRequest />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
