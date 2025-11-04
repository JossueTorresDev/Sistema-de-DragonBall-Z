import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Sword, Calendar, MapPin } from 'lucide-react';
import { batallaService, sagaService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import SearchBar from '../../components/UI/SearchBar';

const BatallasList = () => {
  const [batallas, setBatallas] = useState([]);
  const [filteredBatallas, setFilteredBatallas] = useState([]);
  const [sagas, setSagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sagaFilter, setSagaFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [batallas, sagaFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [batallasRes, sagasRes] = await Promise.all([
        batallaService.getAll(),
        sagaService.getAll()
      ]);
      setBatallas(batallasRes.data);
      setSagas(sagasRes.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las batallas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...batallas];
    
    if (sagaFilter) {
      filtered = filtered.filter(b => b.saga?.id === parseInt(sagaFilter));
    }
    
    setFilteredBatallas(filtered);
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      applyFilters();
      return;
    }

    try {
      const response = await batallaService.searchByName(searchTerm);
      setFilteredBatallas(response.data);
    } catch (err) {
      console.error('Error searching batallas:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta batalla?')) {
      try {
        await batallaService.delete(id);
        fetchData();
      } catch (err) {
        console.error('Error deleting batalla:', err);
      }
    }
  };

  if (loading) return <LoadingSpinner size="xl" text="Preparando el campo de batalla..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Sword className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Combates</h1>
              <p className="text-white/90 mt-1 text-lg">
                Revive los combates épicos del universo Dragon Ball
              </p>
            </div>
          </div>
          <Link to="/batallas/nueva" className="bg-white text-blue-700 hover:bg-white/90 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg mt-4 sm:mt-0">
            <Plus className="w-5 h-5" />
            <span>Nueva Batalla</span>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="p-6 space-y-4">
          <SearchBar
            placeholder="Buscar combates por nombre..."
            onSearch={handleSearch}
            onClear={() => applyFilters()}
          />
          
          <div className="flex items-center space-x-4">
            <select
              value={sagaFilter}
              onChange={(e) => setSagaFilter(e.target.value)}
              className="input-field max-w-xs"
            >
              <option value="">Todas las sagas</option>
              {sagas.map(saga => (
                <option key={saga.id} value={saga.id}>{saga.nombre}</option>
              ))}
            </select>
            <button
              onClick={() => setSagaFilter('')}
              className="btn-secondary"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Batallas List */}
      <div className="space-y-4">
        {filteredBatallas.map((batalla) => (
          <div key={batalla.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sword className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{batalla.nombre}</h3>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                      {batalla.saga && (
                        <div className="flex items-center space-x-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {batalla.saga.nombre}
                          </span>
                        </div>
                      )}
                      
                      {batalla.ubicacion && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{batalla.ubicacion}</span>
                        </div>
                      )}
                      
                      {batalla.fecha && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(batalla.fecha).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {batalla.participantes && batalla.participantes.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Participantes:</p>
                        <div className="flex flex-wrap gap-1">
                          {batalla.participantes.slice(0, 5).map((participante) => (
                            <span key={participante.id} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                              {participante.nombre}
                            </span>
                          ))}
                          {batalla.participantes.length > 5 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                              +{batalla.participantes.length - 5} más
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {batalla.resultado && (
                      <p className="text-gray-600 text-sm line-clamp-2">{batalla.resultado}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Link
                    to={`/batallas/${batalla.id}`}
                    className="text-blue-600 hover:text-blue-900 p-2"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/batallas/${batalla.id}/editar`}
                    className="text-indigo-600 hover:text-indigo-900 p-2"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(batalla.id)}
                    className="text-red-600 hover:text-red-900 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBatallas.length === 0 && (
        <div className="text-center py-12">
          <Sword className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron batallas</p>
        </div>
      )}

      {/* Modal Outlet */}
      <Outlet />
    </div>
  );
};

export default BatallasList;