import React from "react";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  Button,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Requests.module.scss";
import { TaskStatus, TaskType } from "src/api/task/task.type";
import { ICompactFiltersProps } from "./type";
import { ru } from "date-fns/locale/ru";
import { TASK_STATUS_MAP, TASK_TYPE_MAP } from "src/api/task/task.const";
registerLocale("ru", ru);

export const RequestsFilters: React.FC<ICompactFiltersProps> = ({
  filters,
  handleFilterChange,
  clearFilters,
}) => {
  const handleStringFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange("search", e.target.value);
  };

  const handleStatusChange = (e: SelectChangeEvent<TaskStatus[]>) => {
    handleFilterChange("status", e.target.value as TaskStatus[]);
  };

  const handleTaskTypeChange = (e: SelectChangeEvent<TaskType[]>) => {
    handleFilterChange("taskType", e.target.value as TaskType[]);
  };

  const handleDateFromChange = (date?: Date | null) => {
    handleFilterChange("dateFrom", date || undefined);
  };

  const handleDateToChange = (date?: Date | null) => {
    handleFilterChange("dateTo", date || undefined);
  };

  return (
    <Paper className={styles.filtersContainer} elevation={1}>
      <div className={styles.filterRow}>
        {/* Поле поиска */}
        <TextField
          size="small"
          placeholder="Поиск..."
          className={styles.filterInput}
          value={filters.search || ""}
          onChange={handleStringFilter}
        />

        {/* Фильтр по статусу */}
        <FormControl size="small" className={styles.filterSelect}>
          <InputLabel>Статус</InputLabel>
          <Select
            multiple
            value={filters.status || []}
            onChange={handleStatusChange}
            renderValue={(selected) => (
              <div className={styles.chipContainer}>
                {(selected as TaskStatus[]).map((value) => (
                  <Chip
                    key={value}
                    label={TASK_STATUS_MAP[value] || value}
                    size="small"
                  />
                ))}
              </div>
            )}
          >
            {Object.values(TaskStatus).map((status) => (
              <MenuItem key={status} value={status}>
                <Checkbox checked={(filters.status || []).includes(status)} />
                <ListItemText primary={TASK_STATUS_MAP[status] || status} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Фильтр по типу задачи */}
        <FormControl size="small" className={styles.filterSelect}>
          <InputLabel>Тип задачи</InputLabel>
          <Select
            multiple
            value={filters.taskType || []}
            onChange={handleTaskTypeChange}
            renderValue={(selected) => (
              <div className={styles.chipContainer}>
                {(selected as TaskType[]).map((value) => (
                  <Chip
                    key={value}
                    label={TASK_TYPE_MAP[value] || value}
                    size="small"
                  />
                ))}
              </div>
            )}
          >
            {Object.values(TaskType).map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={(filters.taskType || []).includes(type)} />
                <ListItemText primary={TASK_TYPE_MAP[type] || type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Кнопка сброса фильтров */}
        <Button
          size="small"
          variant="outlined"
          onClick={clearFilters}
          className={styles.clearButton}
          startIcon={<Clear fontSize="small" />}
        >
          Сбросить
        </Button>
      </div>

      <div className={styles.filterRow}>
        {/* Фильтр по дате (от) */}
        <DatePicker
          locale={"ru"}
          selected={filters.dateFrom}
          onChange={handleDateFromChange}
          selectsStart
          startDate={filters.dateFrom}
          endDate={filters.dateTo}
          placeholderText="От"
          customInput={
            <TextField size="small" className={styles.filterInput} />
          }
        />

        {/* Фильтр по дате (до) */}
        <DatePicker
          locale={"ru"}
          selected={filters.dateTo}
          onChange={handleDateToChange}
          selectsEnd
          startDate={filters.dateFrom}
          endDate={filters.dateTo}
          //   minDate={filters.dateFrom}
          placeholderText="До"
          customInput={
            <TextField size="small" className={styles.filterInput} />
          }
        />
      </div>
    </Paper>
  );
};
