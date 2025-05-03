import { useState, useRef, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Input,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { forecast } from "src/api/app/app";
import {
  prepareFileForUpload,
  validateFileExtension,
} from "src/utils/fileToBase64";
import { pushNotification } from "src/stores/notification";

export const ForecastForOptions = () => {
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_EXTENSIONS = [".xlsx", ".xls", ".csv"];
  const MAX_FILE_SIZE_MB = 2;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    try {
      // 1. Проверка расширения файла
      if (!validateFileExtension(selectedFile.name, ALLOWED_EXTENSIONS)) {
        throw new Error(
          `Недопустимый формат файла. Разрешены: ${ALLOWED_EXTENSIONS.join(
            ", "
          )}`
        );
      }

      // 2. Проверка размера файла
      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        throw new Error(
          `Файл слишком большой. Максимум: ${MAX_FILE_SIZE_MB}MB`
        );
      }

      // 3. Успешная загрузка
      setFile(selectedFile);
      pushNotification({
        variant: "success",
        title: "Файл успешно загружен",
      });
    } catch (error) {
      pushNotification({
        variant: "error",
        title:
          error instanceof Error ? error.message : "Ошибка при загрузке файла",
      });

      // Сбрасываем значение input, чтобы можно было повторно выбрать тот же файл после ошибки
      event.target.value = "";
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      pushNotification({
        variant: "warning",
        title: "Пожалуйста, загрузите файл",
      });
      return;
    }
    try {
      const base64 = await prepareFileForUpload(file, {
        allowedExtensions: [".xlsx", ".xls", ".csv"],
        maxSizeMB: 5,
      });
      const result = await forecast({
        fileName: file.name,
        fileData: base64.data,
      });

      pushNotification({
        variant: "success",
        title: result.message,
      });
    } catch {
      pushNotification({
        variant: "error",
        title: "Ошибка отправки файла.",
      });
    }
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
    </Box>
  );
};
