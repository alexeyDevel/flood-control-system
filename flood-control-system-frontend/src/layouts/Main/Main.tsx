import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { Header } from "src/components/Header";
import styles from "./Main.module.scss";

export const Main = () => {
  return (
    <Box className={styles.container}>
      <Header />
      <Box className={styles.containerInner}>
        <Outlet />
      </Box>
    </Box>
  );
};
