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

  // const handleChange = (event: SelectChangeEvent<string>) => {
  //   const { name, value } = event.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
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
          sx={{ mt: 3, mb: 2 }}
        >
          Отправить
        </Button>
      </Box>
    </Container>
  );
};
