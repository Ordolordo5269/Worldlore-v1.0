// Configuración de variables de entorno
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN || 'pk.eyJ1IjoiYW5kcmVzb29kIiwiYSI6ImNtNWNtMmd4dzJlZmQybXFyMGJuMDFxemsifQ.t4UlHVJhUi9ntjG5Tiq5_A'
}; 