import { Grid,Typography, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const BodyPart = () => {

  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle1">Ingrese cédula</Typography>
                      <input type="number" value="1234567890"/>
                      <Button variant="contained">
                        Buscar
                      </Button>
                      <Typography variant="subtitle1">¡Usuario encontrado!</Typography>
                      <Typography variant="subtitle1">Nombres</Typography>
                      <input type="text" disabled value="Jane"/>
                      <Typography variant="subtitle1">Apellidos</Typography>
                      <input type="text" disabled value="Doe"/>
                      <Typography variant="subtitle1">Email</Typography>
                      <input type="text" disabled value="jane.doe@example.com"/>
                      <Typography variant="subtitle1">Fecha de nacimiento</Typography>
                      <input type="date" disabled value="1980-10-21"/>
                      <Typography variant="subtitle1">Fecha de contrato</Typography>
                      <input type="date" disabled value="2023-02-23"/>
                      <Typography variant="subtitle1">Género</Typography>
                      <input type="text" disabled value="Femenino"/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
    </>
  );
};

export default BodyPart;
