import { useState} from 'react';
import { useTheme, styled } from '@mui/material/styles';
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

function TablaMarcaciones () {
  const [rows,setRows]=useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen]= useState(false);
  const [openG, setOpenG]= useState(false);
  const [horaE, setHoraE] = useState(0);
  const [horaS, setHoraS] = useState(0);
  const [fecha, setFecha] = useState('');
  const [published, setPublished]= useState(false);
  const theme = useTheme();
  const form_data = new FormData();
  const form_data1 = new FormData();

  function createData(codigo, fecha, entrada, salida, atraso, justificacion) {
    return { codigo, fecha, entrada, salida, atraso, justificacion };
  }
    
  function dataRows(data){
    let rowsF=[]
    for(var i=0;i<data.length;i++){
      let registro=data[i]
      let row=createData(i+1,registro[0],registro[1],registro[2],registro[3],<IconDeviceFloppy/>)
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

  function publicarMarcacion(cedula,mes,year){
    if(mes.length==1){
      mes='0'+mes
    }
    form_data1.append("cedula",cedula)
    form_data1.append("mes",mes)
    form_data1.append("year",year)
    axios
    .request({
      method: "POST",
      url: `${HOST}api/publicar`,
      data: form_data1,
    })
    .then((data) => {
      if (data.status === 200) {
        console.log("publicado!")
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
  }

 const handleRef=()=>{
    getTablaData(localStorage.getItem("CedulaWorker"),localStorage.getItem("mes").toString(),localStorage.getItem("year").toString());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickG=()=>{
    setOpenG(true);
  };
  const handleCloseG=()=>{
    setOpenG(false);
  };

  const handleClick=()=>{
    setOpen(true);
  };
  const handleClose=()=>{
    setOpen(false);
  };

  const handlePublish=()=>{
    publicarMarcacion(localStorage.getItem("CedulaWorker"),localStorage.getItem("mes").toString(),localStorage.getItem("year").toString());
    setOpen(false);
  }
  const handleCambio=()=>{
    form_data.append("fecha",fecha)
    form_data.append("horaE",horaE)
    form_data.append("horaS",horaS)
    let cedula=localStorage.getItem("CedulaWorker")
    axios
    .request({
      method: "POST",
      url: `${HOST}api/cambiosHorarios/${cedula}`,
      data:form_data,
    })
    .then((data) => {
      if (data.status === 200) {
        setPublished(data.data.isPublished)
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
    setOpenG(false)
  }

  const handleS=(newDate)=>{
    console.log(newDate)
    const dateS=newDate.$d
    let horas=dateS.getHours().toString()
    let mins=dateS.getMinutes().toString()
    let secs=dateS.getSeconds().toString()
    if(horas.length==1){
      horas='0'+horas
    }
    if(mins.length==1){
      mins='0'+mins
    }
    if(secs.length==1){
      secs='0'+secs
    }
    setHoraS(horas+':'+mins+':'+secs)
    setFecha(dateS.getFullYear()+'-'+(dateS.getMonth()+1)+'-'+newDate.$D)
  }
  const handleE=(newDate)=>{
    const dateS=newDate.$d
    let horas=dateS.getHours().toString()
    let mins=dateS.getMinutes().toString()
    let secs=dateS.getSeconds().toString()
    if(horas.length==1){
      horas='0'+horas
    }
    if(mins.length==1){
      mins='0'+mins
    }
    if(secs.length==1){
      secs='0'+secs
    }
    setHoraE(horas+':'+mins+':'+secs)
    setFecha(dateS.getFullYear()+'-'+(dateS.getMonth()+1)+'-'+newDate.$D)
  }
  return (
    <>
        <MainCard>
          <Button variant="contained" sx={{px:3, py:1 , my:1.5}} onClick={handleRef}>
            Ver marcaciones
          </Button>
          <Button variant="contained" sx={{px:3, py:1 , mx:1, my:0.5, backgroundColor: theme.palette.success.dark}} onClick={handleClick} disabled={published}>
            Publicar
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" fontSize="large">
              {"Publicar marcaciones"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" color="text">
                ¿Está seguro de que desea publicar las marcaciones?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handlePublish} autoFocus>Publicar</Button>
            </DialogActions>
          </Dialog>
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
                            <TimePicker value={dayjs(`${row.fecha}`+"T"+`${row.entrada}`)} onChange={(newValue)=>handleE(newValue)}/>
                          </LocalizationProvider>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker value={dayjs(`${row.fecha}`+"T"+`${row.salida}`)} onChange={(newValue)=>handleS(newValue)}/>
                          </LocalizationProvider>  
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.atraso}</StyledTableCell>
                        <StyledTableCell align="center">
                          <Button onClick={handleClickG}>{row.justificacion}</Button>
                          <Dialog
                            open={openG}
                            onClose={handleCloseG}
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
                              <Button onClick={handleCloseG}>Cancelar</Button>
                              <Button onClick={handleCambio} autoFocus>Modificar</Button>
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
