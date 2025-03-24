const express = require('express');
const router = express.Router();
const countryController = require('../controllers/country.controller');
const cacheMiddleware = require('../middleware/cache');

// Obtener todos los países (con caché)
router.get('/', cacheMiddleware(300), countryController.getAllCountries);

// Obtener un país por código
router.get('/code/:code', cacheMiddleware(3600), countryController.getCountryByCode);

// Buscar países por nombre
router.get('/name/:name', cacheMiddleware(3600), countryController.searchCountriesByName);

// Get detailed country data from multiple sources
router.get('/details/:code', cacheMiddleware(3600), countryController.getCountryDetails);

module.exports = router; 