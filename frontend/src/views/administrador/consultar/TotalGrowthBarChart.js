import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { IconChecklist } from '@tabler/icons';
const icons = {IconChecklist};
import * as React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
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

function TotalGrowthBarChart ({ isLoading }) {
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
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700, border:3 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Código</StyledTableCell>
                    <StyledTableCell align="right">Fecha</StyledTableCell>
                    <StyledTableCell align="right">Entrada</StyledTableCell>
                    <StyledTableCell align="right">Salida</StyledTableCell>
                    <StyledTableCell align="right">Atraso</StyledTableCell>
                    <StyledTableCell align="right">Justificación</StyledTableCell>
                  </TableRow>
                  </TableHead>
                    <TableBody>{rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                      <StyledTableRow key={row.codigo}>
                        <StyledTableCell component="th" scope="row" align="center">{row.codigo}</StyledTableCell>
                        <StyledTableCell align="right">{row.fecha}</StyledTableCell>
                        <StyledTableCell align="right">{row.entrada}</StyledTableCell>
                        <StyledTableCell align="right">{row.salida}</StyledTableCell>
                        <StyledTableCell align="right">{row.atraso}</StyledTableCell>
                        <StyledTableCell align="right">{row.justificacion}</StyledTableCell>
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
      )}
    </>
  );
}

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
