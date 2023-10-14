import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid,Typography, Box } from '@mui/material';
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
                              John Doe - Solicitud de justificación de atraso
                            </Typography>
                            <Box sx={{p: 1}}>
                              <span>Fecha:</span><span> 2023-02-20</span>
                            </Box>
                            <Box sx={{p: 1}}>
                              <span>Jutificación:</span><span> Cita médica</span>
                            </Box>
                          </ListItemText>
                        </ListItem>
                        <Divider />
                      </List>
            </Grid>
          </Grid>
        </MainCard>
    </>
  );
};
export default BodySpace;
