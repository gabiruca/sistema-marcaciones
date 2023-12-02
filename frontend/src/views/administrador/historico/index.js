import { Grid } from '@mui/material';
import BodySpace from './BodySpace';
import { gridSpacing } from 'store/constant';

const Historico = () => {

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <BodySpace />
      </Grid>
    </Grid>
  );
};

export default Historico;
