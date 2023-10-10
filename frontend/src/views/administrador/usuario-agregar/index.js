import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import BodyPart from './BodyPart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const AgregarUsuario = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <BodyPart isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default AgregarUsuario;
