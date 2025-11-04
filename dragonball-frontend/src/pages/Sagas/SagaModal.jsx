import { BookOpen } from 'lucide-react';
import { sagaService } from '../../services/api';
import GenericModal from '../../components/Generic/GenericModal';

const SagaModal = ({ mode = 'view' }) => {
  const fields = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Nombre de la saga'
    },
    {
      name: 'fechaInicio',
      label: 'Fecha de Inicio',
      type: 'date',
      placeholder: 'Fecha de inicio de la saga'
    },
    {
      name: 'fechaFin',
      label: 'Fecha de Fin',
      type: 'date',
      placeholder: 'Fecha de fin de la saga'
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Descripción de la saga...',
      rows: 4
    }
  ];

  const viewFields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'id', label: 'ID' },
    { 
      key: 'fechaInicio', 
      label: 'Fecha de Inicio',
      render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    },
    { 
      key: 'fechaFin', 
      label: 'Fecha de Fin',
      render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A'
    }
  ];

  return (
    <GenericModal
      service={sagaService}
      entityName="Saga"
      entityNamePlural="sagas"
      icon={BookOpen}
      iconColor="text-orange-600"
      iconBg="bg-orange-100"
      fields={fields}
      viewFields={viewFields}
      mode={mode}
    />
  );
};

export default SagaModal;