// assets
import { IconUserPlus } from '@tabler/icons';

// constant
const icons = {IconUserPlus};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'users',
  title: 'Usuarios',
  type: 'group',
  children: [
    {
      id: 'agregar',
      title: 'Agregar',
      type: 'item',
      icon: icons.IconUserPlus,
      url: '/#'
    }
  ]
};

export default pages;
