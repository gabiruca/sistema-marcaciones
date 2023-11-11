import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Stack,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Alert,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { HOST } from "hooks/variables";

const Login = ({ ...others }) => {

  const phoneRegExp = /^\d{10}/
  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const [autorizado,setAutorizado]=useState(false);
  const [alerta,setAlerta]=useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const [rol,setRol]=useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const timeout = setTimeout(() => {
    setAlerta(false);
  }, 5000);


  function getTipoUsuario(cedula){
    localStorage.setItem("Cedula",cedula)
    axios
    .request({
      method: "GET",
      url: `${HOST}api/tipoUsuario/${cedula}`,
    })
    .then((data) => {
      if (data.status === 200) {
        setAutorizado(true);
        setRol(data.data.Rol);
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response)
      }
    });
  }

  function validarLogin(cedula,passw){
    axios
    .request({
      method: "GET",
      url: `${HOST}api/validateLogin/${cedula}/${passw}`,
    })
    .then((data) => {
      if (data.status === 200) {
        getTipoUsuario(data.data.Cedula);
      }
    })
    .catch((error) => {
      if (error.response) {
        setAlerta(true);
      }
    });
  }


  const handleLogin = async(cedula,pass)=>{
    validarLogin(cedula,pass)
  }

  useEffect(() => {
    localStorage.setItem("Rol",rol)
    console.log(localStorage.getItem("Cedula"))
    if(autorizado){
      if(rol=='ADMIN'){
        window.location.href = '/administrador/modificar';
      }else if(rol=='USER'){
        window.location.href = '/usuario/consultar-user';
      }
    }
  }, [autorizado]);

  useEffect(() => {
    if(alerta){
      timeout
    }
  }, [alerta]);

  useEffect(() => {
    
  }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">

        </Grid>
      </Grid>

      <Formik
        initialValues={{
          cedula: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          cedula: Yup.string().matches(phoneRegExp, 'Cédula no válida').max(10, 'La cédula debe tener únicamente 10 dígitos').required('Ingrese el número de cédula'),
          password: Yup.string().max(50).required('Ingrese la contraseña')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.cedula && errors.cedula)} sx={{ ...theme.typography.customInput }}>
              <Typography variant="body1"sx={{mx:1}}>Cédula</Typography>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="cedula"
                value={values.cedula}
                name="cedula"
                onBlur={handleBlur}
                onChange={handleChange}
                label="cedula"
                inputProps={{}}
              />
              {touched.cedula && errors.cedula && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.cedula}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <Typography variant="body1"sx={{mx:1}}>Contraseña</Typography>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <Stack alignItems="center" color={theme.palette.background.paper}>
                <AnimateButton>
                  <Button disabled={isSubmitting} size="large" type="submit" variant="contained" color="primary" onClick={()=>handleLogin(values.cedula,values.password)}>
                    Ingresar
                  </Button>
                </AnimateButton>
              </Stack>
            </Box>
          </form>

        )}
      </Formik>
      {alerta ?
        <Alert sx={{mt:1.5}} severity="error"> El número de cédula o la constraseñas están incorrectos.</Alert>
      : <Box sx={{m:7.6}} />}
    </>
  );
};

export default Login;