# Dragon Ball API - Spring Boot

API REST completa para gestionar la base de datos de Dragon Ball con Spring Boot, JPA y PostgreSQL.

## Características

- ✅ CRUD completo para todas las entidades
- ✅ Eliminación lógica para personajes
- ✅ Búsquedas avanzadas
- ✅ Validaciones de datos
- ✅ Manejo de errores global
- ✅ Documentación de endpoints
- ✅ CORS configurado

## Tecnologías

- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- Maven
- Java 17

## Configuración

### 1. Base de datos

Ejecuta el script SQL proporcionado en tu base de datos PostgreSQL (Neon).

### 2. Configuración de la aplicación

Edita `src/main/resources/application.yml` con tus credenciales de base de datos:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://tu-host-neon:5432/tu-base-de-datos
    username: tu-usuario
    password: tu-contraseña
```

### 3. Ejecutar la aplicación

```bash
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`

## Endpoints principales

### Documentación
- `GET /api` - Información de la API y todos los endpoints

### Personajes (con eliminación lógica)
- `GET /api/personajes` - Listar personajes activos
- `GET /api/personajes/eliminados` - Listar personajes eliminados
- `GET /api/personajes/{id}` - Buscar por ID
- `POST /api/personajes` - Crear personaje
- `PUT /api/personajes/{id}` - Actualizar personaje
- `DELETE /api/personajes/{id}` - Eliminación lógica
- `PUT /api/personajes/{id}/restaurar` - Restaurar personaje

### Búsquedas de personajes
- `GET /api/personajes/buscar/nombre?nombre=Goku`
- `GET /api/personajes/buscar/raza/{razaId}`
- `GET /api/personajes/buscar/planeta/{planetaId}`
- `GET /api/personajes/buscar/poder?nivelPoder=1000000`
- `GET /api/personajes/buscar/afiliacion?afiliacion=Z Fighters`
- `GET /api/personajes/ordenados-por-poder`

### Razas, Planetas, Sagas
- `GET /api/razas` - Listar todas
- `POST /api/razas` - Crear nueva
- `PUT /api/razas/{id}` - Actualizar
- `DELETE /api/razas/{id}` - Eliminar
- `GET /api/razas/buscar?nombre=Saiyajin`

(Similar para planetas y sagas)

## Ejemplos de uso

### Crear un personaje
```bash
curl -X POST http://localhost:8080/api/personajes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Gohan",
    "raza": {"id": 1},
    "planeta": {"id": 1},
    "nivelPoder": 5000000000,
    "afiliacion": "Z Fighters",
    "descripcion": "Hijo de Goku"
  }'
```

### Buscar personajes por nombre
```bash
curl "http://localhost:8080/api/personajes/buscar/nombre?nombre=Goku"
```

### Eliminación lógica
```bash
curl -X DELETE http://localhost:8080/api/personajes/1
```

### Restaurar personaje
```bash
curl -X PUT http://localhost:8080/api/personajes/1/restaurar
```

## Estructura del proyecto

```
src/main/java/com/dragonball/
├── model/          # Modelos/Entidades JPA
├── repository/     # Repositorios Spring Data
├── service/        # Lógica de negocio
├── controller/     # Controladores REST
├── dto/           # DTOs para respuestas
├── exeption/      # Manejo de errores
└── config/        # Configuraciones
```

## Funcionalidades especiales

### Eliminación lógica
Los personajes no se eliminan físicamente, sino que se marcan como eliminados con un campo `eliminado = true`. Esto permite:
- Mantener integridad referencial
- Posibilidad de restaurar datos
- Auditoría de cambios

### Búsquedas avanzadas
- Búsqueda por texto (insensible a mayúsculas)
- Filtros por relaciones (raza, planeta)
- Ordenamiento por nivel de poder
- Búsquedas por rangos numéricos

### Validaciones
- Campos obligatorios
- Longitud máxima de strings
- Unicidad de nombres donde corresponde
- Validación de datos de entrada

## Próximas mejoras

- [ ] Paginación de resultados
- [ ] Autenticación y autorización
- [ ] Documentación con Swagger
- [ ] Tests unitarios e integración
- [ ] Cache con Redis
- [ ] Métricas y monitoreo