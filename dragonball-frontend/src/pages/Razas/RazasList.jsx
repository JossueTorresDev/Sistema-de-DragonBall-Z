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
  Zap
} from 'lucide-react';
import { razaService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import SearchBar from '../../components/UI/SearchBar';

const RazasList = () => {
  const [razas, setRazas] = useState([]);
  const [filteredRazas, setFilteredRazas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchRazas();
  }, []);

  const fetchRazas = async () => {
    try {
      setLoading(true);
      const response = await razaService.getAll();
      setRazas(response.data);
      setFilteredRazas(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las razas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setFilteredRazas(razas);
      return;
    }

    try {
      const response = await razaService.search(searchTerm);
      setFilteredRazas(response.data);
    } catch (err) {
      console.error('Error searching razas:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta raza?')) {
      try {
        await razaService.delete(id);
        // Actualizar la lista inmediatamente
        await fetchRazas();
        // También actualizar la lista filtrada removiendo el elemento eliminado
        setFilteredRazas(prev => prev.filter(raza => raza.id !== id));
      } catch (err) {
        console.error('Error deleting raza:', err);
        alert('Error al eliminar la raza');
      }
    }
  };

  const handleRestore = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres restaurar esta raza?')) {
      try {
        if (razaService.restore) {
          await razaService.restore(id);
          fetchRazas();
        } else {
          alert('La función de restaurar no está disponible para razas');
        }
      } catch (err) {
        console.error('Error restoring raza:', err);
        alert('Error al restaurar la raza');
      }
    }
  };

  if (loading) return <LoadingSpinner size="xl" text="Explorando las especies del universo..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchRazas} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl shadow-xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-6xl font-black text-white tracking-tight">Razas</h1>
              <p className="text-2xl text-white/90 font-medium leading-relaxed">
                Gestiona las especies del universo Dragon Ball
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/razas/nueva" className="bg-white text-blue-700 hover:bg-white/90 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg">
              <Plus className="w-5 h-5" />
              <span>Nueva Raza</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8">
        <div className="p-8 space-y-6">
          <SearchBar
            placeholder="Buscar razas por nombre..."
            onSearch={handleSearch}
            onClear={() => setFilteredRazas(razas)}
          />
        </div>
      </div>

      {/* Razas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRazas.map((raza) => (
          <div key={raza.id} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 overflow-hidden">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{raza.nombre}</h3>
                    <p className="text-sm text-gray-500 font-medium">ID: {raza.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 bg-gray-50 rounded-xl p-1">
                  <Link
                    to={`/razas/${raza.id}`}
                    className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200"
                    title="Ver detalles"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/razas/${raza.id}/editar`}
                    className="p-2 text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg transition-all duration-200"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(raza.id)}
                    className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {raza.descripcion && (
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {raza.descripcion}
                  </p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Raza #{raza.id}</span>
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

      {filteredRazas.length === 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
          <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No se encontraron razas
          </h3>
          <p className="text-gray-500">
            Intenta ajustar los filtros de búsqueda o crear una nueva raza.
          </p>
        </div>
      )}

      {/* Modal Outlet */}
      <Outlet />
    </div>
  );
};

export default RazasList;