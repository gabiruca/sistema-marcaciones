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
import { IconChecklist } from '@tabler/icons';
const icons = {IconChecklist};
import * as React from 'react';

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

function createData(codigo, fecha, entrada, salida, atraso, justificacion) {
  return { codigo, fecha, entrada, salida, atraso, justificacion };
}

const rows = [
  createData(1, '08-10-2023', '09:00:00', '17:00:00', '01:00:00',<icons.IconChecklist />),
  createData(2, '09-10-2023', '08:00:00', '17:00:00', '00:00:00',<icons.IconChecklist />),
  createData(3, '10-10-2023', '08:00:00', '17:00:00', '00:00:00',<icons.IconChecklist />),
  createData(4, '11-10-2023', '08:20:00', '17:00:00', '00:20:00',<icons.IconChecklist />),
  createData(5, '08-10-2023', '09:00:00', '17:00:00', '01:00:00',<icons.IconChecklist />),
  createData(6, '09-10-2023', '08:00:00', '17:00:00', '00:00:00',<icons.IconChecklist />),
  createData(7, '10-10-2023', '08:00:00', '17:00:00', '00:00:00',<icons.IconChecklist />),
  createData(8, '11-10-2023', '08:20:00', '17:00:00', '00:20:00',<icons.IconChecklist />),
  createData(9, '08-10-2023', '09:00:00', '17:00:00', '01:00:00',<icons.IconChecklist />),
  createData(10, '09-10-2023', '08:00:00', '17:00:00', '00:00:00',<icons.IconChecklist />),
  createData(11, '10-10-2023', '08:00:00', '17:00:00', '00:00:00',<icons.IconChecklist />),
  createData(12, '11-10-2023', '08:20:00', '17:00:00', '00:20:00',<icons.IconChecklist />),
  createData(13, '09-10-2023', '08:00:00', '17:00:00', '00:00:00',<icons.IconChecklist />),
  createData(14, '10-10-2023', '08:00:00', '17:00:00', '00:00:00',<icons.IconChecklist />),
  createData(15, '11-10-2023', '08:20:00', '17:00:00', '00:20:00',<icons.IconChecklist />),
  createData(16, '08-10-2023', '09:00:00', '17:00:00', '01:00:00',<icons.IconChecklist />),
  createData(17, '09-10-2023', '08:00:00', '17:00:00', '00:00:00',<icons.IconChecklist />),
  createData(18, '10-10-2023', '08:00:00', '17:00:00', '00:00:00',<icons.IconChecklist />),
  createData(19, '11-10-2023', '08:20:00', '17:00:00', '00:20:00',<icons.IconChecklist />),
];

function TablaMarcaciones () {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                    <StyledTableCell align="center">Justificación</StyledTableCell>
                  </TableRow>
                  </TableHead>
                    <TableBody>{rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                      <StyledTableRow key={row.codigo}>
                        <StyledTableCell component="th" scope="row" align="center">{row.codigo}</StyledTableCell>
                        <StyledTableCell align="center">{row.fecha}</StyledTableCell>
                        <StyledTableCell align="center">{row.entrada}</StyledTableCell>
                        <StyledTableCell align="center">{row.salida}</StyledTableCell>
                        <StyledTableCell align="center">{row.atraso}</StyledTableCell>
                        <StyledTableCell align="center">{row.justificacion}</StyledTableCell>
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
