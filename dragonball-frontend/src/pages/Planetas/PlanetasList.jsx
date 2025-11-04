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
  Globe
} from 'lucide-react';
import { planetaService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import SearchBar from '../../components/UI/SearchBar';

const PlanetasList = () => {
  const [planetas, setPlanetas] = useState([]);
  const [filteredPlanetas, setFilteredPlanetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchPlanetas();
  }, []);

  const fetchPlanetas = async () => {
    try {
      setLoading(true);
      const response = await planetaService.getAll();
      setPlanetas(response.data);
      setFilteredPlanetas(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los planetas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setFilteredPlanetas(planetas);
      return;
    }

    try {
      const response = await planetaService.searchByName(searchTerm);
      setFilteredPlanetas(response.data);
    } catch (err) {
      console.error('Error searching planetas:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este planeta?')) {
      try {
        await planetaService.delete(id);
        // Actualizar la lista inmediatamente
        await fetchPlanetas();
        // También actualizar la lista filtrada removiendo el elemento eliminado
        setFilteredPlanetas(prev => prev.filter(planeta => planeta.id !== id));
      } catch (err) {
        console.error('Error deleting planeta:', err);
        alert('Error al eliminar el planeta');
      }
    }
  };

  const handleRestore = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres restaurar este planeta?')) {
      try {
        if (planetaService.restore) {
          await planetaService.restore(id);
          fetchPlanetas();
        } else {
          alert('La función de restaurar no está disponible para planetas');
        }
      } catch (err) {
        console.error('Error restoring planeta:', err);
        alert('Error al restaurar el planeta');
      }
    }
  };

  if (loading) return <LoadingSpinner size="xl" text="Navegando por la galaxia..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchPlanetas} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl shadow-xl">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-6xl font-black text-white tracking-tight">Planetas</h1>
              <p className="text-2xl text-white/90 font-medium leading-relaxed">
                Explora los mundos del universo Dragon Ball
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/planetas/nuevo" className="bg-white text-blue-700 hover:bg-white/90 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg">
              <Plus className="w-5 h-5" />
              <span>Nuevo Planeta</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8">
        <div className="p-8 space-y-6">
          <SearchBar
            placeholder="Buscar planetas por nombre..."
            onSearch={handleSearch}
            onClear={() => setFilteredPlanetas(planetas)}
          />
        </div>
      </div>

      {/* Planetas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlanetas.map((planeta) => (
          <div key={planeta.id} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 overflow-hidden">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{planeta.nombre}</h3>
                    <p className="text-sm text-gray-500 font-medium">ID: {planeta.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/planetas/${planeta.id}`}
                    className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    title="Ver detalles"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  <Link
                    to={`/planetas/${planeta.id}/editar`}
                    className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(planeta.id)}
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {planeta.sistema && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Sistema: {planeta.sistema}
                  </span>
                </div>
              )}
              
              {planeta.descripcion && (
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {planeta.descripcion}
                  </p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Planeta #{planeta.id}</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Activo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlanetas.length === 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
          <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No se encontraron planetas
          </h3>
          <p className="text-gray-500">
            Intenta ajustar los filtros de búsqueda o crear un nuevo planeta.
          </p>
        </div>
      )}

      {/* Modal Outlet */}
      <Outlet />
    </div>
  );
};

export default PlanetasList;