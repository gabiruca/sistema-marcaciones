import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid,Typography, Box, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const BodySpace = () => {
  const style = {
    width: '100%',
    bgcolor: 'background.paper',
  };
  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography variant="h2" gutterBottom>
                  Solicitudes enviadas
                </Typography>
                <Divider />
                <List sx={style} component="nav" aria-label="mailbox folders">
                  <ListItem>
                    <ListItemText>
                      <Typography variant="h3" gutterBottom >
                        Fecha: 2023-02-20
                      </Typography>
                      <Box sx={{mt: 4, fontSize:20}}>
                        <Typography variant="body">Descripción: Atraso - Cita médica</Typography>
                      </Box>
                      <Box sx={{mt: 4, fontSize:20}}>
                        <Typography variant="body">Estado: Pendiente</Typography>
                      </Box>
                    </ListItemText>
                  </ListItem>
                </List>
                <Divider />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button sx={{mt:4}} variant='contained' href='/usuario/enviar-solicitud'>
              Nueva solicitud
            </Button>
          </Box>
        </MainCard>
    </>
  );
};
export default BodySpace;
