import marcaciones from './marcaciones';
import usuarios from './usuarios';
import justificaciones from './justificaciones';
import userMarcaciones from './userMarcaciones';
import userJustificaciones from './userJustificaciones';

//PENDIENTE: validación con el tipo de usuario
const menuItems = {
  items: [marcaciones, usuarios, justificaciones,userMarcaciones, userJustificaciones]
};

export default menuItems;
