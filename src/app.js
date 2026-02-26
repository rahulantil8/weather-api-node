require("dotenv").config();

const express = require("express");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const weatherRoutes = require("./routes/weather.routes");
const errorHandler = require("./middleware/error.middleware");
const swaggerSpec = require("./swagger");
const connectDB = require("./config/db");

const app = express(); // ✅ app MUST be created first

// connect to database
connectDB();

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// swagger docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// routes
app.use("/weather", weatherRoutes);


// error middleware (ALWAYS LAST)
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
