import { Box, Button, Typography } from "@mui/material";
import { TextField } from "ui/TextField";
import styles from "./SingIn.module.scss";
import { StyledBox } from "ui/StyledBox";
import Logo from "src/assets/logo.svg";
import { useNavigate } from "react-router";
import { useState } from "react";
import { authActions } from "src/stores/auth";

export const SingIn = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Редирект на главную страницу после входа
    authActions
      .fetchlogin({ login: login, password: password })
      .then(() => navigate(-1));
  };

  return (
    <Box className={styles.page}>
      <img src={Logo} alt="TATNEFT" height={45} width="auto" />
      <StyledBox className={styles.loginForm}>
        <TextField
          label="Логин"
          type="text"
          autoComplete="login"
          variant="standard"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box className={styles.btnWrapper}>
          <Button className={styles.btn} onClick={handleLogin}>
            <Typography variant="body1">Войти</Typography>
          </Button>
          <Button
            className={styles.btn}
            onClick={() => navigate("/")}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            <Typography variant="body1">На главную</Typography>
          </Button>
        </Box>
      </StyledBox>
    </Box>
  );
};
