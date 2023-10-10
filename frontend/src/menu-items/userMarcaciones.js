import { IconVocabulary, IconCirclePlus, IconEdit } from '@tabler/icons';
const icons = { IconVocabulary, IconCirclePlus, IconEdit };

const userMarcaciones = {
  id: 'user-marcaciones',
  title: 'Marcaciones',
  type: 'group',
  children: [
    {
      id: 'user-consultar',
      title: 'Consultar',
      type: 'item',
      url: '/usuario/#',
      icon: icons.IconVocabulary
    }
  ]
};

export default userMarcaciones;
