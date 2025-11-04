import { sagaService } from '../../services/api';
import GenericForm from '../../components/Generic/GenericForm';

const SagaForm = () => {
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

  const initialData = {
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: ''
  };

  return (
    <GenericForm
      service={sagaService}
      entityName="Saga"
      entityNamePlural="sagas"
      fields={fields}
      initialData={initialData}
    />
  );
};

export default SagaForm;