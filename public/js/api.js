// Funciones para interactuar con la API del backend
const API = {
    // Obtener todos los países
    async getAllCountries() {
        try {
            const response = await fetch('/api/countries');
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener países:', error);
            throw error;
        }
    },
    
    // Obtener un país por código
    async getCountryByCode(code) {
        try {
            const response = await fetch(`/api/countries/code/${code}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error al obtener país con código ${code}:`, error);
            throw error;
        }
    },
    
    // Buscar países por nombre
    async searchCountriesByName(name) {
        try {
            const response = await fetch(`/api/countries/name/${name}`);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error al buscar países con nombre ${name}:`, error);
            throw error;
        }
    }
}; 