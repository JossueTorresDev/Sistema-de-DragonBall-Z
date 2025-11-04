import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Sparkles } from 'lucide-react';
import { transformacionService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import SearchBar from '../../components/UI/SearchBar';

const TransformacionesList = () => {
  const [transformaciones, setTransformaciones] = useState([]);
  const [filteredTransformaciones, setFilteredTransformaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransformaciones();
  }, []);

  const fetchTransformaciones = async () => {
    try {
      setLoading(true);
      const response = await transformacionService.getAll();
      setTransformaciones(response.data);
      setFilteredTransformaciones(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las transformaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setFilteredTransformaciones(transformaciones);
      return;
    }

    try {
      const response = await transformacionService.search(searchTerm);
      setFilteredTransformaciones(response.data);
    } catch (err) {
      console.error('Error searching transformaciones:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta transformación?')) {
      try {
        await transformacionService.delete(id);
        fetchTransformaciones();
      } catch (err) {
        console.error('Error deleting transformacion:', err);
      }
    }
  };

  if (loading) return <LoadingSpinner size="xl" text="Despertando nuevos poderes..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchTransformaciones} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Transformaciones</h1>
              <p className="text-white/90 mt-1 text-lg">
                Explora las transformaciones más poderosas
              </p>
            </div>
          </div>
          <Link to="/transformaciones/nueva" className="bg-white text-blue-700 hover:bg-white/90 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg mt-4 sm:mt-0">
            <Plus className="w-5 h-5" />
            <span>Nueva Transformación</span>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="p-6">
          <SearchBar
            placeholder="Buscar transformaciones por nombre..."
            onSearch={handleSearch}
            onClear={() => setFilteredTransformaciones(transformaciones)}
          />
        </div>
      </div>

      {/* Transformaciones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTransformaciones.map((transformacion) => (
          <div key={transformacion.id} className="card hover:shadow-xl transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{transformacion.nombre}</h3>
                    <p className="text-sm text-gray-500">ID: {transformacion.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/transformaciones/${transformacion.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/transformaciones/${transformacion.id}/editar`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(transformacion.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {transformacion.multiplicadorPoder && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Multiplicador:</span>
                    <span className="font-semibold text-yellow-600">
                      x{transformacion.multiplicadorPoder}
                    </span>
                  </div>
                </div>
              )}
              
              {transformacion.descripcion && (
                <p className="text-gray-600 text-sm line-clamp-3">
                  {transformacion.descripcion}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTransformaciones.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron transformaciones</p>
        </div>
      )}

      {/* Modal Outlet */}
      <Outlet />
    </div>
  );
};

export default TransformacionesList;