import { IconUserPlus } from '@tabler/icons';
const icons = {IconUserPlus};

const usuarios = {
  id: 'users',
  title: 'Usuarios',
  type: 'group',
  children: [
    {
      id: 'agregar-usuario',
      title: 'Agregar',
      type: 'item',
      icon: icons.IconUserPlus,
      url: '/administrador/agregar-usuario'
    }
  ]
};

export default usuarios;
