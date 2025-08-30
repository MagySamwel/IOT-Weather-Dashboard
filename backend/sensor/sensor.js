function generateSensorData() {
    const temperature = getRandomNumber(0, 50);
    const feelsLike = getRandomNumber(temperature, temperature + 10);
    
    return {
        temperature: +temperature.toFixed(),
        feelsLike: +feelsLike.toFixed(),
        humidity: +getRandomNumber(10, 100).toFixed(),
        pressure: +getRandomNumber(900, 1100).toFixed(),
        wind: {
            speed: +getRandomNumber(2, 7).toFixed(),
            degree: +getRandomNumber(0, 360).toFixed(),
        },
        timestamp: new Date().toISOString(),
    };
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

module.exports = generateSensorData;