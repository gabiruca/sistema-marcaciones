import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import Authentication from './AuthenticationRoutes';
import UserRoutes from './UserRoutes';
import OtherRoutes from './Other';

export default function ThemeRoutes() {
  return useRoutes([Authentication, MainRoutes,UserRoutes,OtherRoutes]);
}
