import { Box } from "@mui/material";

import { PAGES } from "./HeaderNav.const";
import styles from "./HeaderNav.module.scss";
import { NavItem } from "./NavItem";

export const HeaderNav = () => {
  return (
    <Box className={styles.navLinks}>
      {PAGES.map((page) => (
        <NavItem page={page} />
      ))}
    </Box>
  );
};
