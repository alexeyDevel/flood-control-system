import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import styles from "./Header.module.scss";
// import LogoIcon from "src/assets/logoIcon.svg";
import { HeaderNav } from "./HeaderNav";
import { Typography } from "@mui/material";

export function Header() {
  return (
    <AppBar position="static" className={styles.headerWrapper}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <img
            className={styles.logoIcon}
            src={LogoIcon}
            alt="TATNEFT"
            height={25}
            width="auto"
          /> */}
          <Typography className={styles.logo}>AILab "POLIGON"</Typography>
          <HeaderNav />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
