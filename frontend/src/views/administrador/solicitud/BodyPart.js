import * as React from 'react';
import { Grid, Button,Box , Typography} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './styles.css';
import { useTheme } from '@mui/material/styles';
import axios from "axios";
import { HOST } from "hooks/variables";

const BodyPart = () => {
  const theme = useTheme();
  const [openAceptar, setOpenAceptar] = React.useState(false);
  const [openNegar, setOpenNegar] = React.useState(false);
  const form_data = new FormData();

  const manejar=(orden)=>{
    form_data.append("idTipo",localStorage.getItem("solicitud-id"))
    form_data.append("orden",orden)
    axios
    .request({
      method: "POST",
      url: `${HOST}api/ManejarSolicitud`,
      data:form_data,
    })
    .then((data) => {
      if (data.status === 200) {
        console.log(orden)
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
  }
  const handleClickOpenA = () => {
    setOpenAceptar(true);
  };

  const handleA = () => {
    manejar("aceptar");
    setOpenAceptar(false);
    window.location.href = '/administrador/solicitudes'
  };
  const handleClose = () => {
    setOpenAceptar(false);
  };

  const handleClickOpenN = () => {
    setOpenNegar(true);
  };

  const handleN = () => {
    manejar("negar");
    setOpenNegar(false);
    window.location.href = '/administrador/solicitudes'
  };

  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography variant="h3" gutterBottom sx={{m:2}} textAlign="right">
                {localStorage.getItem("solicitud-worker")}
              </Typography>
              <Box sx={{m: 2, fontSize:20}} textAlign="right">
                <Typography variant="body">Fecha: {localStorage.getItem("solicitud-fecha")}</Typography>
              </Box>
              <Box sx={{m: 2, fontSize:20}} textAlign="right">
                <Typography variant="body">Descripción: {localStorage.getItem("solicitud-desc")}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
                <Box alignContent="center" sx={{m:5}} >
                  <Button variant="contained" sx={{ ml:4, backgroundColor: theme.palette.success.dark}} onClick={handleClickOpenA}>
                    Aceptar
                  </Button>
                  <Dialog
                        open={openAceptar}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title" fontSize="large">
                      {"Aceptar solicitud"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description" color="text">
                        <p>¿Está seguro de que desea aceptar esta solicitud?</p>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={handleA} autoFocus>Aceptar</Button>
                    </DialogActions>
                  </Dialog>
                  <Button variant="contained" sx={{ ml:2, backgroundColor: theme.palette.error.main}} onClick={handleClickOpenN}>
                    Negar
                  </Button>
                  <Dialog
                        open={openNegar}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title" fontSize="large">
                      {"Negar solicitud"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description" color="text">
                        <p>¿Está seguro de que desea negar esta solicitud?</p>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={handleN} autoFocus>Negar</Button>
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
