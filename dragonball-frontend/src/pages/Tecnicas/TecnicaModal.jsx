import { Sword } from 'lucide-react';
import { tecnicaService } from '../../services/api';
import GenericModal from '../../components/Generic/GenericModal';

const TecnicaModal = ({ mode = 'view' }) => {
  const fields = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Nombre del arte marcial'
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'text',
      placeholder: 'Ej: Ataque, Defensa, Especial, Ki'
    },
    {
      name: 'nivelPoder',
      label: 'Nivel de Poder',
      type: 'number',
      placeholder: 'Nivel de poder requerido'
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Descripción del arte marcial...',
      rows: 4
    }
  ];

  const viewFields = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'tipo', label: 'Tipo' },
    { 
      key: 'nivelPoder', 
      label: 'Nivel de Poder',
      render: (value) => value ? value.toLocaleString() : 'N/A'
    },
    { key: 'id', label: 'ID' }
  ];

  return (
    <GenericModal
      service={tecnicaService}
      entityName="Arte Marcial"
      entityNamePlural="tecnicas"
      icon={Sword}
      iconColor="text-red-600"
      iconBg="bg-red-100"
      fields={fields}
      viewFields={viewFields}
      mode={mode}
    />
  );
};

export default TecnicaModal;