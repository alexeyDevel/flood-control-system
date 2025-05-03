import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import styles from "./Header.module.scss";
import AvatarIcon from "assets/static/avatar.jpg";
import { HeaderNav } from "./HeaderNav";
import { Avatar, Button, Typography, Menu, MenuItem } from "@mui/material";
import { useStore } from "@nanostores/react";
import { $auth, authActions } from "src/stores/auth";
import { Link } from "react-router";

import { useState } from "react";

export function Header() {
  const { accessToken } = useStore($auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authActions.reset();
    handleMenuClose();
  };

  return (
    <AppBar position="static" className={styles.headerWrapper}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography className={styles.logo}>AILab "POLYGON"</Typography>
          <HeaderNav />
          {accessToken ? (
            <>
              <Avatar
                src={AvatarIcon}
                onClick={handleMenuOpen}
                style={{ cursor: "pointer" }}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit">
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
