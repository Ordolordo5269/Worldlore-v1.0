// Configuración de APIs externas
const axios = require('axios');

// Configuración base para RestCountries API
const restCountriesAPI = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Configuración para otras APIs que puedas necesitar
const openWeatherAPI = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    timeout: 10000,
    params: {
        appid: process.env.OPENWEATHER_API_KEY
    }
});

module.exports = {
    restCountriesAPI,
    openWeatherAPI
}; 