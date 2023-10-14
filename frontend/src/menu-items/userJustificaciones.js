import { IconChecklist } from '@tabler/icons';
const icons = {IconChecklist};

const userJustificaciones = {
  id: 'user-justificaciones',
  title: 'Justificaciones',
  type: 'group',
  children: [
    {
      id: 'userSolicitudes',
      title: 'Solicitudes',
      type: 'item',
      url: '/usuario/solicitudes-user',
      icon: icons.IconChecklist
    }
  ]
};

export default userJustificaciones;
