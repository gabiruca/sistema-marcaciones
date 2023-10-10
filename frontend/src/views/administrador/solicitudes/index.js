import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import BodySpace from './BodySpace';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Solicitudes = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <BodySpace isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default Solicitudes;
