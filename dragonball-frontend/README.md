# Dragon Ball Frontend

Frontend profesional desarrollado con React, Tailwind CSS y Vite para consumir la API de Dragon Ball.

## 🚀 Características

- **React 18** con Hooks modernos
- **Tailwind CSS** para estilos profesionales
- **Vite** para desarrollo rápido
- **React Router** para navegación
- **Axios** para peticiones HTTP
- **Lucide React** para iconos profesionales
- **Diseño responsive** y moderno
- **Componentes reutilizables**

## 📋 Funcionalidades

### Entidades Gestionadas
- ✅ **Personajes** - CRUD completo con filtros avanzados
- ✅ **Razas** - Gestión de razas del universo Dragon Ball
- ✅ **Planetas** - Administración de planetas
- ✅ **Sagas** - Gestión de sagas épicas
- ✅ **Técnicas** - Catálogo de técnicas de combate
- ✅ **Transformaciones** - Registro de transformaciones
- ✅ **Batallas** - Historial de batallas épicas

### Características Principales
- 🎨 **Dashboard interactivo** con estadísticas
- 🔍 **Búsqueda avanzada** en todas las entidades
- 🎯 **Filtros dinámicos** por múltiples criterios
- 📱 **Diseño responsive** para móviles y desktop
- ⚡ **Carga rápida** con componentes optimizados
- 🎭 **Estados de carga** y manejo de errores
- 🔄 **Soft delete** para personajes

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd dragonball-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar la API**
   - Asegúrate de que el backend esté ejecutándose en `http://localhost:8080`
   - La configuración de la API está en `src/services/api.js`

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout/         # Layout principal y navegación
│   └── UI/             # Componentes de interfaz
├── pages/              # Páginas principales
│   ├── Dashboard.jsx   # Dashboard principal
│   ├── Personajes/     # Gestión de personajes
│   ├── Razas/          # Gestión de razas
│   ├── Planetas/       # Gestión de planetas
│   ├── Sagas/          # Gestión de sagas
│   ├── Tecnicas/       # Gestión de técnicas
│   ├── Transformaciones/ # Gestión de transformaciones
│   └── Batallas/       # Gestión de batallas
├── services/           # Servicios de API
│   └── api.js          # Configuración y servicios de Axios
├── App.jsx             # Componente principal
├── main.jsx            # Punto de entrada
└── index.css           # Estilos globales con Tailwind
```

## 🎨 Diseño y Tema

### Colores Principales
- **Dragon Orange**: `#FF6B35` - Color principal de la marca
- **Dragon Blue**: `#004E89` - Color secundario
- **Dragon Gold**: `#FFD23F` - Color de acento
- **Saiyan Blue**: `#1E40AF` - Color especial

### Componentes UI
- **Cards** - Tarjetas con sombras y bordes redondeados
- **Buttons** - Botones con estados hover y transiciones
- **Forms** - Formularios con validación visual
- **Modals** - Ventanas modales responsivas
- **Loading** - Spinners de carga animados
- **Search** - Barras de búsqueda con iconos

## 🔌 API Integration

El frontend consume la API REST del backend Dragon Ball:

### Endpoints Principales
- `GET /api/personajes` - Listar personajes
- `GET /api/razas` - Listar razas
- `GET /api/planetas` - Listar planetas
- `GET /api/sagas` - Listar sagas
- `GET /api/tecnicas` - Listar técnicas
- `GET /api/transformaciones` - Listar transformaciones
- `GET /api/batallas` - Listar batallas

### Funcionalidades de API
- ✅ CRUD completo para todas las entidades
- ✅ Búsquedas por nombre
- ✅ Filtros por categorías
- ✅ Soft delete para personajes
- ✅ Ordenamiento por poder
- ✅ Relaciones entre entidades

## 📱 Responsive Design

- **Mobile First** - Diseñado primero para móviles
- **Breakpoints** - Adaptado para tablet y desktop
- **Navigation** - Menú hamburguesa en móviles
- **Cards** - Grid responsivo que se adapta al tamaño
- **Tables** - Scroll horizontal en pantallas pequeñas

## 🚀 Próximas Funcionalidades

- [ ] Formularios de creación/edición
- [ ] Vista detalle de cada entidad
- [ ] Paginación para listas grandes
- [ ] Filtros avanzados adicionales
- [ ] Gráficos y estadísticas
- [ ] Modo oscuro
- [ ] Exportación de datos
- [ ] Notificaciones toast

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 🙏 Agradecimientos

- **Dragon Ball** - Por el increíble universo creado por Akira Toriyama
- **React Team** - Por el excelente framework
- **Tailwind CSS** - Por el sistema de diseño
- **Lucide** - Por los iconos profesionales