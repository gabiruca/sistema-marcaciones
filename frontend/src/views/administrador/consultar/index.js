import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import UserCard from './UserCard';
import BodyPart from './TablaMarcaciones';
import { gridSpacing } from 'store/constant';

const Consultar = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <UserCard isLoading={isLoading} />
      </Grid>
      <Grid item xs={12}>
        <BodyPart/>
      </Grid>
    </Grid>
  );
};

export default Consultar;
