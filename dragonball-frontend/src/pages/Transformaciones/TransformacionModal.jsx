import { Sparkles } from 'lucide-react';
import { transformacionService } from '../../services/api';
import GenericModal from '../../components/Generic/GenericModal';

const TransformacionModal = ({ mode = 'view' }) => {
  const fields = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Nombre de la transformación'
    },
    {
      name: 'multiplicadorPoder',
      label: 'Multiplicador de Poder',
      type: 'number',
      placeholder: 'Ej: 2, 50, 100'
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Descripción de la transformación...',
      rows: 4
    }
  ];

  const viewFields = [
    { key: 'nombre', label: 'Nombre' },
    { 
      key: 'multiplicadorPoder', 
      label: 'Multiplicador de Poder',
      render: (value) => value ? `x${value}` : 'N/A'
    },
    { key: 'id', label: 'ID' }
  ];

  return (
    <GenericModal
      service={transformacionService}
      entityName="Transformación"
      entityNamePlural="transformaciones"
      icon={Sparkles}
      iconColor="text-yellow-600"
      iconBg="bg-yellow-100"
      fields={fields}
      viewFields={viewFields}
      mode={mode}
    />
  );
};

export default TransformacionModal;