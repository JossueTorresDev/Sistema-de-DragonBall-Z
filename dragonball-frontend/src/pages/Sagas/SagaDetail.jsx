import { BookOpen } from 'lucide-react';
import { sagaService } from '../../services/api';
import GenericDetail from '../../components/Generic/GenericDetail';

const SagaDetail = () => {
  const fields = [
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
    <GenericDetail
      service={sagaService}
      entityName="Saga"
      entityNamePlural="sagas"
      icon={BookOpen}
      iconColor="text-orange-600"
      iconBg="bg-orange-100"
      fields={fields}
    />
  );
};

export default SagaDetail;