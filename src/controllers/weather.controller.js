const {
    getCurrentWeather,
    getForecastWeather
} = require("../services/weather.service");

const Log = require("../models/log.model");

// CURRENT WEATHER
const fetchWeather = async (req, res, next) => {
    try {
        const { city } = req.query;

        if (!city) {
            const err = new Error("City is required");
            err.statusCode = 400;
            throw err;
        }

        const data = await getCurrentWeather(
            city,
            process.env.WEATHER_API_KEY
        );

        // ✅ await is INSIDE async function
        await Log.create({
            city,
            type: "current"
        });

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

// FORECAST WEATHER
const fetchForecast = async (req, res, next) => {
    try {
        const { city, days } = req.query;

        if (!city || !days) {
            const err = new Error("City and days are required");
            err.statusCode = 400;
            throw err;
        }

        const data = await getForecastWeather(
            city,
            days,
            process.env.WEATHER_API_KEY
        );

        // ✅ await is INSIDE async function
        await Log.create({
            city,
            type: "forecast"
        });

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchWeather,
    fetchForecast
};
