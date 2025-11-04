import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Save, TrendingUp, Users, Globe, Zap } from 'lucide-react';
import { personajeService, razaService, planetaService } from '../../services/api';
import Modal from '../../components/UI/Modal';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';

const PersonajeModal = ({ mode = 'view' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === 'edit';
  const isCreate = mode === 'create';
  const isView = mode === 'view';

  const [personaje, setPersonaje] = useState(null);
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
  const [editMode, setEditMode] = useState(isEdit || isCreate);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const promises = [razaService.getAll(), planetaService.getAll()];
      
      if (id && !isCreate) {
        promises.push(personajeService.getById(id));
      }

      const responses = await Promise.all(promises);
      setRazas(responses[0].data);
      setPlanetas(responses[1].data);

      if (responses[2]) {
        const personajeData = responses[2].data;
        setPersonaje(personajeData);
        setFormData({
          nombre: personajeData.nombre || '',
          razaId: personajeData.raza?.id || '',
          planetaId: personajeData.planeta?.id || '',
          nivelPoder: personajeData.nivelPoder || '',
          afiliacion: personajeData.afiliacion || '',
          descripcion: personajeData.descripcion || ''
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
    navigate('/personajes');
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

      if (isCreate) {
        await personajeService.create(data);
      } else {
        await personajeService.update(id, data);
      }

      handleClose();
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

  const getTitle = () => {
    if (isCreate) return 'Nuevo Guerrero';
    if (editMode) return `Editar: ${personaje?.nombre || 'Guerrero'}`;
    return personaje?.nombre || 'Guerrero';
  };

  if (loading) {
    return (
      <Modal isOpen={true} onClose={handleClose} title="Cargando..." size="md">
        <LoadingSpinner size="lg" text="Invocando al guerrero..." />
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
        {!editMode && personaje && (
          <div className="space-y-8">
            {/* Header del Personaje */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-black mb-2">{personaje.nombre}</h2>
                  <p className="text-xl text-white/90">{personaje.raza?.nombre} • {personaje.afiliacion}</p>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Nombre</label>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{personaje.nombre}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Nivel de Poder</label>
                  <div className="flex items-center space-x-3 mt-2">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    <p className="text-2xl font-bold text-gray-900">
                      {personaje.nivelPoder?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Afiliación</label>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {personaje.afiliacion || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Raza</label>
                  <div className="flex items-center space-x-3 mt-2">
                    <Zap className="w-6 h-6 text-purple-500" />
                    <p className="text-2xl font-bold text-gray-900">
                      {personaje.raza?.nombre || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Planeta</label>
                  <div className="flex items-center space-x-3 mt-2">
                    <Globe className="w-6 h-6 text-green-500" />
                    <p className="text-2xl font-bold text-gray-900">
                      {personaje.planeta?.nombre || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {personaje.descripcion && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <label className="text-sm font-bold text-blue-600 uppercase tracking-wide">Descripción</label>
                <p className="text-gray-700 leading-relaxed mt-3 text-lg">{personaje.descripcion}</p>
              </div>
            )}

            {/* Techniques and Transformations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {personaje.tecnicas && personaje.tecnicas.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-blue-600 mb-6 uppercase tracking-wide">Artes Marciales</h3>
                  <div className="space-y-4">
                    {personaje.tecnicas.map((tecnica) => (
                      <div key={tecnica.id} className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <p className="font-bold text-gray-900 text-lg">{tecnica.nombre}</p>
                        {tecnica.tipo && (
                          <p className="text-blue-600 font-medium">{tecnica.tipo}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {personaje.transformaciones && personaje.transformaciones.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-blue-600 mb-6 uppercase tracking-wide">Transformaciones</h3>
                  <div className="space-y-4">
                    {personaje.transformaciones.map((transformacion) => (
                      <div key={transformacion.id} className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <p className="font-bold text-gray-900 text-lg">{transformacion.nombre}</p>
                        {transformacion.multiplicadorPoder && (
                          <p className="text-blue-600 font-medium">
                            Multiplicador: x{transformacion.multiplicadorPoder}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit/Create Mode */}
        {editMode && (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                    <span>{isCreate ? 'Crear' : 'Actualizar'} Guerrero</span>
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

export default PersonajeModal;