const { restCountriesAPI } = require('../config/api');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

// Ruta al archivo de caché
const CACHE_FILE = path.join(__dirname, '../../public/data/countries-cache.json');

// Tiempo de expiración de la caché en milisegundos (1 hora)
const CACHE_EXPIRATION = 3600000;

class ApiService {
    // Obtener todos los países
    async getAllCountries() {
        try {
            // Intentar leer desde la caché primero
            const cachedData = await this.readCache();
            if (cachedData && cachedData.timestamp > Date.now() - CACHE_EXPIRATION) {
                console.log('Using cached data');
                return cachedData.data;
            }

            // Si no hay caché o está expirada, obtener de la API
            console.log('Getting fresh data from API');
            const response = await restCountriesAPI.get('/all');
            
            // Guardar en caché
            await this.saveCache(response.data);
            
            return response.data;
        } catch (error) {
            console.error('Error al obtener países:', error);
            
            // Si hay un error pero tenemos caché, usarla aunque esté expirada
            try {
                const cachedData = await this.readCache();
                if (cachedData && cachedData.data) {
                    console.log('Using expired cache due to API error');
                    return cachedData.data;
                }
            } catch (cacheError) {
                console.error('No cache file or it is corrupted');
            }
            
            throw error;
        }
    }

    // Obtener un país por código
    async getCountryByCode(code) {
        try {
            const response = await restCountriesAPI.get(`/alpha/${code}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener país con código ${code}:`, error);
            throw error;
        }
    }

    // Buscar países por nombre
    async searchCountriesByName(name) {
        try {
            const response = await restCountriesAPI.get(`/name/${name}`);
            return response.data;
        } catch (error) {
            console.error(`Error al buscar países con nombre ${name}:`, error);
            throw error;
        }
    }

    // Leer datos de caché
    async readCache() {
        try {
            const data = await fs.readFile(CACHE_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.log('No hay archivo de caché o está corrupto');
            return null;
        }
    }

    // Guardar datos en caché
    async saveCache(data) {
        try {
            // Asegurarse de que el directorio existe
            const dir = path.dirname(CACHE_FILE);
            await fs.mkdir(dir, { recursive: true });
            
            // Guardar los datos con timestamp
            await fs.writeFile(
                CACHE_FILE, 
                JSON.stringify({
                    timestamp: Date.now(),
                    data
                })
            );
            console.log('Cache saved successfully');
        } catch (error) {
            console.error('Error saving cache:', error);
        }
    }

    // Get detailed country data from multiple sources
    async getDetailedCountryData(code) {
        try {
            // Get basic country data from REST Countries API
            const countryResponse = await restCountriesAPI.get(`/alpha/${code}`);
            const country = countryResponse.data[0];
            
            // Get economic data from World Bank API
            const worldBankData = await this.getWorldBankData(code);
            
            // Combine all data
            const combinedData = {
                basic: {
                    name: country.name.common,
                    officialName: country.name.official,
                    isoCode: country.cca3,
                    continent: country.region,
                    subregion: country.subregion,
                    capital: country.capital?.[0] || 'N/A',
                    flag: country.flags.png,
                    languages: country.languages ? Object.values(country.languages) : [],
                    currencies: country.currencies ? 
                        Object.entries(country.currencies).map(([code, currency]) => ({
                            code,
                            name: currency.name,
                            symbol: currency.symbol
                        })) : []
                },
                economy: {
                    gdp: worldBankData.gdp || 'N/A',
                    gdpPerCapita: worldBankData.gdpPerCapita || 'N/A',
                    gdpGrowth: worldBankData.gdpGrowth || 'N/A',
                    inflation: worldBankData.inflation || 'N/A',
                    unemployment: worldBankData.unemployment || 'N/A',
                    sectorBreakdown: {
                        agriculture: worldBankData.agricultureValue || 'N/A',
                        industry: worldBankData.industryValue || 'N/A',
                        services: worldBankData.servicesValue || 'N/A'
                    }
                },
                politics: {
                    // No synthetic data
                },
                population: {
                    total: country.population?.toLocaleString() || 'N/A',
                    density: country.area ? (country.population / country.area).toFixed(2) + ' people/km²' : 'N/A',
                    urbanPercentage: worldBankData.urbanPopulation || 'N/A',
                    ruralPercentage: worldBankData.urbanPopulation ? 
                        (100 - parseFloat(worldBankData.urbanPopulation)).toFixed(2) + '%' : 'N/A',
                    hdi: 'N/A' // Set HDI to N/A since we're removing the API
                },
                diplomacy: {
                    // No synthetic data
                },
                timestamp: new Date().toISOString()
            };
            
            return combinedData;
        } catch (error) {
            console.error(`Error getting detailed country data for ${code}:`, error);
            throw error;
        }
    }

    // Helper method to get World Bank data
    async getWorldBankData(code) {
        try {
            // Define the indicators we want to fetch
            const indicators = {
                gdp: 'NY.GDP.MKTP.CD', // GDP (current US$)
                gdpPerCapita: 'NY.GDP.PCAP.CD', // GDP per capita (current US$)
                gdpGrowth: 'NY.GDP.MKTP.KD.ZG', // GDP growth (annual %)
                inflation: 'FP.CPI.TOTL.ZG', // Inflation, consumer prices (annual %)
                unemployment: 'SL.UEM.TOTL.ZS', // Unemployment, total (% of total labor force)
                agricultureValue: 'NV.AGR.TOTL.ZS', // Agriculture, value added (% of GDP)
                industryValue: 'NV.IND.TOTL.ZS', // Industry, value added (% of GDP)
                servicesValue: 'NV.SRV.TOTL.ZS', // Services, value added (% of GDP)
                urbanPopulation: 'SP.URB.TOTL.IN.ZS' // Urban population (% of total)
            };
            
            // Create an object to store the results
            const results = {};
            
            // Make parallel requests for each indicator
            const requests = Object.entries(indicators).map(async ([key, indicator]) => {
                try {
                    const response = await axios.get(
                        `https://api.worldbank.org/v2/country/${code}/indicator/${indicator}?format=json&date=2020:2023&per_page=100`
                    );
                    
                    // Check if we have valid data
                    if (response.data && response.data[1] && response.data[1].length > 0) {
                        // Find the most recent data point with a value
                        const dataPoint = response.data[1].find(item => item.value !== null);
                        
                        if (dataPoint) {
                            // Format the value based on the indicator type
                            if (key === 'gdp') {
                                results[key] = '$' + Number(dataPoint.value).toLocaleString();
                            } else if (key === 'gdpPerCapita') {
                                results[key] = '$' + Number(dataPoint.value).toLocaleString();
                            } else if (['inflation', 'gdpGrowth', 'unemployment', 'agricultureValue', 'industryValue', 'servicesValue', 'urbanPopulation'].includes(key)) {
                                results[key] = dataPoint.value.toFixed(2) + '%';
                            } else {
                                results[key] = dataPoint.value;
                            }
                        }
                    }
                } catch (error) {
                    console.error(`Error fetching ${key} for ${code}:`, error);
                }
            });
            
            // Wait for all requests to complete
            await Promise.all(requests);
            
            return results;
        } catch (error) {
            console.error(`Error getting World Bank data for ${code}:`, error);
            return {};
        }
    }
}

module.exports = new ApiService(); 