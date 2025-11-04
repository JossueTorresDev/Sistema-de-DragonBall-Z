import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, TrendingUp, Users, Globe, Zap } from 'lucide-react';
import { personajeService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';

const PersonajeDetail = () => {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPersonaje();
  }, [id]);

  const fetchPersonaje = async () => {
    try {
      setLoading(true);
      const response = await personajeService.getById(id);
      setPersonaje(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar el guerrero');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner size="xl" text="Analizando el poder del guerrero..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchPersonaje} />;
  if (!personaje) return <ErrorMessage message="Guerrero no encontrado" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/personajes"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{personaje.nombre}</h1>
            <p className="text-gray-600">Detalles del Guerrero</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to={`/personajes/${id}/editar`}
            className="btn-primary flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Editar</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Información General</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre</label>
                  <p className="text-lg font-semibold text-gray-900">{personaje.nombre}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nivel de Poder</label>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <p className="text-lg font-semibold text-gray-900">
                      {personaje.nivelPoder?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Raza</label>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <p className="text-lg font-semibold text-gray-900">
                      {personaje.raza?.nombre || 'N/A'}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Planeta</label>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-green-500" />
                    <p className="text-lg font-semibold text-gray-900">
                      {personaje.planeta?.nombre || 'N/A'}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Afiliación</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {personaje.afiliacion || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {personaje.descripcion && (
            <div className="card">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">{personaje.descripcion}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Techniques */}
          {personaje.tecnicas && personaje.tecnicas.length > 0 && (
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Artes Marciales</h3>
                <div className="space-y-2">
                  {personaje.tecnicas.map((tecnica) => (
                    <div key={tecnica.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{tecnica.nombre}</p>
                      {tecnica.tipo && (
                        <p className="text-sm text-gray-600">{tecnica.tipo}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Transformations */}
          {personaje.transformaciones && personaje.transformaciones.length > 0 && (
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transformaciones</h3>
                <div className="space-y-2">
                  {personaje.transformaciones.map((transformacion) => (
                    <div key={transformacion.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{transformacion.nombre}</p>
                      {transformacion.multiplicadorPoder && (
                        <p className="text-sm text-gray-600">
                          Multiplicador: x{transformacion.multiplicadorPoder}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonajeDetail;