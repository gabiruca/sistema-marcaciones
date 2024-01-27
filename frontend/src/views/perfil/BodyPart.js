import { useState, useEffect } from 'react';
import { Grid,Typography, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { HOST } from "hooks/variables";
import Alert from '@mui/material/Alert';

import './styles.css';

const BodyPart = () => {
  const [open, setOpen] = useState(false);
  const [datos, setDatos] = useState('');
  const [pass, setPass] = useState ('');
  const [newpass, setNewpass] = useState ('');
  const [ruta,setRuta]=useState('');
  const form_data = new FormData();
  const [alertS, setAlertS]= useState(false);
  const [alertE, setAlertE]= useState(false);
  const [alertContent, setAlertContent]= useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseYes = () => {
    form_data.append('old',pass);
    form_data.append('new',newpass);
    changePass(localStorage.getItem("Cedula"));
    setOpen(false);
  };

  function getInfoWorker(cedula){
    axios
    .request({
      method: "GET",
      url: `${HOST}api/informacionUsuario/${cedula}`,
    })
    .then((data) => {
      if (data.status === 200) {
        setDatos(data.data);
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
  }
  
  function changePass(cedula){
    axios
    .request({
      method: "POST",
      url: `${HOST}api/newPassword/${cedula}`,
      data: form_data,
    })
    .then((data) => {
      if (data.status === 200) {
        setAlertS(true)
        setAlertContent("Contraseña actualizada")
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
      setAlertE(true)
      setAlertContent("No se pudo actualizar la contraseña")
    });
  }

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

  function rutaImg(cedula){
    axios
    .request({
      method: "GET",
      url: `${HOST}api/cargarImg/${cedula}`,
    })
    .then((data) => {
      if (data.status === 200) {
        setRuta(data.data.imagen);
        console.log(data.data.imagen, "route")
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
  }

  useEffect(() => {
    getInfoWorker(localStorage.getItem("Cedula"));
    rutaImg(localStorage.getItem("Cedula"));
  }, []);
  useEffect(() => {
    getInfoWorker(localStorage.getItem("Cedula"));
  }, [open]);

  return (
    <>
        {alertS ? <Alert severity='success' variant='filled' sx={{mb:3}}>{alertContent}</Alert> : <></> }
        {alertE ? <Alert severity='error' variant='filled' sx={{mb:3}}>{alertContent}</Alert> : <></> }
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <div id="profile-head">
                {ruta && <img src={`data:image/jpeg;base64,${ruta}`} alt="Imagen" style={{ maxWidth: '20%', height: 'auto' }}/>}
                <Typography variant="h2" id="name">{datos.Nombres + " "}{datos.Apellidos}</Typography>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='div-class'>
                <Typography variant='h4'>Cédula</Typography>
                <p className='tags-names'>{datos.Cedula}</p>
              </div>
              <div className='div-class'>
                <Typography variant='h4'>Correo</Typography>
                <p className='tags-names'>{datos.Correo}</p>
              </div>
              <div className='div-class'>
                <Typography variant='h4'>Fecha de nacimiento</Typography>
                <p className='tags-names'>{datos.Nacimiento}</p>
              </div>
              <div className='div-class'>
                <Typography variant='h4'>Fecha de contrato</Typography>
                <p className='tags-names'>{datos.Contrato}</p>
              </div>
              <div className='div-class'>
                <Typography variant='h4'>Género</Typography>
                <p className='tags-names'>{datos.Genero}</p>
              </div>
            </Grid>
            <Grid item alignContent="center" justifyContent="space-between" xs={6}>
              <div className='div-class'>
                <Typography variant='h4'>Contraseña actual</Typography>
                <input type="password" value={pass} onChange={event => {setPass(event.target.value);}}/>
                
              </div>
              <div className='div-class'>
                <Typography variant='h4'>Contraseña nueva</Typography>
                <input type="password" value={newpass} onChange={event => {setNewpass(event.target.value);}}/>
                
              </div>
              <div className='div-class'>
                <Button variant='contained' alignContent="center" sx={{mx: 13}} onClick={handleClickOpen}>Actualizar</Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" fontSize="large">
                    {"Actualizar contraseña"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description" color="text">
                      ¿Está seguro de que desea actualizar su contraseña?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleCloseYes} autoFocus>
                      Actualizar
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Grid>
          </Grid>
        </MainCard>
    </>
  );
};

export default BodyPart;
