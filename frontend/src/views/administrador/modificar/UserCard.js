import { useState, useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, Select, MenuItem, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ProfilePic from 'assets/images/picture-placeholder.jpg';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import axios from "axios";
import { HOST } from "hooks/variables";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  },
  'label':{
    color: theme.palette.primary.dark
  }
}));


const UserCard = () => {

  const theme = useTheme();
  const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  let newDate = new Date()
  let month = newDate.getMonth()+1;
  let year = newDate.getFullYear();
  let mname=monthNames[month-1]

  //Datos trabajador
  const [apellidos,setApellidos]=useState('');
  const [nombres,setNombres]=useState('');
  const [cedula,setCedula]=useState('');
  const [mes,setMes]=useState(month);
  const [years,setYears]=useState(year);
  

  //Diccionario trabajadores
  const [workers,setWorkers]=useState([])

  function getInfoWorker(cedula){
    axios
    .request({
      method: "GET",
      url: `${HOST}api/informacionUsuario/${cedula}`,
    })
    .then((data) => {
      if (data.status === 200) {
        setApellidos(data.data.Apellidos);
        setNombres(data.data.Nombres);
        setCedula(data.data.Cedula);
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
  }

  useEffect(() => {
    getInfoWorker(localStorage.getItem("CedulaWorker"));
  }, [localStorage.getItem("CedulaWorker")]);

  useEffect(() => {
    localStorage.setItem("mes",mes)
  }, [mes]);

  useEffect(() => {
    localStorage.setItem("year",years)
  }, [years]);

  useEffect(() => {
    cargarDatos()
  }, []);


  function cargarDatos(){
    axios
    .request({
      method: "GET",
      url: `${HOST}api/cargarWorkers`,
    })
    .then((data) => {
      if (data.status === 200) {
        setWorkers(data.data.workers)
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
  }

  const handleChange=(event)=>{
    localStorage.setItem("CedulaWorker",event.target.value)
    setCedula(event.target.value)
  }

  const cambiar=(newValue)=>{
    setMes((newValue.$M)+1)
    setYears(newValue.$y)
    localStorage.setItem("mes",mes)
    localStorage.setItem("year",years)
    console.log('mes',mes),
    console.log('year',years)
  }
  return (
    <>
        <CardWrapper border={false} content={false}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Box sx={{px:15, pt:9, pb:2}}>
                <Select
                  id="outlined-select-worker"
                  sx={{width: '50ch'}}
                  value={cedula}
                  onChange={handleChange}
                >
                  {workers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{px:15, py:0}} justifyContent="space-between" alignContent="center">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                  <DatePicker views={['month', 'year']} value={dayjs(`${mname}+" "+${years}`)} onChange={(newValue)=>cambiar(newValue)}/>
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Box sx={{py:5, px:2, mx: 4}}>
                <List>
                  <ListItem alignItems="right" disableGutters sx={{ py: 0 }}>
                    <ListItemText
                      sx={{
                        py: 0,
                        mt: 0.45,
                        mb: 0.45
                      }}
                      primary={<Typography variant="h2">{nombres + " "}{apellidos}</Typography>}
                      secondary={
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: theme.palette.grey[500],
                            mt: 0.5
                          }}
                        >
                          CI: {cedula}
                        </Typography>
                      }
                    />
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={ProfilePic}
                        sx={{
                          ...theme.typography.commonAvatar,
                          ...theme.typography.largestAvatar,
                          backgroundColor: theme.palette.warning.light,
                          color: theme.palette.warning.dark
                        }}
                      >
                        
                      </Avatar>
                    </ListItemAvatar>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </CardWrapper>
    </>
  );
};

export default UserCard;
