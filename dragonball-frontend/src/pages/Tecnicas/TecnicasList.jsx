import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Sword, Filter } from 'lucide-react';
import { tecnicaService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import SearchBar from '../../components/UI/SearchBar';

const TecnicasList = () => {
  const [tecnicas, setTecnicas] = useState([]);
  const [filteredTecnicas, setFilteredTecnicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipoFilter, setTipoFilter] = useState('');

  useEffect(() => {
    fetchTecnicas();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tecnicas, tipoFilter]);

  const fetchTecnicas = async () => {
    try {
      setLoading(true);
      const response = await tecnicaService.getAll();
      setTecnicas(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las técnicas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tecnicas];
    
    if (tipoFilter) {
      filtered = filtered.filter(t => 
        t.tipo?.toLowerCase().includes(tipoFilter.toLowerCase())
      );
    }
    
    setFilteredTecnicas(filtered);
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      applyFilters();
      return;
    }

    try {
      const response = await tecnicaService.searchByName(searchTerm);
      setFilteredTecnicas(response.data);
    } catch (err) {
      console.error('Error searching tecnicas:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta técnica?')) {
      try {
        await tecnicaService.delete(id);
        fetchTecnicas();
      } catch (err) {
        console.error('Error deleting tecnica:', err);
      }
    }
  };

  const getTipoColor = (tipo) => {
    const colors = {
      'Ataque': 'bg-red-100 text-red-800',
      'Defensa': 'bg-blue-100 text-blue-800',
      'Especial': 'bg-purple-100 text-purple-800',
      'Ki': 'bg-yellow-100 text-yellow-800',
      'Transformación': 'bg-green-100 text-green-800'
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <LoadingSpinner size="xl" text="Dominando las artes marciales..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchTecnicas} />;

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
              <h1 className="text-4xl font-black text-white">Artes Marciales</h1>
              <p className="text-white/90 mt-1 text-lg">
                Descubre las artes marciales más poderosas del universo
              </p>
            </div>
          </div>
          <Link to="/tecnicas/nueva" className="bg-white text-blue-700 hover:bg-white/90 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg mt-4 sm:mt-0">
            <Plus className="w-5 h-5" />
            <span>Nueva Técnica</span>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="p-6 space-y-4">
          <SearchBar
            placeholder="Buscar técnicas por nombre..."
            onSearch={handleSearch}
            onClear={() => applyFilters()}
          />
          
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Filtrar por tipo..."
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="input-field max-w-xs"
            />
            <button
              onClick={() => setTipoFilter('')}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Técnicas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTecnicas.map((tecnica) => (
          <div key={tecnica.id} className="card hover:shadow-xl transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Sword className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tecnica.nombre}</h3>
                    <p className="text-sm text-gray-500">ID: {tecnica.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/tecnicas/${tecnica.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/tecnicas/${tecnica.id}/editar`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(tecnica.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {tecnica.tipo && (
                <div className="mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(tecnica.tipo)}`}>
                    {tecnica.tipo}
                  </span>
                </div>
              )}
              
              {tecnica.descripcion && (
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {tecnica.descripcion}
                </p>
              )}
              
              {tecnica.nivelPoder && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Nivel de Poder:</span>
                  <span className="font-semibold text-gray-900">
                    {tecnica.nivelPoder.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTecnicas.length === 0 && (
        <div className="text-center py-12">
          <Sword className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron técnicas</p>
        </div>
      )}

      {/* Modal Outlet */}
      <Outlet />
    </div>
  );
};

export default TecnicasList;