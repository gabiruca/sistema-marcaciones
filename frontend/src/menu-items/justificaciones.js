import { IconChecklist } from '@tabler/icons';
const icons = {IconChecklist};

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
      icon: icons.IconChecklist
    }
  ]
};

export default justificaciones;
