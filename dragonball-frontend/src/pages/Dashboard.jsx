import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Zap, 
  Globe, 
  BookOpen,
  TrendingUp,
  Activity
} from 'lucide-react';
import { personajeService, razaService, planetaService, sagaService } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState({
    personajes: 0,
    razas: 0,
    planetas: 0,
    sagas: 0
  });
  const [topPersonajes, setTopPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [personajesRes, razasRes, planetasRes, sagasRes, topPersonajesRes] = await Promise.all([
          personajeService.getAll(),
          razaService.getAll(),
          planetaService.getAll(),
          sagaService.getAll(),
          personajeService.getOrderedByPower()
        ]);

        setStats({
          personajes: personajesRes.data.length,
          razas: razasRes.data.length,
          planetas: planetasRes.data.length,
          sagas: sagasRes.data.length
        });

        setTopPersonajes(topPersonajesRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Personajes',
      value: stats.personajes,
      icon: Users,
      color: 'bg-blue-500',
      link: '/personajes'
    },
    {
      title: 'Razas',
      value: stats.razas,
      icon: Zap,
      color: 'bg-blue-600',
      link: '/razas'
    },
    {
      title: 'Planetas',
      value: stats.planetas,
      icon: Globe,
      color: 'bg-blue-700',
      link: '/planetas'
    },
    {
      title: 'Sagas',
      value: stats.sagas,
      icon: BookOpen,
      color: 'bg-blue-800',
      link: '/sagas'
    }
  ];



  if (loading) {
    return <LoadingSpinner size="xl" text="Preparando el archivo de Shenron..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        {/* Título, icono y descripción con fondo azul */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 text-left">
          <div className="flex items-center space-x-6 mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl shadow-xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-black text-white tracking-tight">
              Shenron's Archive
            </h1>
          </div>
          <p className="text-2xl text-white/90 font-medium leading-relaxed ml-26">
            Explora los secretos del universo con el archivo sagrado del Dragón Eterno
          </p>
        </div>
      </div>





      {/* Estadísticas Detalladas */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Estadísticas Detalladas</h3>
          <Activity className="w-6 h-6 text-blue-600" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const maxValue = Math.max(...statCards.map(s => s.value));
            const percentage = maxValue > 0 ? (stat.value / maxValue) * 100 : 0;
            
            return (
              <Link
                key={stat.title}
                to={stat.link}
                className="group text-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                <div className={`${stat.color} w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-3">{stat.title}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Estadísticas Avanzadas */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Estadísticas del Universo</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Distribución de Poder */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Distribución de Poder</h3>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-4">
              {topPersonajes.slice(0, 3).map((personaje, index) => {
                const maxPower = Math.max(...topPersonajes.map(p => p.nivelPoder || 0));
                const percentage = maxPower > 0 ? ((personaje.nivelPoder || 0) / maxPower) * 100 : 0;
                
                return (
                  <div key={personaje.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">{personaje.nombre}</span>
                      <span className="text-sm font-bold text-blue-600">
                        {(personaje.nivelPoder || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          index === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          index === 1 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                          'bg-gradient-to-r from-blue-300 to-blue-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resumen Rápido */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Resumen Total</h3>
              <Activity className="w-6 h-6" />
            </div>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-black mb-2">
                  {stats.personajes + stats.razas + stats.planetas + stats.sagas}
                </div>
                <div className="text-blue-100 font-medium">Entidades Totales</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="text-2xl font-bold">{stats.personajes}</div>
                  <div className="text-xs text-blue-100">Guerreros</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="text-2xl font-bold">{stats.razas}</div>
                  <div className="text-xs text-blue-100">Especies</div>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-400/30">
                <div className="text-center">
                  <div className="text-sm text-blue-100 mb-1">Poder Promedio</div>
                  <div className="text-lg font-bold">
                    {topPersonajes.length > 0 
                      ? Math.round(topPersonajes.reduce((sum, p) => sum + (p.nivelPoder || 0), 0) / topPersonajes.length).toLocaleString()
                      : '0'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Personajes */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Top Personajes por Poder</h2>
          <Link 
            to="/personajes" 
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            Ver todos →
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            {topPersonajes.length > 0 ? (
              <div className="space-y-4">
                {topPersonajes.map((personaje, index) => (
                  <div key={personaje.id} className="group flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
                    <div className="flex items-center space-x-5">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-white shadow-lg ${
                        index === 0 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                        index === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        index === 2 ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
                        'bg-gradient-to-r from-blue-600 to-blue-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{personaje.nombre}</h3>
                        <p className="text-sm text-gray-600">
                          {personaje.raza?.nombre} • {personaje.afiliacion}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="font-bold text-xl text-gray-900">
                        {personaje.nivelPoder?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No hay personajes disponibles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;