import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

const GenericDetail = ({ 
  service, 
  entityName, 
  entityNamePlural, 
  icon: Icon, 
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-100',
  fields = []
}) => {
  const { id } = useParams();
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEntity();
  }, [id]);

  const fetchEntity = async () => {
    try {
      setLoading(true);
      const response = await service.getById(id);
      setEntity(response.data);
      setError(null);
    } catch (err) {
      setError(`Error al cargar ${entityName.toLowerCase()}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner size="xl" text={`Analizando ${entityName.toLowerCase()}...`} />;
  if (error) return <ErrorMessage message={error} onRetry={fetchEntity} />;
  if (!entity) return <ErrorMessage message={`${entityName} no encontrado`} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={`/${entityNamePlural.toLowerCase()}`}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{entity.nombre}</h1>
              <p className="text-gray-600">Detalles de {entityName}</p>
            </div>
          </div>
        </div>
        <Link
          to={`/${entityNamePlural.toLowerCase()}/${id}/editar`}
          className="btn-primary flex items-center space-x-2"
        >
          <Edit className="w-4 h-4" />
          <span>Editar</span>
        </Link>
      </div>

      {/* Content */}
      <div className="card">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="text-sm font-medium text-gray-500">{field.label}</label>
                <p className="text-lg font-semibold text-gray-900">
                  {field.render ? field.render(entity[field.key]) : (entity[field.key] || 'N/A')}
                </p>
              </div>
            ))}
          </div>
          
          {entity.descripcion && (
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-500">Descripción</label>
              <p className="text-gray-700 leading-relaxed mt-2">{entity.descripcion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericDetail;