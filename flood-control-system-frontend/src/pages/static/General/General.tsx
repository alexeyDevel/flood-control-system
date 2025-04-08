import { Container, Paper, Typography } from "@mui/material";

import generalImg from "assets/static/general.png";

export const General = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h2" sx={{ mt: 2, mb: 2 }}>
          Проект <span style={{ fontWeight: "bold" }}>AIPoligon</span>
        </Typography>
        <img src={generalImg} loading="lazy" width="100%" height="auto" />
        <Typography variant="body1" sx={{ marginTop: "2rem", mb: 1.5 }}>
          Проект AIPoligon представляет собой современную платформу,
          предназначенную для апробации и внедрения передовых технологий на
          основе искусственного интеллекта (ИИ) в ключевых областях нефтедобычи
          и переработки. Основная цель проекта — создание среды для
          тестирования, оптимизации и масштабирования интеллектуальных решений,
          направленных на решение наиболее актуальных задач в нефтегазовой
          отрасли.
        </Typography>
      </Paper>
    </Container>
  );
};
