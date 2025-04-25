import { Box, Paper, Typography } from "@mui/material";
import mainImg from "assets/static/men.png";

export const OptimizationProjectPage = () => {
  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <img
          src={mainImg}
          alt="Нагнетательный фонд"
          loading="lazy"
          width="100%"
          height="auto"
        />
        <Typography variant="body1" sx={{ marginTop: "2rem", mb: 1.5 }}>
          Проект по оперативной оптимизации режимов работы нагнетательного фонда
          и прогноза показателей разработки на основе искусственного интеллекта»
          предлагает решение на основе нейросетевого моделирования и алгоритмов
          оптимизации, с дальнейшей возможностью интегрирования с
          гидродинамическими моделями. Это позволит решать следующие задачи:
        </Typography>
        <Box
          component="ol"
          sx={{ ml: 2, mb: 1, listStyleType: "decimal", pl: 2 }}
        >
          <Box component="li">
            <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
              Оценивать взаимосвязи между добывающими и нагнетательными
              скважинами.
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
              Прогнозировать дебит жидкости и объемы закачки.
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body1">
              Оптимизировать системы заводнения для повышения эффективности
              разработки месторождений.
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" marginTop={3} sx={{ mb: 1 }}>
          Разработанная система позволяет:
        </Typography>
        <Box component="ol" sx={{ ml: 2, listStyleType: "decimal", pl: 2 }}>
          <Box component="li">
            <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
              Прогнозировать ключевые параметры (дебит жидкости, объемы закачки)
              с высокой точностью.
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
              Оптимизировать режимы заводнения для повышения нефтеотдачи.
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body1">
              Автоматизировать процесс анализа и принятия решений, что снижает
              временные и финансовые затраты.
            </Typography>
          </Box>
        </Box>

        {/* <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="primary">
            Узнать больше
          </Button>
        </Box> */}
      </Paper>
    </Box>
  );
};
