import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import Authentication from './AuthenticationRoutes';

export default function ThemeRoutes() {
  return useRoutes([Authentication, MainRoutes]);
}
