import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const Consultar = Loadable(lazy(() => import('views/administrador/consultar')));
const Agregar = Loadable(lazy(() => import('views/administrador/agregar')));
const AgregarUsuario = Loadable(lazy(() => import('views/administrador/usuario-agregar')));
const Solicitudes = Loadable(lazy(() => import('views/administrador/solicitudes')));
const Modificar = Loadable(lazy(() => import('views/administrador/modificar')));
const Historico = Loadable(lazy(() => import('views/administrador/historico')));
const ManejarSoli = Loadable(lazy(() => import('views/administrador/solicitud')));

const MainRoutes = {
  path: '/administrador',
  element: <MainLayout/>,
  children: [
    {
      path: 'agregar',
      element: <Agregar />
    },
    {
      path: 'consultar',
      element: <Consultar />
    },
    {
      path: 'agregar-usuario',
      element: <AgregarUsuario />
    },
    {
      path: 'solicitudes',
      element: <Solicitudes />
    },
    {
      path: 'modificar',
      element: <Modificar />
    },
    {
      path: 'historico',
      element: <Historico />
    },
    {
      path: 'manejar-solicitud',
      element: <ManejarSoli />
    }
  ],
};

export default MainRoutes;
