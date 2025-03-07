import React, { useEffect, useState } from "react";
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
  Pagination,
  Button,
  Container,
} from "@mui/material";
import { CheckCircle, Error, Pending } from "@mui/icons-material";
import { Link } from "react-router";
import { useStore } from "@nanostores/react";
import { $files } from "src/stores/files/files";
import { filesActions } from "src/stores/files/files.actions";
// import styles from "./Requests.module.scss";

interface IRequest {
  name: string;
  status: "success" | "error" | "pending";
  startTime: string;
  endTime: string;
}

const requests: IRequest[] = [
  { name: "Запрос 1", status: "success", startTime: "10:00", endTime: "10:05" },
  { name: "Запрос 2", status: "error", startTime: "10:10", endTime: "10:15" },
  { name: "Запрос 3", status: "pending", startTime: "10:20", endTime: "" },
  { name: "Запрос 4", status: "success", startTime: "10:25", endTime: "10:30" },
  { name: "Запрос 5", status: "error", startTime: "10:35", endTime: "10:40" },
  { name: "Запрос 6", status: "pending", startTime: "10:45", endTime: "" },
  { name: "Запрос 7", status: "success", startTime: "10:50", endTime: "10:55" },
  { name: "Запрос 8", status: "error", startTime: "11:00", endTime: "11:05" },
  { name: "Запрос 9", status: "pending", startTime: "11:10", endTime: "" },
  {
    name: "Запрос 10",
    status: "success",
    startTime: "11:15",
    endTime: "11:20",
  },
  { name: "Запрос 11", status: "error", startTime: "11:25", endTime: "11:30" },
  { name: "Запрос 12", status: "pending", startTime: "11:35", endTime: "" },
];

const ITEMS_PER_PAGE = 5;

export const Requests = () => {
  const { fileList } = useStore($files);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    filesActions.fetchFileList();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
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
        <Link to="/services/optimization/create-request">
          <Button variant="contained">Создать новый запрос</Button>
        </Link>

        <Link to="/services/optimization">
          <Button variant="contained">О проекте</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align="right">Статус</TableCell>
              <TableCell align="right">Время начала</TableCell>
              <TableCell align="right">Время завершения</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileList.map((request, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {request}
                </TableCell>
                <TableCell align="right">
                  {requests[0].status === "success" ? (
                    <IconButton>
                      <CheckCircle color="success" />
                    </IconButton>
                  ) : requests[0].status === "error" ? (
                    <IconButton>
                      <Error color="error" />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <Pending color="warning" />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">{requests[0].startTime}</TableCell>
                <TableCell align="right">{requests[0].endTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(fileList.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};
