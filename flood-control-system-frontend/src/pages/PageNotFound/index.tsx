import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Logo from "src/assets/logo.svg";
import { StyledBox } from "ui/StyledBox";
import styles from "./NotFound.module.scss";

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box className={styles.page}>
      <img src={Logo} alt="TATNEFT" height={45} width="auto" />
      
      <StyledBox className={styles.content}>
        <Box className={styles.errorCode}>
          <Typography variant="h1" className={styles.four}>4</Typography>
          <Box component="span" className={styles.zeroContainer}>
            <Typography variant="h1" className={styles.zero}>0</Typography>
            <Box className={styles.circle}></Box>
          </Box>
          <Typography variant="h1" className={styles.four}>4</Typography>
        </Box>
        
        <Typography variant="h4" className={styles.title}>
          Страница не найдена
        </Typography>
        
        <Typography variant="body1" className={styles.message}>
          Извините, но страница, которую вы ищете, не существует или была перемещена.
        </Typography>
        
        <Box className={styles.btnWrapper}>
          <Button 
            className={styles.btn} 
            onClick={() => navigate(-1)}
            variant="contained"
          >
            <Typography variant="body1">Вернуться назад</Typography>
          </Button>
          <Button
            className={styles.btn}
            onClick={() => navigate("/")}
            variant="outlined"
          >
            <Typography variant="body1">На главную</Typography>
          </Button>
        </Box>
      </StyledBox>
    </Box>
  );
};