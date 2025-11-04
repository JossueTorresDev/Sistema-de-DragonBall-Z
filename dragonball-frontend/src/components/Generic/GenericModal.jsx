import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Save } from 'lucide-react';
import Modal from '../UI/Modal';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

const GenericModal = ({ 
  service,
  entityName,
  entityNamePlural,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-100',
  fields = [],
  viewFields = [],
  mode = 'view'
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === 'edit';
  const isCreate = mode === 'create';
  const isView = mode === 'view';

  const [entity, setEntity] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(isEdit || isCreate);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      if (id && !isCreate) {
        const response = await service.getById(id);
        const entityData = response.data;
        setEntity(entityData);
        
        const newFormData = {};
        fields.forEach(field => {
          newFormData[field.name] = entityData[field.name] || '';
        });
        setFormData(newFormData);
      } else {
        // Initialize form data for create mode
        const newFormData = {};
        fields.forEach(field => {
          newFormData[field.name] = '';
        });
        setFormData(newFormData);
      }

      setError(null);
    } catch (err) {
      setError(`Error al cargar ${entityName.toLowerCase()}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate(`/${entityNamePlural.toLowerCase()}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      if (isCreate) {
        await service.create(formData);
      } else {
        await service.update(id, formData);
      }

      handleClose();
    } catch (err) {
      setError(`Error al guardar ${entityName.toLowerCase()}`);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getTitle = () => {
    if (isCreate) return `Nuevo ${entityName}`;
    if (editMode) return `Editar: ${entity?.nombre || entityName}`;
    return entity?.nombre || entityName;
  };

  if (loading) {
    return (
      <Modal isOpen={true} onClose={handleClose} title="Cargando..." size="md">
        <LoadingSpinner size="lg" text={`Invocando ${entityName.toLowerCase()}...`} />
      </Modal>
    );
  }

  return (
    <Modal 
      isOpen={true} 
      onClose={handleClose} 
      title={getTitle()}
      size="lg"
    >
      <div className="p-6">
        {error && (
          <ErrorMessage message={error} onRetry={() => setError(null)} showRetry={false} />
        )}

        {/* View Mode */}
        {!editMode && entity && (
          <div className="space-y-8">
            {/* Header de la Entidad */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-black mb-2">{entity.nombre}</h2>
                  <p className="text-xl text-white/90">{entityName}</p>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {viewFields.map((field) => (
                <div key={field.key} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">{field.label}</label>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {field.render ? field.render(entity[field.key]) : (entity[field.key] || 'N/A')}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            {entity.descripcion && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Descripción</label>
                <p className="text-gray-700 leading-relaxed mt-3 text-lg">{entity.descripcion}</p>
              </div>
            )}
          </div>
        )}

        {/* Edit/Create Mode */}
        {editMode && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} {field.required && '*'}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                      rows={field.rows || 4}
                      className="input-field"
                      placeholder={field.placeholder}
                    />
                  ) : field.type === 'date' ? (
                    <input
                      type="date"
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                      className="input-field"
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                      className="input-field"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isCreate ? 'Crear' : 'Actualizar'} {entityName}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default GenericModal;