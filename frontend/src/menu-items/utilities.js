// assets
import { IconChecklist } from '@tabler/icons';

// constant
const icons = {IconChecklist};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'justificaciones',
  title: 'Justificaciones',
  type: 'group',
  children: [
    {
      id: 'solicitudes',
      title: 'Solicitudes',
      type: 'item',
      url: '/#',
      icon: icons.IconChecklist
    }
  ]
};

export default utilities;
