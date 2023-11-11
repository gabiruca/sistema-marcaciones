import { useState, useEffect } from 'react';
import { Grid,Typography, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ProfilePic from 'assets/images/picture-placeholder.jpg';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { HOST } from "hooks/variables";

import './styles.css';

const BodyPart = () => {
  const [open, setOpen] = useState(false);
  const [datos, setDatos] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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

  useEffect(() => {
    getInfoWorker(localStorage.getItem("Cedula"));
  }, []);

  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <div id="profile-head">
                <img id="profile" src={ProfilePic} alt="profile" />
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
                <input type="password" defaultValue="passwordOld"/>
                
              </div>
              <div className='div-class'>
                <Typography variant='h4'>Contraseña nueva</Typography>
                <input type="password" defaultValue="passwordNueva"/>
                
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
                    <Button onClick={handleClose} autoFocus>
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
