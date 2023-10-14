import { IconVocabulary, IconCirclePlus, IconEdit } from '@tabler/icons';
const icons = { IconVocabulary, IconCirclePlus, IconEdit };

const marcaciones = {
  id: 'marcaciones',
  title: 'Marcaciones',
  type: 'group',
  children: [
    {
      id: 'agregar',
      title: 'Agregar',
      type: 'item',
      url: '/administrador/agregar',
      icon: icons.IconCirclePlus
    },
    {
      id: 'consultar',
      title: 'Consultar',
      type: 'item',
      url: '/administrador/consultar',
      icon: icons.IconVocabulary
    },
    {
      id: 'modificar',
      title: 'Modificar',
      type: 'item',
      url: '/administrador/modificar',
      icon: icons.IconEdit
    }
  ]
};

export default marcaciones;
