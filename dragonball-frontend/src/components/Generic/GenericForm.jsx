import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

const GenericForm = ({ 
  service, 
  entityName, 
  entityNamePlural, 
  fields = [],
  initialData = {}
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchEntity();
    }
  }, [id, isEdit]);

  const fetchEntity = async () => {
    try {
      setLoading(true);
      const response = await service.getById(id);
      const entity = response.data;
      
      const newFormData = { ...initialData };
      fields.forEach(field => {
        newFormData[field.name] = entity[field.name] || '';
      });
      
      setFormData(newFormData);
      setError(null);
    } catch (err) {
      setError(`Error al cargar ${entityName.toLowerCase()}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      if (isEdit) {
        await service.update(id, formData);
      } else {
        await service.create(formData);
      }

      navigate(`/${entityNamePlural.toLowerCase()}`);
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

  if (loading) return <LoadingSpinner size="xl" text="Preparando la magia..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to={`/${entityNamePlural.toLowerCase()}`}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? `Editar ${entityName}` : `Nuevo ${entityName}`}
          </h1>
          <p className="text-gray-600">
            {isEdit ? `Modifica los datos de ${entityName.toLowerCase()}` : `Añade un nuevo ${entityName.toLowerCase()} al archivo`}
          </p>
        </div>
      </div>

      {error && (
        <ErrorMessage message={error} onRetry={() => setError(null)} showRetry={false} />
      )}

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
            <Link
              to={`/${entityNamePlural.toLowerCase()}`}
              className="btn-secondary"
            >
              Cancelar
            </Link>
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
                  <span>{isEdit ? 'Actualizar' : 'Crear'} {entityName}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericForm;