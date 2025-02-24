import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00b274", // Основной цвет (зеленый)
      contrastText: "#ffffff", // Контрастный текст для основного цвета
    },
    secondary: {
      main: "#ef3e42", // Вторичный цвет (красный)
      contrastText: "#ffffff", // Контрастный текст для вторичного цвета
    },
    error: {
      main: "#d32f2f", // Цвет для ошибок
    },
    warning: {
      main: "#ffa726", // Цвет для предупреждений
    },
    info: {
      main: "#1976d2", // Цвет для информации
    },
    success: {
      main: "#00b274", // Цвет для успешных действий (используем зеленый)
    },
    background: {
      default: "#f5f5f5", // Основной фон сайта (светло-серый)
      paper: "#ffffff", // Фон для блоков (белый)
      //   lightGreen: "#e0f2f1", // Светло-зеленый для акцентов
      //   lightRed: "#fff5f5", // Светло-красный для акцентов
      //   dark: "#333333", // Темный фон для футера
    },
    text: {
      primary: "#212121", // Основной цвет текста
      secondary: "#757575", // Вторичный цвет текста
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Шрифт по умолчанию
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  spacing: 8, // Базовый отступ
  shape: {
    borderRadius: 4, // Скругление углов
  },
  components: {
    // Настройка компонентов
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Убираем автоматическое преобразование текста в верхний регистр
        },
        containedPrimary: {
          backgroundColor: "#00b274", // Основной цвет для кнопок
          "&:hover": {
            backgroundColor: "#009966", // Темно-зеленый при наведении
          },
        },
        containedSecondary: {
          backgroundColor: "#ef3e42", // Вторичный цвет для кнопок
          "&:hover": {
            backgroundColor: "#cc3333", // Темно-красный при наведении
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#00b274", // Основной цвет для AppBar
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // Фон для Paper
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#00b274", // Цвет рамки для TextField
            },
            "&:hover fieldset": {
              borderColor: "#009966", // Цвет рамки при наведении
            },
            "&.Mui-focused fieldset": {
              borderColor: "#00b274", // Цвет рамки при фокусе
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#00b274", // Цвет для Checkbox
          "&.Mui-checked": {
            color: "#00b274", // Цвет для Checkbox в активном состоянии
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-thumb": {
            backgroundColor: "#00b274", // Цвет для переключателя
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#00b274", // Цвет для трека переключателя
          },
        },
      },
    },
  },
});

export default theme;
