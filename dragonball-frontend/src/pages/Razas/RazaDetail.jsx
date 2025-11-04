import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Zap } from 'lucide-react';
import { razaService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';

const RazaDetail = () => {
  const { id } = useParams();
  const [raza, setRaza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRaza();
  }, [id]);

  const fetchRaza = async () => {
    try {
      setLoading(true);
      const response = await razaService.getById(id);
      setRaza(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar la raza');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner size="xl" text="Estudiando la especie..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchRaza} />;
  if (!raza) return <ErrorMessage message="Raza no encontrada" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/razas"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{raza.nombre}</h1>
              <p className="text-gray-600">Detalles de la Raza</p>
            </div>
          </div>
        </div>
        <Link
          to={`/razas/${id}/editar`}
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
            <div>
              <label className="text-sm font-medium text-gray-500">Nombre</label>
              <p className="text-lg font-semibold text-gray-900">{raza.nombre}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">ID</label>
              <p className="text-lg font-semibold text-gray-900">{raza.id}</p>
            </div>
          </div>
          
          {raza.descripcion && (
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-500">Descripción</label>
              <p className="text-gray-700 leading-relaxed mt-2">{raza.descripcion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RazaDetail;