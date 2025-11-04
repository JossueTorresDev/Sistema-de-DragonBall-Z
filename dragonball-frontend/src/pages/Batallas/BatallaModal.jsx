import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Activity, Calendar, MapPin } from 'lucide-react';
import { batallaService, sagaService } from '../../services/api';
import Modal from '../../components/UI/Modal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';

const BatallaModal = ({ mode = 'view' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === 'edit';
  const isCreate = mode === 'create';

  const [batalla, setBatalla] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    sagaId: '',
    ubicacion: '',
    fecha: '',
    resultado: ''
  });

  const [sagas, setSagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(isEdit || isCreate);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const sagasRes = await sagaService.getAll();
      setSagas(sagasRes.data);

      if (id && !isCreate) {
        const batallaRes = await batallaService.getById(id);
        const batallaData = batallaRes.data;
        setBatalla(batallaData);
        setFormData({
          nombre: batallaData.nombre || '',
          sagaId: batallaData.saga?.id || '',
          ubicacion: batallaData.ubicacion || '',
          fecha: batallaData.fecha ? batallaData.fecha.split('T')[0] : '',
          resultado: batallaData.resultado || ''
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

  const handleClose = () => {
    navigate('/batallas');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      const data = {
        nombre: formData.nombre,
        saga: formData.sagaId ? { id: parseInt(formData.sagaId) } : null,
        ubicacion: formData.ubicacion || null,
        fecha: formData.fecha || null,
        resultado: formData.resultado || null
      };

      if (isCreate) {
        await batallaService.create(data);
      } else {
        await batallaService.update(id, data);
      }

      handleClose();
    } catch (err) {
      setError('Error al guardar el combate');
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

  const getTitle = () => {
    if (isCreate) return 'Nuevo Combate';
    if (editMode) return `Editar: ${batalla?.nombre || 'Combate'}`;
    return batalla?.nombre || 'Combate';
  };

  if (loading) {
    return (
      <Modal isOpen={true} onClose={handleClose} title="Cargando..." size="md">
        <LoadingSpinner size="lg" text="Iniciando el combate..." />
      </Modal>
    );
  }

  return (
    <Modal 
      isOpen={true} 
      onClose={handleClose} 
      title={getTitle()}
      size="lg"
    >
      <div className="p-6">
        {error && (
          <ErrorMessage message={error} onRetry={() => setError(null)} showRetry={false} />
        )}

        {/* View Mode */}
        {!editMode && batalla && (
          <div className="space-y-8">
            {/* Header del Combate */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-black mb-2">{batalla.nombre}</h2>
                  <p className="text-xl text-white/90">Combate Épico</p>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Nombre</label>
                <p className="text-2xl font-bold text-gray-900 mt-2">{batalla.nombre}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Saga</label>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {batalla.saga?.nombre || 'N/A'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Ubicación</label>
                <div className="flex items-center space-x-3 mt-2">
                  <MapPin className="w-6 h-6 text-gray-500" />
                  <p className="text-2xl font-bold text-gray-900">
                    {batalla.ubicacion || 'N/A'}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Fecha</label>
                <div className="flex items-center space-x-3 mt-2">
                  <Calendar className="w-6 h-6 text-gray-500" />
                  <p className="text-2xl font-bold text-gray-900">
                    {batalla.fecha ? new Date(batalla.fecha).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Participantes */}
            {batalla.participantes && batalla.participantes.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">Participantes</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {batalla.participantes.map((participante) => (
                    <span key={participante.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {participante.nombre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Resultado */}
            {batalla.resultado && (
              <div>
                <label className="text-sm font-medium text-gray-500">Resultado</label>
                <p className="text-gray-700 leading-relaxed mt-2">{batalla.resultado}</p>
              </div>
            )}
          </div>
        )}

        {/* Edit/Create Mode */}
        {editMode && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="md:col-span-2">
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
                  placeholder="Nombre del combate"
                />
              </div>

              {/* Saga */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saga
                </label>
                <select
                  name="sagaId"
                  value={formData.sagaId}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Seleccionar saga</option>
                  {sagas.map(saga => (
                    <option key={saga.id} value={saga.id}>
                      {saga.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ubicación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Lugar del combate"
                />
              </div>

              {/* Fecha */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              {/* Resultado */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resultado
                </label>
                <textarea
                  name="resultado"
                  value={formData.resultado}
                  onChange={handleChange}
                  rows={4}
                  className="input-field"
                  placeholder="Resultado del combate..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
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
                    <span>{isCreate ? 'Crear' : 'Actualizar'} Combate</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default BatallaModal;