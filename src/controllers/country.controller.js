const apiService = require('../services/api.service');

class CountryController {
    // Obtener todos los países
    async getAllCountries(req, res) {
        try {
            const countries = await apiService.getAllCountries();
            res.json(countries);
        } catch (error) {
            console.error('Error en el controlador getAllCountries:', error);
            res.status(500).json({ 
                message: 'Error retrieving countries', 
                error: error.message 
            });
        }
    }

    // Obtener un país por código
    async getCountryByCode(req, res) {
        try {
            const { code } = req.params;
            const country = await apiService.getCountryByCode(code);
            res.json(country);
        } catch (error) {
            console.error(`Error en el controlador getCountryByCode (${req.params.code}):`, error);
            res.status(error.response?.status || 500).json({ 
                message: `Error retrieving country with code ${req.params.code}`, 
                error: error.message 
            });
        }
    }

    // Buscar países por nombre
    async searchCountriesByName(req, res) {
        try {
            const { name } = req.params;
            const countries = await apiService.searchCountriesByName(name);
            res.json(countries);
        } catch (error) {
            console.error(`Error en el controlador searchCountriesByName (${req.params.name}):`, error);
            res.status(error.response?.status || 500).json({ 
                message: `Error searching countries with name ${req.params.name}`, 
                error: error.message 
            });
        }
    }

    // Get detailed country data from multiple sources
    async getCountryDetails(req, res) {
        try {
            const { code } = req.params;
            
            // Get basic country data
            const countryData = await apiService.getDetailedCountryData(code);
            
            res.json(countryData);
        } catch (error) {
            console.error(`Error in getCountryDetails controller (${req.params.code}):`, error);
            res.status(error.response?.status || 500).json({ 
                message: `Error retrieving detailed data for country with code ${req.params.code}`, 
                error: error.message 
            });
        }
    }
}

module.exports = new CountryController(); 