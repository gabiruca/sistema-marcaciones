import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import MainCard from 'ui-component/cards/MainCard';
import { IconDeviceFloppy } from '@tabler/icons';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import axios from "axios";
import { HOST } from "hooks/variables";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    width: 6,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width: 6,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }
}));

const rows = []

function createData(codigo, fecha, entrada, salida, atraso, justificacion) {
  return { codigo, fecha, entrada, salida, atraso, justificacion };
}
  
  function dataRows(data){
    for(var i=0;i<data.length;i++){
      let registro=data[i]
      let row=createData(i+1,registro[0],registro[1],registro[2],registro[3],<IconDeviceFloppy/>)
      rows.push(row)
    }
  }

  function getTablaData(cedula,mes,year){
    axios
    .request({
      method: "GET",
      url: `${HOST}api/cargarTablaAdmin/${cedula}/${mes}/${year}`,
    })
    .then((data) => {
      if (data.status === 200) {
        dataRows(data.data.Marcas)
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
  }

function TablaMarcaciones () {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen]= useState(false);

  useEffect(() => {
    getTablaData(localStorage.getItem("CedulaWorker"),"09","2023");
    console.log("AJa",rows)
  }, [localStorage.getItem("CedulaWorker")]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick=()=>{
    setOpen(true);
  };
  const handleClose=()=>{
    setOpen(false);
  };
  return (
    <>
        <MainCard>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700, border: 2 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Código</StyledTableCell>
                    <StyledTableCell align="center">Fecha</StyledTableCell>
                    <StyledTableCell align="center">Entrada</StyledTableCell>
                    <StyledTableCell align="center">Salida</StyledTableCell>
                    <StyledTableCell align="center">Atraso</StyledTableCell>
                    <StyledTableCell align="center">Guardar</StyledTableCell>
                  </TableRow>
                  </TableHead>
                    <TableBody>{rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                      <StyledTableRow key={row.codigo}>
                        <StyledTableCell component="th" scope="row" align="center">{row.codigo}</StyledTableCell>
                        <StyledTableCell align="center">{row.fecha}</StyledTableCell>
                        <StyledTableCell align="center">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker defaultValue={dayjs(`${row.fecha}`+"T"+`${row.entrada}`)}/>
                          </LocalizationProvider>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker defaultValue={dayjs(`${row.fecha}`+"T"+`${row.salida}`)}/>
                          </LocalizationProvider>  
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.atraso}</StyledTableCell>
                        <StyledTableCell align="center">
                          <Button onClick={handleClick}>
                            <IconDeviceFloppy/>
                          </Button>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title" fontSize="large">
                              {"Modificar horario"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description" color="text">
                                ¿Está seguro de que desea modificar este horario?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Cancelar</Button>
                              <Button onClick={handleClose} autoFocus>Modificar</Button>
                            </DialogActions>
                        </Dialog>
                        </StyledTableCell>
                      </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination 
                    color="primary"
                    rowsPerPageOptions={[5, 15, rows.length]}
                    component="div"
                    count={rows.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
            </TableContainer>
        </MainCard>
    </>
  );
}

export default TablaMarcaciones;
