import * as React from 'react';
import { Grid, Button, Select, MenuItem, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './styles.css';
import { IconSend } from '@tabler/icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import axios from "axios";
import { HOST } from "hooks/variables";
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

const BodyPart = () => {
  const [open, setOpen] = useState(false);
  const [motivo,setMotivo]=useState('');
  const form_data= new FormData();
  const [alertE, setAlertE]= useState(false);
  const [alertContent, setAlertContent]= useState("");

  //let newDate = new Date();
  let fech=localStorage.getItem("fecha-solicitud")

  const motivos = [
    {
      value:'Cita médica',
      label:'Cita médica',
    },
    {
      value:'Asunto familiar',
      label:'Asunto familiar',
    }
  ]

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const goBack =() =>{
    history.back()
  }

  const handleChange=(event)=>{
    setMotivo(event.target.value)
  }

  const timeout = setTimeout(() => {
    setAlertE(false);
  }, 10000);

  useEffect(() => {
    if(alertE){
      timeout
    }
  }, [alertE]);

  function enviar(){
    form_data.append("motivo",motivo)
    form_data.append("fecha",fech)
    form_data.append("cedula",localStorage.getItem("Cedula"))
    console.log(motivo,fech,localStorage.getItem("Cedula"))
    axios
    .request({
      method: "POST",
      url: `${HOST}api/enviarSolicitud`,
      data: form_data,
    })
    .then((data) => {
      if (data.status === 200) {
        console.log(data.data.msg)
        window.location.href = '/usuario/consultar-user'
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
      setAlertE(true)
      setAlertContent("No se pudo enviar la solicitud")
    });
  }
  return (
    <>
        {alertE ? <Alert severity='error' variant='filled' sx={{mb:3}}>{alertContent}</Alert> : <></> }
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Box alignContent="center" justifyContent="space-between" sx={{m:5}}>
                  <span className='tags-names'>Fecha</span>
                  <Box sx={{mx:12, mt: -4, width:'25ch'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <DatePicker views={['day','month', 'year']} defaultValue={dayjs(fech)}  />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box alignContent="center" justifyContent="space-between" sx={{m:5}}>
                  <span className='tags-names'>Motivo</span>
                  <Select
                    id="outlined-select-motivo"
                    sx={{width: '80ch', mx:6, mt:-2}}
                    value={motivo}
                    onChange={handleChange}
                  >
                    {motivos.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box alignContent="center" sx={{m:5}} >
                  <Button sx={{ml:25}} variant='contained' onClick={handleClickOpen}><IconSend />  Enviar solicitud</Button>
                  <Button sx={{ml:10}} variant='contained' onClick={goBack}>Cancelar</Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title" fontSize="large">
                      {"Enviar solicitud"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description" color="text">
                        ¿Está seguro de que desea enviar esta solicitud?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={()=>(enviar(),setOpen(false))} autoFocus>Enviar</Button>
                    </DialogActions>
                  </Dialog>
                </Box>
            </Grid>
          </Grid>
        </MainCard>
    </>
  );
};

export default BodyPart;
