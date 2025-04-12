import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import styles from "./Header.module.scss";
// import LogoIcon from "src/assets/logoIcon.svg";
import AvatarIcon from "assets/static/avatar.jpg";
import { HeaderNav } from "./HeaderNav";
import { Avatar, Button, Typography } from "@mui/material";
import { useStore } from "@nanostores/react";
import { $auth } from "src/stores/auth";
import { NavLink } from "react-router";

export function Header() {
  const { accessToken } = useStore($auth);
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
          <Typography className={styles.logo}>AILab "POLYGON"</Typography>
          <HeaderNav />
          {accessToken ? (
            <Avatar src={AvatarIcon} />
          ) : (
            <Button color="inherit">
              <NavLink to={"/login"}>Login</NavLink>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
