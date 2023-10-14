import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid,Typography, Box, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';

const BodySpace = () => {
  const theme = useTheme();
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
                          Solicitudes de justificaciones
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
                              <Button variant="contained" sx={{px:3, py:1 , mx:50, my:0.5, backgroundColor: theme.palette.success.dark}}>
                                Aceptar
                              </Button>
                            </Box>
                            <Box sx={{p: 1}}>
                              <span>Jutificación:</span><span> Cita médica</span>
                              <Button variant="contained" sx={{px:3, py:1 , mx:46, my:0.5, backgroundColor: theme.palette.error.main}}>
                                Negar
                              </Button>
                            </Box>
                          </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem  divider>
                          <ListItemText>
                            <Typography variant="h3" gutterBottom >
                                Jane Doe - Solicitud de justificación de falta
                              </Typography>
                              <Box sx={{p: 1}}>
                                <span>Fecha:</span><span> 2023-02-13</span>
                                <Button variant="contained" sx={{px:3, py:1 , mx:50, my:0.5, backgroundColor: theme.palette.success.dark}}>
                                  Aceptar
                                </Button>
                              </Box>
                              <Box sx={{p: 1}}>
                                <span>Jutificación:</span><span> Asunto familiar</span>
                                <Button variant="contained" sx={{px:3, py:1 , mx:43.5, my:0.5, backgroundColor: theme.palette.error.main}}>
                                  Negar
                                </Button>
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
