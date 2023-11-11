import * as React from 'react';
import { Grid, Button, TextField, MenuItem, Box } from '@mui/material';
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

const BodyPart = () => {
  const [open, setOpen] = React.useState(false);
  const tipos = [
    {
      value:'Falta',
      label: 'Falta',
    },
    {
      value: 'Atraso',
      label: 'Atraso',
    }
  ];

  let newDate = new Date();

  const motivos = [
    {
      value:'cita',
      label:'Cita médica',
    },
    {
      value:'familiar',
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

  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Box alignContent="center" justifyContent="space-between" sx={{m:5}}>
                  <span className='tags-names'>Fecha</span>
                  <Box sx={{mx:12, mt: -4, width:'25ch'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <DatePicker views={['day','month', 'year']} defaultValue={dayjs(`${newDate}`)} />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box alignContent="center" justifyContent="space-between" sx={{m:5}}>
                  <span className='tags-names'>Tipo</span>
                  <TextField
                    id="outlined-select-tipo"
                    select
                    defaultValue="Falta"
                    sx={{width: '25ch',mx:8, mt:-2}}
                  >
                    {tipos.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box alignContent="center" justifyContent="space-between" sx={{m:5}}>
                  <span className='tags-names'>Motivo</span>
                  <TextField
                    id="outlined-select-motivo"
                    select
                    defaultValue="cita"
                    sx={{width: '80ch', mx:6, mt:-2}}
                  >
                    {motivos.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
                      <Button onClick={handleClose} autoFocus>Enviar</Button>
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
