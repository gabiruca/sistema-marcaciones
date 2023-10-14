import { Grid } from '@mui/material';
import BodyPart from './BodyPart';
import { gridSpacing } from 'store/constant';


const AgregarUsuario = () => {

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <BodyPart />
      </Grid>
    </Grid>
  );
};

export default AgregarUsuario;
