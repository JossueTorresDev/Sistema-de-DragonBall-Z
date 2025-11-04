import { Loader2, Sparkles, Zap, Star, Cpu } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Un momento, por favor...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center p-12">
      {/* Partículas tecnológicas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
      </div>

      {/* Spinner estilo Corporación Cápsula */}
      <div className="relative">
        {/* Anillo exterior tecnológico */}
        <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-blue-200 border-r-blue-300 rounded-full animate-spin opacity-40"></div>
        
        {/* Anillo medio con efecto holográfico */}
        <div className="absolute inset-2 w-20 h-20 border-3 border-transparent border-b-blue-400 border-l-blue-500 rounded-full animate-spin opacity-60" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        
        {/* Núcleo energético */}
        <div className="absolute inset-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full opacity-25 animate-pulse"></div>
        
        {/* Logo CC simulado */}
        <div className="relative z-10 flex items-center justify-center w-24 h-24">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Cpu className="w-6 h-6 animate-spin text-white" />
          </div>
        </div>

        {/* Elementos tecnológicos animados */}
        <Zap className="w-4 h-4 text-blue-400 absolute -top-2 -right-2 animate-bounce" style={{animationDelay: '0s'}} />
        <Star className="w-3 h-3 text-blue-300 absolute -top-1 -left-2 animate-pulse" style={{animationDelay: '0.5s'}} />
        <Sparkles className="w-3 h-3 text-blue-500 absolute -bottom-1 -right-1 animate-bounce" style={{animationDelay: '1s'}} />
        <Cpu className="w-2 h-2 text-blue-200 absolute -bottom-2 -left-1 animate-ping" style={{animationDelay: '1.5s'}} />
      </div>

      {/* Texto estilo corporativo */}
      <div className="mt-8 text-center">
        <p className={`text-gray-800 font-bold ${textSizes[size]} mb-2 animate-pulse`}>{text}</p>
        <div className="flex items-center justify-center space-x-1 animate-bounce">
          <span className="text-blue-500">⚡</span>
          <p className="text-gray-600 text-xs font-medium">Tecnología Corporación Cápsula en proceso</p>
          <span className="text-blue-600">⚡</span>
        </div>
        
        {/* Indicadores de progreso tecnológicos */}
        <div className="flex justify-center space-x-1 mt-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;