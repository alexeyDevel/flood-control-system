import {
  Box,
  Button,
  FormControl,
  TextField,
  Autocomplete,
} from "@mui/material";
import { FIELD, STRATS, NGDU, AREA_LIST } from "./OptimizationRequest.const";

import { useOptimizationRequest } from "./useOptimizationRequest.hook";

export const OptimizationRequest = () => {
  const { handleSubmit, setFormData, formData } = useOptimizationRequest();

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Autocomplete
          style={{ marginBottom: "16px" }}
          options={NGDU}
          value={formData.ngdu}
          onChange={(_, newValue) => {
            setFormData((prevState) => ({
              ...prevState,
              ngdu: newValue || "",
            }));
          }}
          renderInput={(params) => (
            <TextField {...params} label="НГДУ" placeholder="Выберите НГДУ" />
          )}
        />

        <FormControl fullWidth style={{ marginTop: 0 }}>
          <Autocomplete
            options={FIELD}
            value={formData.field}
            onChange={(_, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                field: newValue || "",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Месторождение"
                placeholder="Выберите месторождение"
              />
            )}
          />
        </FormControl>
        {/* Autocomplete для участка */}
        <FormControl fullWidth margin="normal">
          <Autocomplete
            options={AREA_LIST}
            value={formData.area}
            onChange={(_, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                area: newValue || "",
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
            options={STRATS}
            value={formData.strat}
            onChange={(_, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                strat: newValue || "",
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
            value={formData.bl}
            onChange={(_, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                bl: newValue || "",
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
    </Box>
  );
};
