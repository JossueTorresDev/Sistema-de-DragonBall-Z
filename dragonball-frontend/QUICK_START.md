# 🚀 Inicio Rápido - Dragon Ball Frontend

## ⚡ Comandos Esenciales

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🔧 Configuración Inicial

1. **Asegúrate de que el backend esté ejecutándose:**
   ```bash
   # En el directorio del backend
   mvn spring-boot:run
   ```
   El backend debe estar disponible en: `http://localhost:8080`

2. **Ejecuta el frontend:**
   ```bash
   # En el directorio dragonball-frontend
   npm run dev
   ```
   El frontend estará disponible en: `http://localhost:5173`

## 📱 Funcionalidades Disponibles

### ✅ Completamente Implementadas
- **Dashboard** - Estadísticas y resumen general
- **Personajes** - CRUD completo con filtros avanzados
- **Razas** - Gestión de razas
- **Planetas** - Administración de planetas
- **Sagas** - Gestión de sagas
- **Técnicas** - Catálogo de técnicas
- **Transformaciones** - Registro de transformaciones
- **Batallas** - Historial de batallas

### 🔍 Características Especiales
- **Búsqueda en tiempo real** por nombre
- **Filtros dinámicos** por categorías
- **Soft delete** para personajes (eliminar/restaurar)
- **Estadísticas visuales** en el dashboard
- **Diseño responsive** para móviles
- **Estado de conexión** con la API

## 🎨 Estructura de Navegación

```
Dashboard (/)
├── Personajes (/personajes)
├── Razas (/razas)
├── Planetas (/planetas)
├── Sagas (/sagas)
├── Técnicas (/tecnicas)
├── Transformaciones (/transformaciones)
└── Batallas (/batallas)
```

## 🛠️ Solución de Problemas

### Error de conexión con la API
- Verifica que el backend esté ejecutándose en `http://localhost:8080`
- Revisa la consola del navegador para errores de CORS
- El frontend mostrará un banner de estado de conexión

### Problemas con Tailwind CSS
- Si los estilos no cargan, ejecuta: `npm run dev` nuevamente
- Verifica que no haya errores en la consola

### Dependencias
- Si hay conflictos, usa: `npm install --legacy-peer-deps`

## 📊 Datos de Prueba

Para probar la aplicación, puedes crear datos usando la API:

```bash
# Ejemplo: Crear una raza
POST http://localhost:8080/api/razas
{
  "nombre": "Saiyan",
  "descripcion": "Raza guerrera del planeta Vegeta"
}

# Ejemplo: Crear un personaje
POST http://localhost:8080/api/personajes
{
  "nombre": "Goku",
  "nivelPoder": 9000,
  "afiliacion": "Guerreros Z"
}
```

## 🎯 Próximos Pasos

1. **Crear datos de prueba** usando la API
2. **Explorar el dashboard** para ver estadísticas
3. **Probar los filtros** en la sección de personajes
4. **Usar la búsqueda** para encontrar elementos específicos

¡Disfruta explorando el universo de Dragon Ball! 🐉⚡