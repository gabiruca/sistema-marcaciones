import { useState } from 'react';
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
  InputLabel,
  OutlinedInput
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin =()=>{
    window.location.href = '/administrador/consultar'
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '0123456789',
          password: 'password',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('La cédula es incorrecta').max(255).required('Ingrese el número de cédula'),
          password: Yup.string().max(255).required('Ingrese la contraseña')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
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
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Cédula</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="number"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="email"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Contraseña</InputLabel>
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
                  <Button disabled={isSubmitting} size="large" type="submit" variant="contained" color="primary" onClick={handleLogin}>
                    Ingresar
                  </Button>
                </AnimateButton>
              </Stack>
            </Box>
          </form>

        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
