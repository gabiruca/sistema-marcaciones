import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import MainCard from 'ui-component/cards/MainCard';
import { IconChecklist } from '@tabler/icons';
import * as React from 'react';
import axios from "axios";
import { HOST } from "hooks/variables";
import { useState} from 'react';

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


function TablaMarcaciones () {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows,setRows]=useState([]);

  function createData(codigo, fecha, entrada, salida, atraso, justificacion) {
    return { codigo, fecha, entrada, salida, atraso, justificacion };
  }

  function dataRows(data){
    let rowsF=[]
    for(var i=0;i<data.length;i++){
      let registro=data[i]
      let row=createData(i+1,registro[0],registro[1],registro[2],registro[3],<IconChecklist/>)
      rowsF.push(row)
    }
    setRows(rowsF)
  }

  function getTablaData(cedula,mes,year){
    if(mes.length==1){
      mes='0'+mes
    }
    axios
    .request({
      method: "GET",
      url: `${HOST}api/cargarTabla/${cedula}/${mes}/${year}`,
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

  const handleRef=()=>{
    getTablaData(localStorage.getItem("Cedula"),localStorage.getItem("mes").toString(),localStorage.getItem("year").toString());
    console.log("AJa",rows)
  };

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
              <Button variant="contained" sx={{px:3, py:1 , my:1.5}} onClick={handleRef}>
                Ver marcaciones
              </Button>
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
                        <StyledTableCell align="center" >{row.fecha}</StyledTableCell>
                        <StyledTableCell align="center">{row.entrada}</StyledTableCell>
                        <StyledTableCell align="center">{row.salida}</StyledTableCell>
                        <StyledTableCell align="center">{row.atraso}</StyledTableCell>
                        <StyledTableCell align="center"><Button onClick={()=>(localStorage.setItem("fecha-solicitud",row.fecha),window.location.href = '/usuario/enviar-solicitud')}>{row.justificacion}</Button></StyledTableCell>
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
