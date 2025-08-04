import {
  Box,
  Button,
  FormControl,
  TextField,
  Autocomplete,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  NGDU,
  FIELD,
  AREA_LIST,
  STRATS,
} from "../OptimizationRequest/OptimizationRequest.const";
import { sendRequest } from "src/stores/floodControlSystem";
import { useState } from "react";
import { CalculationTypeEnum, TNfluence } from "src/api/app/app";
import { useNavigate } from "react-router";

export const InfluenceOfWells = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TNfluence>({
    ngdu: "",
    field: "",
    area: "",
    bl: "",
    strat: "",
    calculationType: 1,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendRequest({ ...formData }).then(() =>
      navigate("/services/optimization/requests")
    );
  };

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
