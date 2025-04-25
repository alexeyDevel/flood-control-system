import React, { useState, useRef, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
  Stack,
  Input,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export const ForecastForOptions = () => {
  const [file, setFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "info" | "success" | "warning" | "error",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Проверка типа файла
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      setSnackbar({
        open: true,
        message: "Пожалуйста, загрузите файл в формате XLSX",
        severity: "error",
      });
      return;
    }

    // Проверка размера файла (2 МБ)
    if (selectedFile.size > 2 * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: "Файл слишком большой (максимум 2 МБ)",
        severity: "error",
      });
      return;
    }

    setFile(selectedFile);
    setSnackbar({
      open: true,
      message: "Файл успешно загружен",
      severity: "success",
    });
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!file) {
      setSnackbar({
        open: true,
        message: "Пожалуйста, загрузите файл",
        severity: "warning",
      });
      return;
    }

    // Здесь можно добавить логику отправки файла на сервер
    console.log("Отправка файла:", file.name);
    setSnackbar({
      open: true,
      message: "Файл отправлен на обработку",
      severity: "success",
    });
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 800,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h4" component="h1">
        Прогноз по вариантам с "ограничениями"
      </Typography>

      <Typography variant="body1">
        Отправьте свой вариант объёмов закачки. Пожалуйста, загрузите файл в
        формате XLSX (Excel) с данными. Максимальный размер файла — 2 МБ.
      </Typography>

      <Stack spacing={2} alignItems="flex-start">
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Загрузить файл
          <Input
            type="file"
            inputRef={fileInputRef}
            sx={{ display: "none" }}
            onChange={handleFileChange}
            inputProps={{
              accept: ".xlsx,.xls",
            }}
          />
        </Button>

        {file && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">{file.name}</Typography>
            <IconButton size="small" onClick={handleRemoveFile}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!file}
        >
          Отправить файл
        </Button>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
