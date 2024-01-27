import { Grid,Typography, Divider, TextField, MenuItem, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import * as React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./style-upload.css";
import { IconFileUpload } from '@tabler/icons';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import 'dayjs/locale/es';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { HOST } from "hooks/variables";
import Alert from '@mui/material/Alert';

const BodyPart = () => {
  const [open, setOpen] = React.useState(false);
  const [openArch, setOpenArch] = React.useState(false);
  const [archivo, setArchivo] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [fecha,setFecha]=useState([]);
  const [horaE,setHoraE]=useState([]);
  const [horaS,setHoraS]=useState([]);
  const [cedula,setCedula]=useState([]);
  const [alertS, setAlertS]= useState(false);
  const [alertE, setAlertE]= useState(false);
  const [alertContent, setAlertContent]= useState("");
  const form_data=new FormData();

  const handleClick =()=>{
    setOpen(true);
  };
  const handleClose =()=>{
    setOpen(false);
  };

  const handleClickArch =()=>{
    setOpenArch(true);
  };
  const handleCloseArch =()=>{
    setOpenArch(false);
  };

  function cargarDatos(){
    axios
    .request({
      method: "GET",
      url: `${HOST}api/cargarWorkers`,
    })
    .then((data) => {
      if (data.status === 200) {
        setWorkers(data.data.workers)
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
  }

  function marcarInd(){
    form_data.append("fecha",fecha)
    form_data.append("cedula",cedula)
    form_data.append("horaE",horaE)
    form_data.append("horaS",horaS)
    axios
    .request({
      method: "POST",
      url: `${HOST}api/marcarIndividual`,
      data:form_data,
    })
    .then((data) => {
      if (data.status === 200) {
        setAlertS(true)
        setAlertContent("Marcación individual agregada")
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
      setAlertE(true)
      setAlertContent("No se pudo agregar la marcacion individual")
    });
    setOpen(false)
  }

  function marcarGrupal(){
    form_data.append('archivo', archivo);
    axios
    .request({
      method: "POST",
      url: `${HOST}api/marcacionGrupal`,
      data:form_data,
    })
    .then((data) => {
      if (data.status === 200) {
        setAlertS(true)
        setAlertContent("Marcación grupal agregada")
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
      setAlertE(true)
      setAlertContent("No se pudo agregar la marcacion grupal")
    });
    setOpen(false)
  }

  useEffect(() => {
    cargarDatos()
  }, []);

  const timeout = setTimeout(() => {
    setAlertS(false);
    setAlertE(false);
  }, 10000);

  useEffect(() => {
    if(alertS){
      timeout
    }
  }, [alertS]);

  useEffect(() => {
    if(alertE){
      timeout
    }
  }, [alertE]);

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
  }

  const handleF=(newDate)=>{
    const dateS=newDate.$d
    console.log("ESTA FECHA",dateS.getFullYear()+'-'+(dateS.getMonth()+1)+'-'+newDate.$D)
    setFecha(dateS.getFullYear()+'-'+(dateS.getMonth()+1)+'-'+newDate.$D)
  }

  const handleChange=(event)=>{
    setCedula(event.target.value)
  }

  return (
    <>
        {alertS ? <Alert severity='success' variant='filled' sx={{mb:3}}>{alertContent}</Alert> : <></> }
        {alertE ? <Alert severity='error' variant='filled' sx={{mb:3}}>{alertContent}</Alert> : <></> }
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Divider>
                <h3>Archivo de marcaciones</h3>
              </Divider>
              <Grid container alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Seleccione el archivo correspondiente a las marcaciones:</Typography>
                <div className="app">
                  <div className="parent">
                    <div className="file-upload">
                      <IconFileUpload />
                      <h3>Seleccionar archivo</h3>
                      <input type="file" accept=".xlsx" onChange={event => setArchivo(event.target.files[0])}/>
                    </div>
                  </div>
                </div>
                <div>
                  <Button sx={{mx:62, my:1}} component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleClickArch}>
                    Subir archivo
                  </Button>
                  <Dialog
                    open={openArch}
                    onClose={handleCloseArch}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title" fontSize="large">
                      {"Subir archivo de marcaciones"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description" color="text">
                        ¿Está seguro de que desea subir el archivo de marcaciones?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseArch}>Cancelar</Button>
                      <Button onClick={marcarGrupal} autoFocus>Subir</Button>
                    </DialogActions>
                </Dialog>
                </div>
              </Grid>
              <Divider>
                <h3>Marcación individual</h3>
              </Divider>
            </Grid>
              <Grid item sx={9}>
                <Box sx={{px:10}}>
                  <Box sx={{pb:2}}>Seleccione un empleado:</Box>
                  <TextField
                    id="outlined-select-worker"
                    select
                    sx={{width: '50ch'}}
                    onChange={handleChange}
                  >
                    {workers.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{px:10}}>
                  <Box sx={{pt:4, pb:2}}>Seleccione la fecha:</Box>
                  <Box justifyContent="space-between" alignContent="center">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <DatePicker views={['day','month', 'year']}  onChange={(newValue)=>handleF(newValue)}/>
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box sx={{px:10}}>
                  <Box sx={{pt:4, pb:2}}>Seleccione la hora de entrada:</Box>
                  <Box justifyContent="space-between" alignContent="center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker  onChange={(newValue)=>handleE(newValue)}/>
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box sx={{px:10}}>
                  <Box sx={{pt:4, pb:2}}>Seleccione la hora de salida:</Box>
                  <Box justifyContent="space-between" alignContent="center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker  onChange={(newValue)=>handleS(newValue)}/>
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={3} justifyContent="center" alignContent="center">
                <Button sx={{mx:10, mt:30}} component="label" variant="contained" onClick={handleClick}>
                  Guardar
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title" fontSize="large">
                      {"Agregar marcación"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description" color="text">
                        ¿Está seguro de que desea agregar esta marcación?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={marcarInd} autoFocus>Agregar</Button>
                    </DialogActions>
                </Dialog>
              </Grid>
          </Grid>
        </MainCard>
    </>
  );
};
export default BodyPart;
