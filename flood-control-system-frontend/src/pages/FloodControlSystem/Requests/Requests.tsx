import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Pagination,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  AccessTime as PendingIcon,
  Cached as ProcessingIcon,
  CheckCircle as CompletedIcon,
  Error as FailedIcon,
  Refresh,
  FilterAlt,
  Clear,
} from "@mui/icons-material";
import { useStore } from "@nanostores/react";
import { downloadFile } from "src/api";
import { $tasks, tasksActions } from "src/stores/tasks";
import { TaskStatus } from "src/api/task/task.type";
import styles from "./Requests.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { RequestsFilters } from "./RequestsFilters";
import { IFilters } from "./type";

const PAGE_SIZE = 10;

export const Requests = () => {
  const { taskList, totalCount } = useStore($tasks);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<IFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const loadData = useCallback(() => {
    const params = {
      skip: (page - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
      ...filters,
    };
    tasksActions.loadTasks(params);
  }, [filters, page]);

  useEffect(() => {
    loadData();
  }, [page, filters, loadData]);

  const handleRefresh = () => {
    loadData();
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleFilterChange = <K extends keyof IFilters>(
    name: K,
    value: IFilters[K] // Теперь совместим с FilterValue<K>
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const handleDownload = (url: string) => {
    downloadFile(url);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <h2 className={styles.title}>Запросы</h2>

        <Box className={styles.actions}>
          <Button
            variant="outlined"
            startIcon={showFilters ? <Clear /> : <FilterAlt />}
            onClick={() => setShowFilters(!showFilters)}
            className={styles.button}
          >
            {showFilters ? "Скрыть фильтры" : "Фильтры"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            className={styles.button}
          >
            Обновить
          </Button>
        </Box>
      </Box>

      {showFilters && (
        <RequestsFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          clearFilters={clearFilters}
        />
      )}

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell className={styles.headerCell}>Название</TableCell>
              <TableCell align="right" className={styles.headerCell}>
                Статус
              </TableCell>
              <TableCell align="right" className={styles.headerCell}>
                Время начала
              </TableCell>
              <TableCell align="right" className={styles.headerCell}>
                Время последнего обновления
              </TableCell>
              <TableCell align="right" className={styles.headerCell}>
                Скачать
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.map((task, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.fileNameCell}
                  sx={{ overflow: "hidden" }}
                >
                  <Tooltip title={task?.resultFileUrl?.split("/").pop() || ""}>
                    {task.resultFileUrl ? (
                      <span className={`${styles.fileName} ${styles.ellipsis}`}>
                        {task.resultFileUrl.split("/").pop()}
                      </span>
                    ) : (
                      <span className={styles.emptyValue}>-</span>
                    )}
                  </Tooltip>
                </TableCell>
                <TableCell align="right" className={styles.statusCell}>
                  <div className={styles.statusWrapper}>
                    {task.status === TaskStatus.PENDING && (
                      <IconButton className={styles.iconButton} size="small">
                        <PendingIcon
                          color="info"
                          className={styles.statusIcon}
                        />
                      </IconButton>
                    )}
                    {task.status === TaskStatus.PROCESSING && (
                      <IconButton
                        className={`${styles.iconButton} ${styles.spinning}`}
                        size="small"
                      >
                        <ProcessingIcon
                          color="primary"
                          className={styles.statusIcon}
                        />
                      </IconButton>
                    )}
                    {task.status === TaskStatus.COMPLETED && (
                      <IconButton className={styles.iconButton} size="small">
                        <CompletedIcon
                          color="success"
                          className={styles.statusIcon}
                        />
                      </IconButton>
                    )}
                    {task.status === TaskStatus.FAILED && (
                      <IconButton className={styles.iconButton} size="small">
                        <FailedIcon
                          color="error"
                          className={styles.statusIcon}
                        />
                      </IconButton>
                    )}
                  </div>
                </TableCell>
                <TableCell align="right" className={styles.dateCell}>
                  {new Date(task.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="right" className={styles.dateCell}>
                  {new Date(task.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell align="right" className={styles.downloadCell}>
                  {task.resultFileUrl ? (
                    <Button
                      variant="outlined"
                      size="small"
                      className={styles.downloadButton}
                      onClick={() =>
                        task.resultFileUrl && handleDownload(task.resultFileUrl)
                      }
                    >
                      Скачать
                    </Button>
                  ) : (
                    <Chip
                      label="Нет файла"
                      size="small"
                      variant="outlined"
                      className={styles.noFileChip}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className={styles.pagination}>
        <Pagination
          count={Math.ceil(totalCount / PAGE_SIZE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};
