import { IconChecklist } from '@tabler/icons';
const icons = {IconChecklist};

const userJustificaciones = {
  id: 'user-justificaciones',
  title: 'Justificaciones',
  type: 'group',
  children: [
    {
      id: 'user-solicitudes',
      title: 'Solicitudes',
      type: 'item',
      url: '/usuario/#',
      icon: icons.IconChecklist
    }
  ]
};

export default userJustificaciones;
