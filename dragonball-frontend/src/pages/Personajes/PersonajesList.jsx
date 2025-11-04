import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  RotateCcw, 
  Eye, 
  Filter,
  TrendingUp,
  Users
} from 'lucide-react';
import { personajeService, razaService, planetaService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import SearchBar from '../../components/UI/SearchBar';

const PersonajesList = () => {
  const location = useLocation();
  const [personajes, setPersonajes] = useState([]);
  const [filteredPersonajes, setFilteredPersonajes] = useState([]);
  const [razas, setRazas] = useState([]);
  const [planetas, setPlanetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const [filters, setFilters] = useState({
    raza: '',
    planeta: '',
    afiliacion: ''
  });

  useEffect(() => {
    fetchData();
  }, [showDeleted]);

  useEffect(() => {
    applyFilters();
  }, [personajes, filters]);

  // Actualizar la lista cuando se regrese a esta página
  useEffect(() => {
    // Si estamos en la ruta principal de personajes (sin modal), actualizar
    if (location.pathname === '/personajes') {
      fetchData();
    }
  }, [location.pathname, showDeleted]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [personajesRes, razasRes, planetasRes] = await Promise.all([
        showDeleted ? personajeService.getDeleted() : personajeService.getAll(),
        razaService.getAll(),
        planetaService.getAll()
      ]);

      setPersonajes(personajesRes.data);
      setRazas(razasRes.data);
      setPlanetas(planetasRes.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los personajes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...personajes];

    if (filters.raza) {
      filtered = filtered.filter(p => p.raza?.id === parseInt(filters.raza));
    }
    if (filters.planeta) {
      filtered = filtered.filter(p => p.planeta?.id === parseInt(filters.planeta));
    }
    if (filters.afiliacion) {
      filtered = filtered.filter(p => 
        p.afiliacion?.toLowerCase().includes(filters.afiliacion.toLowerCase())
      );
    }

    setFilteredPersonajes(filtered);
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setFilteredPersonajes(personajes);
      return;
    }

    try {
      const response = await personajeService.searchByName(searchTerm);
      setFilteredPersonajes(response.data);
    } catch (err) {
      console.error('Error searching personajes:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este personaje?')) {
      try {
        await personajeService.delete(id);
        fetchData();
      } catch (err) {
        console.error('Error deleting personaje:', err);
      }
    }
  };

  const handleRestore = async (id) => {
    try {
      await personajeService.restore(id);
      fetchData();
    } catch (err) {
      console.error('Error restoring personaje:', err);
    }
  };

  const clearFilters = () => {
    setFilters({ raza: '', planeta: '', afiliacion: '' });
  };

  if (loading) return <LoadingSpinner size="xl" text="Reuniendo a los guerreros más poderosos..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Guerreros</h1>
              <p className="text-white/90 mt-1 text-lg">
                Gestiona los guerreros del universo Dragon Ball
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              onClick={() => setShowDeleted(!showDeleted)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                showDeleted 
                  ? 'bg-white/20 text-white hover:bg-white/30' 
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Trash2 className="w-5 h-5" />
              <span>{showDeleted ? 'Ver Activos' : 'Ver Eliminados'}</span>
            </button>
            <Link to="/personajes/nuevo" className="bg-white text-blue-700 hover:bg-white/90 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg">
              <Plus className="w-5 h-5" />
              <span>Nuevo Guerrero</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8">
        <div className="p-8 space-y-6">
          <SearchBar
            placeholder="Buscar guerreros por nombre..."
            onSearch={handleSearch}
            onClear={() => setFilteredPersonajes(personajes)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.raza}
              onChange={(e) => setFilters({...filters, raza: e.target.value})}
              className="input-field"
            >
              <option value="">Todas las razas</option>
              {razas.map(raza => (
                <option key={raza.id} value={raza.id}>{raza.nombre}</option>
              ))}
            </select>

            <select
              value={filters.planeta}
              onChange={(e) => setFilters({...filters, planeta: e.target.value})}
              className="input-field"
            >
              <option value="">Todos los planetas</option>
              {planetas.map(planeta => (
                <option key={planeta.id} value={planeta.id}>{planeta.nombre}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Filtrar por afiliación"
              value={filters.afiliacion}
              onChange={(e) => setFilters({...filters, afiliacion: e.target.value})}
              className="input-field"
            />

            <button
              onClick={clearFilters}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 font-semibold uppercase tracking-wide text-sm">Total Guerreros</p>
              <p className="text-4xl font-black mt-2">{filteredPersonajes.length}</p>
            </div>
            <Users className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 font-semibold uppercase tracking-wide text-sm">Poder Promedio</p>
              <p className="text-4xl font-black mt-2">
                {filteredPersonajes.length > 0 
                  ? Math.round(filteredPersonajes.reduce((sum, p) => sum + (p.nivelPoder || 0), 0) / filteredPersonajes.length).toLocaleString()
                  : 0
                }
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 font-semibold uppercase tracking-wide text-sm">Más Poderoso</p>
              <p className="text-2xl font-black mt-2">
                {filteredPersonajes.length > 0 
                  ? filteredPersonajes.reduce((max, p) => (p.nivelPoder || 0) > (max.nivelPoder || 0) ? p : max, filteredPersonajes[0])?.nombre || 'N/A'
                  : 'N/A'
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">👑</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personajes List */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Personaje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Raza
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Planeta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nivel de Poder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Afiliación
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPersonajes.map((personaje) => (
                <tr key={personaje.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{personaje.nombre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {personaje.raza?.nombre || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {personaje.planeta?.nombre || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900">
                        {personaje.nivelPoder?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {personaje.afiliacion || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/personajes/${personaje.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      {!showDeleted && (
                        <>
                          <Link
                            to={`/personajes/${personaje.id}/editar`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(personaje.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {showDeleted && (
                        <button
                          onClick={() => handleRestore(personaje.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredPersonajes.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No se encontraron personajes</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Outlet */}
      <Outlet />
    </div>
  );
};

export default PersonajesList;