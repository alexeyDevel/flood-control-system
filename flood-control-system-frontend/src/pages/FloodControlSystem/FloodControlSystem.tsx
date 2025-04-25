import { Box, Grid2, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router";
import styles from "./FloodControlSystem.module.scss";

export const FloodControlSystem = () => {
  return (
    <Grid2 container className={styles.container}>
      <Grid2 size={3}>
        <nav className={styles.sidebar}>
          <NavLink
            to="/services/optimization/requests"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? styles.active : ""
            }
          >
            <Typography variant="body1">Результаты запросов</Typography>
          </NavLink>
          <NavLink
            to="/services/optimization/create-request"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? styles.active : ""
            }
          >
            <Typography variant="body1">Оптимизация режимов закачки</Typography>
          </NavLink>
          <NavLink
            to="/services/optimization/forecast-for-options"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? styles.active : ""
            }
          >
            <Typography variant="body1">
              Прогноз по вариантам с "ограничениями"
            </Typography>
          </NavLink>
          <NavLink
            to="/services/optimization/about"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? styles.active : ""
            }
          >
            <Typography variant="body1">О проекте</Typography>
          </NavLink>
        </nav>
      </Grid2>
      <Grid2 size={6}>
        <Box style={{ padding: "0 24px 24px" }}>
          <Outlet />
        </Box>
      </Grid2>
    </Grid2>
  );
};
