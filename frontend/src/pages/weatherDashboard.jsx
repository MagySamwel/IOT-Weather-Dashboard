import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Country, State } from 'country-state-city'
import Header from '../components/Header'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { CircleGauge, Droplet, Sparkles, Sunrise, Sunset, Thermometer, Wind } from 'lucide-react'
import { toast } from 'react-toastify'
import Charts from '../components/Charts'
import Loader from '../components/Loader'

function WeatherDashboard() {
    const [selectedCountry, setSelectedCountry] = useState('EG')
    const [selectedCity, setSelectedCity] = useState("Qena")
    const [lastUpdate, setLastUpdate] = useState(new Date())
    const [weatherData, setWeatherData] = useState('')
    const [loading, setLoading] = useState(false);
    const countries = Country.getAllCountries()
    const cities = State.getStatesOfCountry(selectedCountry)
    const props = {
        cities: cities,
        countries: countries,
        selectedCity: selectedCity,
        selectedCountry: selectedCountry,
        latest: lastUpdate,
        setSelectedCity: setSelectedCity,
        setSelectedCountry: setSelectedCountry
    }
    const weatherCondition = (condition, state) => {
        switch (condition) {
            case 'Clear':
                return (state === 'night') ? '🌙' : '☀️';
            case 'Rain':
            case 'Drizzle':
                return '🌧️';
            case 'Snow':
                return '❄️';
            case 'Clouds':
                return '☁️';
            case 'Thunderstorm':
                return '🌩️';
            default:
                return '🌥️';
        }
    }

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`https://${import.meta.env.VITE_API_URL}/api/weather/current?city=${selectedCity}`);
                if (res.data.error) {
                    toast.error(res.data.error);
                }
                setWeatherData(res.data);
                setLastUpdate(new Date())
                setLoading(false);
            } catch (err) {
                console.error("Error fetching latest weather:", err.message);
            }
           
        }
        fetchWeatherData(); // initial call
        const interval = setInterval(fetchWeatherData, 60000); // refresh every 60s

        return () => clearInterval(interval);
    }, [selectedCity])

    if (loading) {
        return <Loader />;
    }
    return (
        <Box px={5} py={2}>
            <Header {...props} />
            {/* Weather Information */}
            <Grid container spacing={4} justifyContent={"space-between"} alignItems="center" mt={5}>
                <Grid size={{ xs: 12, md: 4 }} textAlign={"center"} bgcolor={'white'} color={'black'} borderRadius={2} py={3} sx={{ "&:hover": { transform: "scale(1.03)" }, transition: "all 0.3s ease-in-out" }}>
                    {weatherData?.weather && (
                        <>
                            <Typography variant="h1" pb={2} sx={{ transition: "all 0.3s ease-in-out", }}>
                                {weatherCondition(weatherData.weather[0].main, new Date(weatherData?.dt * 1000).toLocaleString().includes('AM') ? 'day' : 'night')}
                            </Typography>
                            <Typography variant="subtitle1" color='text.secondary' pb={2}>
                                {new Date(weatherData?.dt * 1000).toUTCString().slice(0, -12)}
                            </Typography>
                            <Typography variant="h2" pb={2} fontWeight={"bold"}>
                                {weatherData?.main?.temp.toFixed()}°C
                            </Typography>
                            <Typography variant="h6" color='text.secondary' pb={2}>
                                {weatherData?.weather[0].description}
                            </Typography>
                            <Grid container spacing={7} justifyContent={'center'}>
                                <Box display={'flex'} gap={1} alignItems={'center'}>
                                    <Sunrise />
                                    <Box>
                                        <Typography variant="body2" color='text.secondary' textAlign={'start'}>
                                            SunRise
                                        </Typography>
                                        <Typography variant="body2" color='text.secondary'>
                                            {new Date(weatherData?.sys.sunrise * 1000).toLocaleTimeString()}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box display={'flex'} gap={1} alignItems={'center'}>
                                    <Sunset />
                                    <Box>
                                        <Typography variant="body2" color='text.secondary' textAlign={'start'}>
                                            SunSet
                                        </Typography>
                                        <Typography variant="body2" color='text.secondary'>
                                            {new Date(weatherData?.sys.sunset * 1000).toLocaleTimeString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </>
                    )}
                </Grid>

                {/* Weather API V.S IOT Sensor Data */}
                <Grid size={{ xs: 12, md: 8 }} container flexDirection={'column'} justifyContent={'space-between'} >
                    <Grid bgcolor={'white'} color={'black'} borderRadius={2} p={2} sx={{ "&:hover": { transform: "scale(1.03)" }, transition: "all 0.3s ease-in-out" }}>
                        <Typography variant="h6" fontWeight={"bold"}>Weather API</Typography>
                        {weatherData?.weather && (
                            <Grid container justifyContent={"space-between"} spacing={2} flexDirection={{ xs: "column", sm: "row" }} mt={1} px={4}>
                                <Box textAlign={'center'}>
                                    <Thermometer color='red' size={35} />
                                    <Typography variant="body2" color='text.secondary'>Temperature</Typography>
                                    <Typography variant="body2"> {weatherData?.main.temp.toFixed()}°C</Typography>
                                </Box>
                                <Box textAlign={'center'}>
                                    <Sparkles color='yellow' size={35} />
                                    <Typography variant="body2" color='text.secondary'>Feels Like</Typography>
                                    <Typography variant="body2"> {weatherData?.main.feels_like.toFixed()}°C</Typography>
                                </Box>
                                <Box textAlign={'center'}>
                                    <CircleGauge color='orange' size={35} />
                                    <Typography variant="body2" color='text.secondary'>Pressure</Typography>
                                    <Typography variant="body2"> {weatherData?.main.pressure.toFixed()}hPa</Typography>
                                </Box>
                                <Box textAlign={'center'}>
                                    <Droplet color='blue' size={35} />
                                    <Typography variant="body2" color='text.secondary'>Humidity</Typography>
                                    <Typography variant="body2"> {weatherData?.main.humidity.toFixed()}%</Typography>
                                </Box>
                                <Box textAlign={'center'}>
                                    <Wind color='green' size={35} />
                                    <Typography variant="body2" color='text.secondary'>Wind Speed</Typography>
                                    <Typography variant="body2"> {weatherData?.wind.speed.toFixed()} m/s</Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>

                    <Grid bgcolor={'white'} color={'black'} borderRadius={2} p={2} sx={{ "&:hover": { transform: "scale(1.03)" }, transition: "all 0.3s ease-in-out" }}>
                        <Typography variant="h6" fontWeight={"bold"}>IOT Sensor</Typography>
                        {weatherData?.sensor && (
                            <Grid container justifyContent={"space-between"} spacing={2} flexDirection={{ xs: "column", sm: "row" }} mt={1} px={4}>
                                <Box textAlign={'center'}>
                                    <Thermometer color='red' size={35} />
                                    <Typography variant="body2" color='text.secondary'>Temperature</Typography>
                                    <Typography variant="body2"> {weatherData?.sensor.temperature}°C</Typography>
                                </Box>
                                <Box textAlign={'center'}>
                                    <Sparkles color='yellow' size={35} />
                                    <Typography variant="body2" color='text.secondary'>Feels Like</Typography>
                                    <Typography variant="body2"> {weatherData?.sensor.feelsLike}°C</Typography>
                                </Box>
                                <Box textAlign={'center'}>
                                    <CircleGauge color='orange' size={35} />
                                    <Typography variant="body2" color='text.secondary'>Pressure</Typography>
                                    <Typography variant="body2"> {weatherData?.sensor.pressure}hPa</Typography>
                                </Box>
                                <Box textAlign={'center'}>
                                    <Droplet color='blue' size={35} />
                                    <Typography variant="body2" color='text.secondary'>Humidity</Typography>
                                    <Typography variant="body2"> {weatherData?.sensor.humidity}%</Typography>
                                </Box>
                                <Box textAlign={'center'}>
                                    <Wind color='green' size={35} />
                                    <Typography variant="body2" color='text.secondary'>Wind Speed</Typography>
                                    <Typography variant="body2"> {weatherData?.sensor.wind.speed} m/s</Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            
            {/* Charts Section */}
            <Charts selectedCity={selectedCity} />
        </Box>
    )
}

export default WeatherDashboard