import { Box, Button, Typography } from "@mui/material";
import { TextField } from "ui/TextField";
import styles from "./SingIn.module.scss";
import { StyledBox } from "ui/StyledBox";
import Logo from "src/assets/logo.svg";
import { useNavigate } from "react-router";

export const SingIn = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Редирект на главную страницу после входа
    navigate("/");
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
        />
        <TextField
          label="Пароль"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />
        <Button className={styles.btn} onClick={handleLogin}>
          <Typography variant="body1">Войти</Typography>
        </Button>
      </StyledBox>
    </Box>
  );
};
