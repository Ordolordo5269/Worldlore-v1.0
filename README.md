# Worldlore v1.0

## Estructura del Proyecto

📁 Worldlore/
│── 📁 src/                 # Código principal
|   │── 📁 config/          # Configuración (variables de entorno, APIs)
│   │   ├── api.js          # Configuración de conexiones a APIs externas
│   │   ├── env.js          # Variables de entorno
│   │── 📁 routes/          # Rutas de la API
│   │   ├── country.routes.js # Rutas para países
│   │── 📁 controllers/     # Controladores para manejar la lógica de negocio
│   │   ├── country.controller.js
│   │── 📁 services/        # Lógica de negocio (validaciones, cálculos, APIs externas)
│   │   ├── country.service.js
│   │   ├── api.service.js  # Servicios para consumir APIs externas
│   │── 📁 middleware/      # Middleware (autenticación, logs, validaciones)
│   │   ├── auth.js         # Middleware de autenticación
│   │   ├── cache.js        # Middleware para caché de respuestas de API
│   │── 📁 utils/           # Utilidades (funciones comunes)
│   │   ├── helpers.js      # Funciones auxiliares
│   │   ├── formatters.js   # Funciones para formatear datos
│   │── app.js              # Configuración principal de Express
│── 📁 public/              # Archivos estáticos (HTML, CSS, JS, imágenes)
│   │── 📄 index.html       # Página principal (React)
│   │── 📄 favicon.ico      # Ícono del sitio web
│   │── 📁 css/             # Archivos CSS
│   │   ├── styles.css      # Estilos generales
│   │   ├── reset.css       # Reset de estilos
│   │── 📁 js/              # Scripts JavaScript
│   │   ├── main.js         # Lógica principal
│   │   ├── map.js          # Código relacionado con el mapa interactivo
│   │   ├── api.js          # Funciones para consumir la API del backend
│   │── 📁 images/          # Imágenes del proyecto
│   │   ├── world-map.png   # Imagen del mapa mundial
│   │   ├── flags/          # Subcarpeta con banderas de los países
│   │       ├── argentina.png
│   │       ├── brazil.png
│   │── 📁 fonts/           # Tipografías personalizadas
│   │   ├── roboto.ttf
│   │── 📁 components/      # Componentes React
│   │   ├── CountryCard.js  # Componente para mostrar información de un país
│   │   ├── WorldMap.js     # Componente del mapa interactivo
│   │── 📁 data/                # Archivos JSON para caché o datos estáticos
│   │   ├── countries-cache.json # Caché temporal de datos de países
│   │── 📁 node_modules/        # Paquetes instalados con npm (autogenerado)
│   │── 📁 scripts/             # Scripts automáticos
│   │   ├── update-cache.js     # Script para actualizar caché de APIs
│   │── 📁 tests/               # Pruebas
│   │   ├── api.test.js         # Pruebas de integración con APIs
│   │   ├── services.test.js    # Pruebas de servicios
│   │── 📄 .env                 # Variables de entorno (claves de API, etc.)
│   │── 📄 .gitignore           # Ignorar archivos en Git
│   │── 📄 package.json         # Configuración de dependencias
│   │── 📄 README.md            # Documentación

## Tecnologías

### Frontend
- React (Framework)

### Backend
- Express.js (Framework)

### Fuentes de Datos
- APIs externas (sin base de datos propia)

## Instalación

1. Clona este repositorio
2. Ejecuta `npm install` para instalar dependencias
3. Configura el archivo `.env` con tus variables de entorno y claves de API
4. Ejecuta `npm start` para iniciar el servidor

## Características principales

- Visualización interactiva de países y sus datos
- Mapa mundial interactivo
- Información detallada de cada país
- Integración con múltiples APIs externas para obtener datos actualizados
- Sistema de caché para optimizar el rendimiento y reducir llamadas a APIs