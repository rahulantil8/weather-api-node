const axios = require("axios");

const BASE_URL = "https://api.weatherapi.com/v1";

const getCurrentWeather = async (city, apiKey) => {
    const response = await axios.get(`${BASE_URL}/current.json`, {
        params: { key: apiKey, q: city }
    });
    return response.data;
};

const getForecastWeather = async (city, days, apiKey) => {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
        params: {
            key: apiKey,
            q: city,
            days
        }
    });
    return response.data;
};

module.exports = {
    getCurrentWeather,
    getForecastWeather
};
