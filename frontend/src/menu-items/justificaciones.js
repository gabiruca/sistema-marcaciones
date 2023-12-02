import { IconChecklist, IconFileTime } from '@tabler/icons';

const justificaciones = {
  id: 'justificaciones',
  title: 'Justificaciones',
  type: 'group',
  children: [
    {
      id: 'solicitudes',
      title: 'Solicitudes',
      type: 'item',
      url: '/administrador/solicitudes',
      icon: IconChecklist
    },
    {
      id: 'historico',
      title: 'Histórico',
      type: 'item',
      url: '/administrador/historico',
      icon: IconFileTime
    }
  ]
};

export default justificaciones;
