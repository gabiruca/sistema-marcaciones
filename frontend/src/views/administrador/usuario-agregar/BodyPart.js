import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Button, Stack, Paper, Select, MenuItem, TextField, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useState, useEffect } from 'react';
import { IconDeviceFloppy } from '@tabler/icons';
import './styles.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { HOST } from "hooks/variables";
import Alert from '@mui/material/Alert';

const BodyPart = () => {
  const [cedula, setCedula]=useState('');
  const [openAceptar, setOpenAceptar] = React.useState(false);
  const [biom, setBiom]=useState('');
  const [nombres, setNombres]=useState('');
  const [apellidos, setApellidos]=useState('');
  const [email, setEmail]=useState('');
  const [born, setBorn]=useState('');
  const [cont, setCont]=useState('');
  const [gen, setGen]=useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [alertS, setAlertS]= useState(false);
  const [alertE, setAlertE]= useState(false);
  const [alertContent, setAlertContent]= useState("");
  const form_data = new FormData();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
  }));

  const generos=[
    {
      "label":"Femenino",
      "value":"f"
    },
    {
      "label":"Masculino",
      "value":"M"
    }
  ]

  const registrarUser=()=>{
    form_data.append("cedula",cedula)
    form_data.append("nombres",nombres)
    form_data.append("apellidos",apellidos)
    form_data.append("biom",biom)
    form_data.append("email",email)
    form_data.append("born",born)
    form_data.append("cont",cont)
    form_data.append("gen",gen)
    axios
    .request({
      method: "POST",
      url: `${HOST}api/registrar`,
      data:form_data,
    })
    .then((data) => {
      if (data.status === 200) {
        setDatos(data.data);
        setAlertS(true)
        setAlertContent("Trabajador registrado")
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
      setAlertE(true)
      setAlertContent("No se pudo registrar al trabajador")
    });
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const timeout = setTimeout(() => {
    setAlertS(false);
    setAlertE(false);
  }, 10000);

  useEffect(() => {
    if(alertS){
      timeout
    }
  }, [alertS]);

  useEffect(() => {
    if(alertE){
      timeout
    }
  }, [alertE]);

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append("cedula",cedula)
      try {
        const response = await axios.post(`${HOST}api/subirImg`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        setAlertS(true)
        setAlertContent("Imagen subida")
      } catch (error) {
        setAlertE(true)
        setAlertContent("Error al subir la imagen")
      }
    } else {
      console.error('Por favor, selecciona una imagen antes de subirla.');
    }
  };

  const handleA = () => {
    registrarUser();
    setOpenAceptar(false);
  };
  const handleClose = () => {
    setOpenAceptar(false);
  };
  const handleClickOpenA = () => {
    setOpenAceptar(true);
  };
  const handleChange=(e)=>{
    setGen(e.target.value);
  }
  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography sx={{mt:5}} variant='h4'> 1.- Ingrese los datos del nuevo trabajador: </Typography>
                <div className='div-class'>
                  <p className='tags-names'>Ingrese cédula</p>
                  <TextField type="number"  onChange={event => {setCedula(event.target.value);}}/>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Código biométrico</p>
                  <TextField type="number" onChange={event => {setBiom(event.target.value);}}/>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Nombres</p>
                  <TextField type="text" onChange={event => {setNombres(event.target.value);}}/>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Apellidos</p>
                  <TextField type="text" onChange={event => {setApellidos(event.target.value);}}/>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Email</p>
                  <TextField type="email" onChange={event => {setEmail(event.target.value);}}/>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Fecha de nacimiento</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <DatePicker views={['day','month', 'year']} onChange={(newValue) => {setBorn(newValue);}}/>
                  </LocalizationProvider>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Fecha de contrato</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <DatePicker views={['day','month', 'year']} onChange={(newValue) => {setCont(newValue);}}/>
                  </LocalizationProvider>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Género</p>
                  <Select
                    id="outlined-select-worker"
                    sx={{width: '50ch'}}
                    value={gen}
                    onChange={handleChange}
                  >
                    {generos.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <Button variant="contained" sx={{ml:17}} onClick={handleClickOpenA}>
                  <IconDeviceFloppy/> Registrar usuario
                </Button>
                <Dialog
                  open={openAceptar}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" fontSize="large">
                    {"Registrar usuario"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description" color="text">
                      <p>¿Está seguro de que desea registrar a este usuario?</p>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleA} autoFocus>Aceptar</Button>
                  </DialogActions>
                  </Dialog>
            </Grid>
            <Grid item xs={6}>
            <Stack direction="row">
              <Item textAlign="right">
                <div id='div-pic'>
                  <Typography sx={{mb:5}} variant='h4'> 2.- Seleccione y suba una imagen del nuevo trabajador: </Typography>
                  <Button variant='contained'>
                    <label htmlFor="input-pic">Seleccionar</label>
                    <input type="file" id="input-pic" accept=".jpg, .jpeg, .png" hidden onChange={handleFileChange}/>
                  </Button>
                </div>
                <Button variant="contained" onClick={handleUpload}>
                  Subir
                </Button>
              </Item>
            </Stack>
            </Grid>
          </Grid>
        </MainCard>
        {alertS ? <Alert severity='success' variant='filled' sx={{mb:3}}>{alertContent}</Alert> : <></> }
        {alertE ? <Alert severity='error' variant='filled' sx={{mb:3}}>{alertContent}</Alert> : <></> }
    </>
  );
};

export default BodyPart;
