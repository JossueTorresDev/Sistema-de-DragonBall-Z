import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  RotateCcw, 
  Eye, 
  Filter,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { sagaService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import SearchBar from '../../components/UI/SearchBar';

const SagasList = () => {
  const [sagas, setSagas] = useState([]);
  const [filteredSagas, setFilteredSagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchSagas();
  }, []);

  const fetchSagas = async () => {
    try {
      setLoading(true);
      const response = await sagaService.getAll();
      setSagas(response.data);
      setFilteredSagas(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las sagas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setFilteredSagas(sagas);
      return;
    }

    try {
      const response = await sagaService.search(searchTerm);
      setFilteredSagas(response.data);
    } catch (err) {
      console.error('Error searching sagas:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta saga?')) {
      try {
        await sagaService.delete(id);
        // Actualizar la lista inmediatamente
        await fetchSagas();
        // También actualizar la lista filtrada removiendo el elemento eliminado
        setFilteredSagas(prev => prev.filter(saga => saga.id !== id));
      } catch (err) {
        console.error('Error deleting saga:', err);
        alert('Error al eliminar la saga');
      }
    }
  };

  const handleRestore = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres restaurar esta saga?')) {
      try {
        if (sagaService.restore) {
          await sagaService.restore(id);
          fetchSagas();
        } else {
          alert('La función de restaurar no está disponible para sagas');
        }
      } catch (err) {
        console.error('Error restoring saga:', err);
        alert('Error al restaurar la saga');
      }
    }
  };

  if (loading) return <LoadingSpinner size="xl" text="Recordando las aventuras épicas..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchSagas} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl shadow-xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-6xl font-black text-white tracking-tight">Sagas</h1>
              <p className="text-2xl text-white/90 font-medium leading-relaxed">
                Explora las sagas épicas de Dragon Ball
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/sagas/nueva" className="bg-white text-blue-700 hover:bg-white/90 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg">
              <Plus className="w-5 h-5" />
              <span>Nueva Saga</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8">
        <div className="p-8 space-y-6">
          <SearchBar
            placeholder="Buscar sagas por nombre..."
            onSearch={handleSearch}
            onClear={() => setFilteredSagas(sagas)}
          />
        </div>
      </div>

      {/* Sagas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSagas.map((saga) => (
          <div key={saga.id} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 overflow-hidden">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{saga.nombre}</h3>
                    <p className="text-sm text-gray-500 font-medium">ID: {saga.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/sagas/${saga.id}`}
                    className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    title="Ver detalles"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  <Link
                    to={`/sagas/${saga.id}/editar`}
                    className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(saga.id)}
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {saga.descripcion && (
                <div className="space-y-3 mb-4">
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {saga.descripcion}
                  </p>
                </div>
              )}

              {(saga.fechaInicio || saga.fechaFin) && (
                <div className="space-y-2 mb-4">
                  {saga.fechaInicio && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="font-medium">Inicio:</span>
                      <span>{new Date(saga.fechaInicio).toLocaleDateString()}</span>
                    </div>
                  )}
                  {saga.fechaFin && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="font-medium">Fin:</span>
                      <span>{new Date(saga.fechaFin).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Saga #{saga.id}</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Activa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSagas.length === 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No se encontraron sagas
          </h3>
          <p className="text-gray-500">
            Intenta ajustar los filtros de búsqueda o crear una nueva saga.
          </p>
        </div>
      )}

      {/* Modal Outlet */}
      <Outlet />
    </div>
  );
};

export default SagasList;