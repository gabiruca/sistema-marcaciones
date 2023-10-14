import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const Perfil = Loadable(lazy(() => import('views/perfil')));

const UserRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'perfil',
      element: <Perfil />
    }
  ]
};

export default UserRoutes;
