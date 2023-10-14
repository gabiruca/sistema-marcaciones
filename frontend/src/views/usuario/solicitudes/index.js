import { Grid } from '@mui/material';
import BodySpace from './BodySpace';
import { gridSpacing } from 'store/constant';

const Solicitudes = () => {

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <BodySpace />
      </Grid>
    </Grid>
  );
};

export default Solicitudes;
