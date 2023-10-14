import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid,Typography, Button, Stack, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ProfilePic from 'assets/images/picture-placeholder.jpg';
import { useState } from 'react';
import './styles.css';

const BodyPart = () => {
  const [archivo, setArchivo] = useState('');
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
  }));
  return (
    <>
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
                <div className='div-class'>
                  <p className='tags-names'>Ingrese cédula</p>
                  <input type="number" value="1234567890"/>
                  <Button variant="contained">
                    Buscar
                  </Button>
                  <Typography variant="subtitle1" color="green">¡Usuario encontrado!</Typography>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Nombres</p>
                  <input type="text" disabled value="Jane"/>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Apellidos</p>
                  <input type="text" disabled value="Doe"/>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Email</p>
                  <input type="text" disabled value="jane.doe@example.com"/>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Fecha de nacimiento</p>
                  <input type="text" disabled value="1980/10/09"/>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Fecha de contrato</p>
                  <input type="text" disabled value="2023/02/23"/>
                </div>
                <div className='div-class'>
                  <p className='tags-names'>Género</p>
                  <input type="text" disabled value="Femenino"/>
                </div>
            </Grid>
            <Grid item alignContent="left" justifyContent="space-between" xs={6}>
            <Stack direction="row">
              <Item>
                <img id="profile" src={ProfilePic} alt="profile" />
                <p>{archivo}</p>  
              </Item>
              <Item>
                <div id='div-pic'>
                  <Button variant='contained'>
                    <label htmlFor="input-pic">Seleccionar</label>
                    <input type="file" id="input-pic" accept=".jpg, .jpeg, .png" hidden onChange={e => setArchivo(e.target.value)}/>
                  </Button>
                </div>
                <Button variant="contained">
                  Subir
                </Button>
              </Item>
            </Stack>
            </Grid>
          </Grid>
        </MainCard>
    </>
  );
};

export default BodyPart;
