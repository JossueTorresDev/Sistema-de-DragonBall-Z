import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { personajeService, razaService, planetaService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';

const PersonajeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    nombre: '',
    razaId: '',
    planetaId: '',
    nivelPoder: '',
    afiliacion: '',
    descripcion: ''
  });

  const [razas, setRazas] = useState([]);
  const [planetas, setPlanetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [razasRes, planetasRes] = await Promise.all([
        razaService.getAll(),
        planetaService.getAll()
      ]);

      setRazas(razasRes.data);
      setPlanetas(planetasRes.data);

      if (isEdit) {
        const personajeRes = await personajeService.getById(id);
        const personaje = personajeRes.data;
        setFormData({
          nombre: personaje.nombre || '',
          razaId: personaje.raza?.id || '',
          planetaId: personaje.planeta?.id || '',
          nivelPoder: personaje.nivelPoder || '',
          afiliacion: personaje.afiliacion || '',
          descripcion: personaje.descripcion || ''
        });
      }

      setError(null);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      const data = {
        nombre: formData.nombre,
        raza: formData.razaId ? { id: parseInt(formData.razaId) } : null,
        planeta: formData.planetaId ? { id: parseInt(formData.planetaId) } : null,
        nivelPoder: formData.nivelPoder ? parseInt(formData.nivelPoder) : null,
        afiliacion: formData.afiliacion || null,
        descripcion: formData.descripcion || null
      };

      if (isEdit) {
        await personajeService.update(id, data);
      } else {
        await personajeService.create(data);
      }

      navigate('/personajes');
    } catch (err) {
      setError('Error al guardar el guerrero');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <LoadingSpinner size="xl" text="Preparando el entrenamiento..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/personajes"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Editar Guerrero' : 'Nuevo Guerrero'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Modifica los datos del guerrero' : 'Añade un nuevo guerrero al archivo'}
          </p>
        </div>
      </div>

      {error && (
        <ErrorMessage message={error} onRetry={() => setError(null)} showRetry={false} />
      )}

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Nombre del guerrero"
              />
            </div>

            {/* Nivel de Poder */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel de Poder
              </label>
              <input
                type="number"
                name="nivelPoder"
                value={formData.nivelPoder}
                onChange={handleChange}
                className="input-field"
                placeholder="Ej: 9000"
              />
            </div>

            {/* Raza */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raza
              </label>
              <select
                name="razaId"
                value={formData.razaId}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Seleccionar raza</option>
                {razas.map(raza => (
                  <option key={raza.id} value={raza.id}>
                    {raza.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Planeta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Planeta
              </label>
              <select
                name="planetaId"
                value={formData.planetaId}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Seleccionar planeta</option>
                {planetas.map(planeta => (
                  <option key={planeta.id} value={planeta.id}>
                    {planeta.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Afiliación */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Afiliación
              </label>
              <input
                type="text"
                name="afiliacion"
                value={formData.afiliacion}
                onChange={handleChange}
                className="input-field"
                placeholder="Ej: Guerreros Z, Saiyans, etc."
              />
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="input-field"
                placeholder="Descripción del guerrero..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link
              to="/personajes"
              className="btn-secondary"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEdit ? 'Actualizar' : 'Crear'} Guerrero</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonajeForm;