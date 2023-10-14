import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const ConsultarUser = Loadable(lazy(() => import('views/usuario/consultar')));
const SolicitudesUser = Loadable(lazy(() => import('views/usuario/solicitudes')));

const UserRoutes = {
  path: '/usuario',
  element: <MainLayout />,
  children: [
    {
      path: 'consultar-user',
      element: <ConsultarUser />
    },
    {
      path: 'solicitudes-user',
      element: <SolicitudesUser />
    }
  ]
};

export default UserRoutes;
