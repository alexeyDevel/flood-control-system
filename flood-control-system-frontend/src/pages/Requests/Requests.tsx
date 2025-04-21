import { useEffect } from "react";
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
  Container,
} from "@mui/material";
import { CheckCircle, Error, Refresh } from "@mui/icons-material";
import { Link } from "react-router";
import { useStore } from "@nanostores/react";
import { $files } from "src/stores/files/files";
import { filesActions } from "src/stores/files/files.actions";
import { downloadFile } from "src/api";
// import styles from "./Requests.module.scss";

// interface IRequest {
//   name: string;
//   status: "success" | "error" | "pending";
//   startTime: string;
//   endTime: string;
// }

// const ITEMS_PER_PAGE = 5;

export const Requests = () => {
  const { fileList } = useStore($files);
  // const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    filesActions.fetchFileList();
  }, []);

  const handleRefresh = () => {
    filesActions.fetchFileList();
  };
  // const handlePageChange = (
  //   event: React.ChangeEvent<unknown>,
  //   page: number
  // ) => {
  //   setCurrentPage(page);
  // };

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
        <Box>
          <Link to="/services/optimization/create-request">
            <Button variant="contained" sx={{ mr: 2 }}>
              Создать новый запрос
            </Button>
          </Link>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
          >
            Обновить
          </Button>
        </Box>

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
              <TableCell align="right">Скачать</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileList.map((request, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {request.name}
                </TableCell>
                <TableCell align="right">
                  {request.name.includes("error") ? (
                    <IconButton>
                      <Error color="error" />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <CheckCircle color="success" />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  {new Date(request.requestDate).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {new Date(request.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => downloadFile(request.fullname)}>
                    Скачать
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(fileList.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box> */}
    </Container>
  );
};
