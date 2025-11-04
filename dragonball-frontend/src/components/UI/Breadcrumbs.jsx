import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    '': 'Santuario',
    'personajes': 'Guerreros',
    'razas': 'Razas',
    'planetas': 'Planetas',
    'sagas': 'Sagas',
    'tecnicas': 'Artes Marciales',
    'transformaciones': 'Transformaciones',
    'batallas': 'Combates',
    'nuevo': 'Nuevo',
    'nueva': 'Nueva',
    'editar': 'Editar'
  };

  if (pathnames.length === 0) {
    return null; // Don't show breadcrumbs on dashboard
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link 
        to="/" 
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = breadcrumbNameMap[pathname] || pathname;

        return (
          <div key={pathname} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="font-medium text-gray-900">{name}</span>
            ) : (
              <Link 
                to={routeTo} 
                className="hover:text-blue-600 transition-colors"
              >
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;