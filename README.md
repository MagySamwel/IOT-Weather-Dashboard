# Weather Dashboard with IOT Sensor Simulation

This project is a full-stack IoT Weather Dashboard that visualizes both simulated and real weather data. The backend simulates IoT sensor readings and integrates with public weather APIs to provide comprehensive weather information, which is displayed in a modern React web interface.


### What Can the Dashboard Do?
- **Display Current Weather:** Shows up-to-date weather information for a selected city, including temperature, humidity, and other key metrics.
- **Show Weather Forecasts:** Presents multi-day weather forecasts, allowing users to plan ahead based on predicted conditions.
- **Visualize Sensor Data:** Integrates simulated IoT sensor readings alongside public weather data, giving a more comprehensive view of environmental conditions.
- **Interactive Charts:** Users can explore weather trends and sensor data through dynamic charts and graphs.
- **Filtering Options:** The dashboard includes filters to customize the displayed data, such as selecting different cities or metric type.
- **Responsive UI:** Built with React, the dashboard is optimized for modern browsers and devices, ensuring a smooth user experience.


## IoT Sensor Simulation & Public API Integration

- **Sensor Simulation:** The backend (`backend/sensor/sensor.js`) generates simulated weather data (e.g., temperature, humidity) to mimic real IoT sensors.
- **Public API Integration:** The backend fetches real-time weather data from public APIs (OpenWeatherMap and WeatherAPI) using `axios`. Endpoints like `/current` and `/forecast` combine this API data with simulated sensor readings.
- **Data Fetching Process:**
  - When the frontend requests weather data, the backend retrieves real data from public APIs and merges it with simulated sensor data.
  - The combined data is sent to the frontend, which displays it using interactive charts and filters (`frontend/src/pages/weatherDashboard.jsx`).

## API Endpoints
- GET /current?city=CityName

1. Fetches current weather data for the specified city from the OpenWeatherMap public API.
2. Simulates sensor data using generateSensorData() and includes it in the response.
3. Response includes both public API weather data and simulated sensor readings.
- GET /forecast?city=CityName

1. Fetches a 5-day weather forecast for the specified city from the WeatherAPI public API.
2. For each forecasted hour, simulated sensor data is generated and included.
3. Response includes daily and hourly forecast data, each with simulated sensor readings.

## User Guide

### Using Filters
- At the top of the dashboard, you’ll find dropdown filters for Country and City.
- Select your desired country and city to update the displayed weather and sensor data.
- The dashboard will automatically fetch and show data for your selection.

### Visualizing Data
- Current Weather: The dashboard displays current weather conditions and simulated sensor readings for the selected city.
- Forecast: You’ll see a 5-day forecast with daily summaries and icons.
- Interactive Charts: Below the forecast, there are charts showing hourly temperature and humidity trends.
   - - Use the chart filter to switch between temperature and humidity views.
   - - Hover over chart points to see detailed info, including both API and sensor values.
## Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Backend Setup

1. Navigate to the backend folder:
   ```powershell
   cd backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Set up your API keys:
   - Create a `.env` file in the backend directory (if not present).
   - Add your OpenWeatherMap and WeatherAPI keys:
     ```env
     OPENWEATHER_API_KEY=your_openweather_api_key
     FORECAST_API_KEY=your_weatherapi_key
     ```
4. Start the backend server:
   ```powershell
   npm run dev
   ```
   The backend will start and expose API endpoints for weather data.

### Frontend Setup

1. Navigate to the frontend folder:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the frontend development server:
   ```powershell
   npm run dev
   ```
   The frontend will launch locally (usually at `http://localhost:5173`).

## Deployment Guide

Follow these steps to deploy the IoT Weather Dashboard to a production environment:

1. **Backend**:
   - Push the project to GitHub.
   - The backend should be deployed on **Railway**.
   - Add environment variables.
- Make sure your backend server is accessible on a public IP or domain, and configure firewall rules if necessary.

2. **Frontend**:
   - Upload the code to GitHub.
   - Deploy the frontend to **Vercel**.
- Configure your frontend to communicate with the backend API (update API URLs if deploying to different domains).


## Features

- Real-time weather data from public APIs
- Simulated IoT sensor data
- RESTful API endpoints for current and forecast weather
- Interactive dashboard with charts and filters
- Modern React-based UI