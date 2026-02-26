const express = require("express");
const {
    fetchWeather,
    fetchForecast
} = require("../controllers/weather.controller");

const router = express.Router();

router.get("/", fetchWeather);
router.get("/forecast", fetchForecast);

module.exports = router;
const { validateForecast } = require("../middleware/validate.middleware");

router.get("/forecast", validateForecast, fetchForecast);
