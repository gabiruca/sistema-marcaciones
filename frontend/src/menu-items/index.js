import marcaciones from './marcaciones';
import usuarios from './usuarios';
import justificaciones from './justificaciones';
import userMarcaciones from './userMarcaciones';
import userJustificaciones from './userJustificaciones';


let menuItems={};
if(localStorage.getItem("Rol")=="ADMIN" && localStorage.getItem("Cedula")!=null){
  menuItems = {
    items: [marcaciones, usuarios, justificaciones]
  };
}else if(localStorage.getItem("Rol")=="USER" && localStorage.getItem("Cedula")!=null){
  menuItems = {
    items: [userMarcaciones, userJustificaciones]
  };
}else{
  localStorage.setItem("Rol",null)
  //Vista de error de no haber iniciado sesión
}

export default menuItems;
