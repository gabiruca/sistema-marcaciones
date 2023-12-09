import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid,Typography, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from "axios";
import { HOST } from "hooks/variables";
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

const BodySpace = () => {
  const theme = useTheme();
  const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };
  const [solis, setSolis] = useState([]);

  function cargarSolis(){
    let userCed=localStorage.getItem("Cedula")
    axios
    .request({
      method: "GET",
      url: `${HOST}api/cargarSolicitudes/${userCed}`,
    })
    .then((data) => {
      if (data.status === 200) {
        setSolis(data.data.justificaciones)
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
                  Solicitudes pendientes
                </Typography>
                <List sx={style} component="nav" aria-label="mailbox folders">
                  {solis.map(solicitud =>
                    <ListItem key={solicitud.id}>
                      <ListItemText>
                        <Divider />
                        <Box sx={{mt: 4}}>
                          <Box sx={{m: 2, fontSize:20}}>
                            <Typography variant="body">Fecha: {solicitud.fecha}</Typography>
                          </Box>
                            <Box sx={{m: 2, fontSize:20}}>
                              <Typography variant="body">Descripción: {solicitud.descripcion}</Typography>
                            </Box>
                          <Box sx={{m: 2, fontSize:20}}>
                            <Typography variant="body">Estado: {solicitud.estado}</Typography>
                          </Box>
                        </Box>
                      </ListItemText>
                    </ListItem>
                  )}
                </List>
                <Divider />
            </Grid>
          </Grid>
        </MainCard>
    </>
  );
};
export default BodySpace;
