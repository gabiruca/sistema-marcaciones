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
      icon: icons.IconCirclePlus,
      breadcrumbs: false
    },
    {
      id: 'default',
      title: 'Consultar',
      type: 'item',
      url: '/consultar',
      icon: icons.IconVocabulary,
      breadcrumbs: false
    },
    {
      id: 'default',
      title: 'Modificar',
      type: 'item',
      url: '/#',
      icon: icons.IconEdit,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
