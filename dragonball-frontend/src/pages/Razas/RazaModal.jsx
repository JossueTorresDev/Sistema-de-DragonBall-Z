import { Zap } from 'lucide-react';
import { razaService } from '../../services/api';
import GenericModal from '../../components/Generic/GenericModal';

const RazaModal = ({ mode = 'view' }) => {
  const fields = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Nombre de la raza'
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Descripción de la raza...',
      rows: 4
    }
  ];

  const viewFields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'id', label: 'ID' }
  ];

  return (
    <GenericModal
      service={razaService}
      entityName="Raza"
      entityNamePlural="razas"
      icon={Zap}
      iconColor="text-purple-600"
      iconBg="bg-purple-100"
      fields={fields}
      viewFields={viewFields}
      mode={mode}
    />
  );
};

export default RazaModal;