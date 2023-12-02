import { IconChecklist,  IconFileTime } from '@tabler/icons';

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
      icon: IconChecklist
    },
    {
      id: 'historico',
      title: 'Histórico',
      type: 'item',
      url: '/usuario/historico',
      icon: IconFileTime
    }
  ]
};

export default userJustificaciones;
