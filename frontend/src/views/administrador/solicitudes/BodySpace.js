import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid,Typography, Box, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import axios from "axios";
import { HOST } from "hooks/variables";
import { useState, useEffect } from 'react';

const BodySpace = () => {
  const theme = useTheme();
  const [solis, setSolis] = useState([]);
  const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };
  
  function cargarSolis(){
    axios
    .request({
      method: "GET",
      url: `${HOST}api/cargarSolicitudesAdmin`,
    })
    .then((data) => {
      if (data.status === 200) {
        setSolis(data.data.justificaciones)
        console.log(data.data.justificaciones)
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
  }

  useEffect(() => {
    cargarSolis()
  }, []);

  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom textAlign="center" color={theme.palette.orange.main}>
                Solicitudes de justificación
              </Typography>
            </Grid>
            <List sx={style} component="nav" aria-label="mailbox folders" >
              {solis.map(solicitud =>
              <ListItem key={solicitud.id}>
                <ListItemText>
                  <Divider />
                  <Grid item xs={12}>
                    <Button sx={{mt: 2, ml:5}} variant="contained" onClick={()=>(localStorage.setItem("solicitud-id",solicitud.id),localStorage.setItem("solicitud-fecha",solicitud.fecha),localStorage.setItem("solicitud-worker",solicitud.worker),localStorage.setItem("solicitud-desc",solicitud.descripcion),window.location.href = '/administrador/manejar-solicitud')}>
                      <Typography variant="h3" gutterBottom sx={{mt:1}} color="white">
                        {solicitud.worker}
                      </Typography>
                      <Box sx={{m: 4, fontSize:20}}>
                        <Typography variant="body">Fecha: {solicitud.fecha}</Typography>
                      </Box>
                      <Box sx={{m: 2, fontSize:20}}>
                        <Typography variant="body">Descripción: {solicitud.descripcion}</Typography>
                      </Box>
                      <Box sx={{m: 2, fontSize:20}}>
                        <Typography variant="body">Estado: {solicitud.estado}</Typography>
                      </Box>
                    </Button>
                  </Grid>
                </ListItemText>
              </ListItem>
              )}
            </List>
        </Grid>
      </MainCard>
    </>
  );
};
export default BodySpace;
