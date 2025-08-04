import {
  Box,
  Button,
  FormControl,
  TextField,
  Autocomplete,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FIELD, STRATS, NGDU, AREA_LIST } from "./OptimizationRequest.const";

import { useOptimizationRequest } from "./useOptimizationRequest.hook";
import { CalculationTypeEnum } from "src/api/app/app";

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
            options={[
              ...Array.from({ length: 20 }, (_, i) => (i + 1).toString()),
              ".",
            ]}
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
        {/*выбор типа расчётов */}
        <FormControl component="fieldset" fullWidth margin="normal" required>
          <FormLabel component="legend">Тип расчётов</FormLabel>
          <RadioGroup
            row
            value={formData.calculationType}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                calculationType: Number(e.target.value),
              }));
            }}
          >
            <FormControlLabel
              value={CalculationTypeEnum.LIQUID_PRODUCTION}
              control={<Radio />}
              label="Расчёты по добываемой жидкости"
            />
            <FormControlLabel
              value={CalculationTypeEnum.BOTTOMHOLE_PRESSURE}
              control={<Radio />}
              label="Расчёты по забойному давлению"
            />
          </RadioGroup>
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
