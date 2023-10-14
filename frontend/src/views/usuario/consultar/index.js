import { Grid } from '@mui/material';
import UserCard from './UserCard';
import TablaMarcaciones from './TablaMarcaciones';
import { gridSpacing } from 'store/constant';

const Consultar = () => {

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <UserCard />
      </Grid>
      <Grid item xs={12}>
        <TablaMarcaciones/>
      </Grid>
    </Grid>
  );
};

export default Consultar;
