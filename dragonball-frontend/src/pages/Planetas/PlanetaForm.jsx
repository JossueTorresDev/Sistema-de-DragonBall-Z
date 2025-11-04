import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { planetaService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';

const PlanetaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    nombre: '',
    sistema: '',
    descripcion: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchPlaneta();
    }
  }, [id, isEdit]);

  const fetchPlaneta = async () => {
    try {
      setLoading(true);
      const response = await planetaService.getById(id);
      const planeta = response.data;
      setFormData({
        nombre: planeta.nombre || '',
        sistema: planeta.sistema || '',
        descripcion: planeta.descripcion || ''
      });
      setError(null);
    } catch (err) {
      setError('Error al cargar el planeta');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      if (isEdit) {
        await planetaService.update(id, formData);
      } else {
        await planetaService.create(formData);
      }

      navigate('/planetas');
    } catch (err) {
      setError('Error al guardar el planeta');
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

  if (loading) return <LoadingSpinner size="xl" text="Creando nuevo mundo..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/planetas"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Editar Planeta' : 'Nuevo Planeta'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Modifica los datos del planeta' : 'Añade un nuevo planeta al archivo'}
          </p>
        </div>
      </div>

      {error && (
        <ErrorMessage message={error} onRetry={() => setError(null)} showRetry={false} />
      )}

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-6">
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
                placeholder="Nombre del planeta"
              />
            </div>

            {/* Sistema */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sistema
              </label>
              <input
                type="text"
                name="sistema"
                value={formData.sistema}
                onChange={handleChange}
                className="input-field"
                placeholder="Sistema solar del planeta"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="input-field"
                placeholder="Descripción del planeta..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link
              to="/planetas"
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
                  <span>{isEdit ? 'Actualizar' : 'Crear'} Planeta</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanetaForm;