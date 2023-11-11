import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid,Typography, Box, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BodySpace = () => {
  const theme = useTheme();
  const [openAceptar, setOpenAceptar] = React.useState(false);
  const [openNegar, setOpenNegar] = React.useState(false);
  const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };
  
  const handleClickOpenA = () => {
    setOpenAceptar(true);
  };

  const handleCloseA = () => {
    setOpenAceptar(false);
  };

  const handleClickOpenN = () => {
    setOpenNegar(true);
  };

  const handleCloseN = () => {
    setOpenNegar(false);
  };
  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                Solicitudes de justificaciones
              </Typography>
              <Divider />
              <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem  divider>
                  <ListItemText>
                    <Box sx={{m:3, p:0}}>
                      <Typography variant="h3" gutterBottom >
                        John Doe
                      </Typography>
                      <Box sx={{p: 1}}>
                        <Box sx={{mt: 3, fontSize:20}}>
                          <Typography variant="body">Fecha: 2023-02-20</Typography>
                        </Box>
                        <Button variant="contained" sx={{px:3, py:1 , mx:43, mt:-5, backgroundColor: theme.palette.success.dark}} onClick={handleClickOpenA}>
                          Aceptar
                        </Button>
                        <Dialog
                          open={openAceptar}
                          onClose={handleCloseA}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title" fontSize="large">
                            {"Aceptar solicitud"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description" color="text">
                              <p>¿Está seguro de que desea aceptar esta solicitud?</p>
                              <p>Trabajador: John Doe</p>
                              <p>Fecha: 2023-02-13</p>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseA}>Cancelar</Button>
                            <Button onClick={handleCloseA} autoFocus>Aceptar</Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                      <Box sx={{p: 1}}>
                        <Box sx={{mt: 3, fontSize:20}}>
                          <Typography variant="body">Descripción: Atraso - Cita médica</Typography>
                        </Box>
                        <Button variant="contained" sx={{px:3, py:1 , mx:43.5, mt:-5, backgroundColor: theme.palette.error.main}} onClick={handleClickOpenN}>
                          Negar
                        </Button>
                        <Dialog
                          open={openNegar}
                          onClose={handleCloseN}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title" fontSize="large">
                            {"Negar solicitud"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description" color="text">
                              <p>¿Está seguro de que desea negar esta solicitud?</p>
                              <p>Trabajador: John Doe</p>
                              <p>Fecha: 2023-02-13</p>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseN}>Cancelar</Button>
                            <Button onClick={handleCloseN} autoFocus>Negar</Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                    </Box>
                      <Box sx={{mt: 3,mx:4, fontSize:20}}>
                        <Typography variant="body">Estado: Pendiente</Typography>
                      </Box>
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </MainCard>
    </>
  );
};
export default BodySpace;
