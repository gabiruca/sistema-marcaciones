// assets
import { IconVocabulary, IconCirclePlus, IconEdit } from '@tabler/icons';

// constant
const icons = { IconVocabulary, IconCirclePlus, IconEdit };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Marcaciones',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Agregar',
      type: 'item',
      url: '/#',
      icon: icons.IconCirclePlus
    },
    {
      id: 'default',
      title: 'Consultar',
      type: 'item',
      url: '/consultar',
      icon: icons.IconVocabulary
    },
    {
      id: 'default',
      title: 'Modificar',
      type: 'item',
      url: '/#',
      icon: icons.IconEdit
    }
  ]
};

export default dashboard;
