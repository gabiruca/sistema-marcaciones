// material-ui
import { styled } from '@mui/material/styles';
import ruta from 'assets/images/fondo-login-blured.png';

const AuthWrapper1 = styled('div')(() => ({
  backgroundImage: `url(${ruta})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}));

export default AuthWrapper1;
