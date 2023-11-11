import { Grid,Typography, Divider, TextField, MenuItem, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import * as React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./style-upload.css";
import { IconFileUpload } from '@tabler/icons';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BodyPart = () => {
  const [open, setOpen] = React.useState(false);
  const [openArch, setOpenArch] = React.useState(false);
  const [archivo, setArchivo] = useState('');
  const workers = [
    {
      value: 'John Doe',
      label: 'John Doe',
    }
  ];

  const handleClick =()=>{
    setOpen(true);
  };
  const handleClose =()=>{
    setOpen(false);
  };

  const handleClickArch =()=>{
    setOpenArch(true);
  };
  const handleCloseArch =()=>{
    setOpenArch(false);
  };

  let newDate = new Date()
  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Divider>
                <h3>Archivo de marcaciones</h3>
              </Divider>
              <Grid container alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Seleccione el archivo correspondiente a las marcaciones:</Typography>
                <div className="app">
                  <div className="parent">
                    <div className="file-upload">
                      <IconFileUpload />
                      <h3>Seleccionar archivo</h3>
                      <input type="file" accept=".xls, .csv, .xlsm, .xlsx, .xlsb" onChange={e => setArchivo(e.target.value)}/>
                    </div>
                  </div>
                </div>
                <div>
                  <Button sx={{mx:62, my:1}} component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleClickArch}>
                    Subir archivo
                  </Button>
                  <Dialog
                    open={openArch}
                    onClose={handleCloseArch}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title" fontSize="large">
                      {"Subir archivo de marcaciones"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description" color="text">
                        ¿Está seguro de que desea subir el archivo de marcaciones?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseArch}>Cancelar</Button>
                      <Button onClick={handleCloseArch} autoFocus>Subir</Button>
                    </DialogActions>
                </Dialog>
                  <span>{archivo}</span>
                </div>
              </Grid>
              <Divider>
                <h3>Marcación individual</h3>
              </Divider>
            </Grid>
              <Grid item sx={9}>
                <Box sx={{px:10}}>
                  <Box sx={{pb:2}}>Seleccione un empleado:</Box>
                  <TextField
                    id="outlined-select-worker"
                    select
                    defaultValue="John Doe"
                    sx={{width: '50ch'}}
                  >
                    {workers.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{px:10}}>
                  <Box sx={{pt:4, pb:2}}>Seleccione una fecha:</Box>
                  <Box justifyContent="space-between" alignContent="center">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <DatePicker views={['day','month', 'year']} defaultValue={dayjs(`${newDate}`)} />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={3} justifyContent="center" alignContent="center">
                <Button sx={{mx:10, mt:15}} component="label" variant="contained" onClick={handleClick}>
                  Guardar
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title" fontSize="large">
                      {"Agregar marcación"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description" color="text">
                        ¿Está seguro de que desea agregar esta marcación?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={handleClose} autoFocus>Agregar</Button>
                    </DialogActions>
                </Dialog>
              </Grid>
          </Grid>
        </MainCard>
    </>
  );
};
export default BodyPart;
