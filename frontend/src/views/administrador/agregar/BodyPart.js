import { Grid,Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import * as React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./style-upload.css";
import { IconFileUpload } from '@tabler/icons';
import { useState } from 'react';

const BodyPart = () => {
  const [archivo, setArchivo] = useState('');
  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Seleccione el archivo correspondiente a las marcaciones:</Typography>
                <div className="app">
                  <div className="parent">
                    <div className="file-upload">
                      <IconFileUpload />
                      <h3>Seleccionar archivo</h3>
                      <input type="file"  onChange={e => setArchivo(e.target.value)}/>
                    </div>
                  </div>
                </div>
                <div>
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Subir archivo
                  </Button>
                  <span>{archivo}</span>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
    </>
  );
};
export default BodyPart;
