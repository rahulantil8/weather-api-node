const validateForecast = (req, res, next) => {
    const { city, days } = req.query;

    if (!city || !days) {
        return res.status(400).json({
            success: false,
            message: "City and days are required"
        });
    }

    next();
};

module.exports = { validateForecast };
