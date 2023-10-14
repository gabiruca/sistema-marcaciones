import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import Authentication from './AuthenticationRoutes';
import UserRoutes from './UserRoutes';

export default function ThemeRoutes() {
  return useRoutes([Authentication, MainRoutes,UserRoutes]);
}
