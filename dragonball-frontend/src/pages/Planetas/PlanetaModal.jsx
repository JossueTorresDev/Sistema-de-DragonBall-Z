import { Globe } from 'lucide-react';
import { planetaService } from '../../services/api';
import GenericModal from '../../components/Generic/GenericModal';

const PlanetaModal = ({ mode = 'view' }) => {
  const fields = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Nombre del planeta'
    },
    {
      name: 'sistema',
      label: 'Sistema',
      type: 'text',
      placeholder: 'Sistema solar del planeta'
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Descripción del planeta...',
      rows: 4
    }
  ];

  const viewFields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'sistema', label: 'Sistema' },
    { key: 'id', label: 'ID' }
  ];

  return (
    <GenericModal
      service={planetaService}
      entityName="Planeta"
      entityNamePlural="planetas"
      icon={Globe}
      iconColor="text-green-600"
      iconBg="bg-green-100"
      fields={fields}
      viewFields={viewFields}
      mode={mode}
    />
  );
};

export default PlanetaModal;