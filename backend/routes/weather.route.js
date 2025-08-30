const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
const generateSensorData = require("../sensor/sensor");
dotenv.config();
const apiKey = process.env.OPENWEATHER_API_KEY;
const apiUrl = process.env.OPENWEATHER_API_URL;
const forecastApiUrl = process.env.FORECAST_API_URL;
const forecastApiKey = process.env.FORECAST_API_KEY;

router.get("/current", async (req, res) => {
    const city = req.query.city;
    const sensorData = generateSensorData();
    try {
        const response = await axios.get(`${apiUrl}weather/?q=${city}&appid=${apiKey}&units=metric`);
        const data = response.data;
        if (!data) {
            res.status(200).json({
                error: "Can't fetch weather API data, please try again later",
                sensor: sensorData
            });
        } else {
            res.status(200).json({
                ...data,
                sensor: sensorData,
            });
        }
    } catch (error) {
        res.status(500).json({
            error
        });
    }
});

router.get("/forecast", async (req, res) => {
    try {
        const city = req.query.city;
        const response = await axios.get(`${forecastApiUrl}?key=${forecastApiKey}&q=${city}&days=5&aqi=no&alerts=no`);
        const data = response.data;
        const days = data.forecast.forecastday.map(day  => ({
            date: day.date_epoch,
            condition: day.day.condition,
            maxTemp: day.day.maxtemp_c.toFixed(),
            minTemp: day.day.mintemp_c.toFixed(),
            avgtemp: day.day.avgtemp_c.toFixed()
        }));
        const hours = data.forecast.forecastday[0].hour.map(hour => ({
            sensor: generateSensorData(),
            time: hour.time.slice(11, 16),
            condition: hour.condition,
            temp: hour.temp_c.toFixed(),
            humidity: hour.humidity
        }));
        res.status(200).json({ days, hours });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
});

module.exports = router;