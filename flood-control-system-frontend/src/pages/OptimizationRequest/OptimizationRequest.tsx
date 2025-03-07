import {
  Box,
  Button,
  Container,
  FormControl,
  // SelectChangeEvent,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { HORIZONS, PILITS_LIST } from "./OptimizationRequest.const";
import { Link, useNavigate } from "react-router";
import { start } from "src/api/app/app";
import { pushNotification } from "src/stores/notification";

interface IRequestData {
  plot: string;
  horizon: string;
  block: string;
}

export const OptimizationRequest = () => {
  const [formData, setFormData] = useState<IRequestData>({
    plot: "",
    horizon: "",
    block: "",
  });

  const navigate = useNavigate();

  // const handleChange = (event: SelectChangeEvent<string>) => {
  //   const { name, value } = event.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    start({
      name: formData.plot,
      horizon: formData.horizon,
      block: formData.block,
    })
      .then(() => {
        pushNotification({
          title: "Запрос успешно отправлен!",
          variant: "success",
        });
        navigate("/services/optimization/requests");
      })
      .catch(() =>
        pushNotification({
          title: "Ошибка!",
          variant: "error",
        })
      );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Link to="/services/optimization/requests">
          <Button variant="contained">Мои запросы</Button>
        </Link>
        <Link to="/services/optimization">
          <Button variant="contained">О проекте</Button>
        </Link>
      </Box>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {/* Autocomplete для участка */}
        <FormControl fullWidth margin="normal">
          <Autocomplete
            options={PILITS_LIST}
            value={formData.plot}
            onChange={(_, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                plot: newValue || "",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Участок"
                placeholder="Выберите участок"
              />
            )}
          />
        </FormControl>

        {/* Autocomplete для горизонта */}
        <FormControl fullWidth margin="normal">
          <Autocomplete
            options={HORIZONS}
            value={formData.horizon}
            onChange={(_, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                horizon: newValue || "",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Горизонт"
                placeholder="Выберите горизонт"
              />
            )}
          />
        </FormControl>

        {/* Autocomplete для блока */}
        <FormControl fullWidth margin="normal">
          <Autocomplete
            options={Array.from({ length: 20 }, (_, i) => (i + 1).toString())}
            value={formData.block}
            onChange={(_, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                block: newValue || "",
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Блок" placeholder="Выберите блок" />
            )}
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          LinkComponent={"a"}
          sx={{ mt: 3, mb: 2 }}
        >
          Отправить
        </Button>
      </Box>
    </Container>
  );
};
