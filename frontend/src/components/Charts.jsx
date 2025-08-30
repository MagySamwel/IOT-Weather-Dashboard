import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Area, AreaChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

function Charts({ selectedCity }) {

    const [forecastData, setForecastData] = useState(null);
    const [hourlyData, setHourlyData] = useState(null);
    const [chartType, setChartType] = useState("temperature");

    const customToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            console.log(payload);
            return (
                <Grid bgcolor={'white'} p={1} borderRadius={2} boxShadow={3} color={'black'}>
                    <p>{`${payload[0].payload.condition.text}`}<img src={`${payload[0].payload.condition.icon}`} alt={`${payload[0].payload.condition.text}`} width={40} /></p>
                    <p>{`Time: ${payload[0].payload.time}`}</p>
                    <p>{`${chartType === "temperature" ? "API Temperature" : "API Humidity"}: ${payload[0].value}${chartType === "temperature" ? "°C" : "%"}`}</p>
                    <p>{`${chartType === "temperature" ? "Sensor Temperature" : "Sensor Humidity"}: ${payload[1].payload.sensor[chartType]}${chartType === "temperature" ? "°C" : "%"}`}</p>

                </Grid>
            );
        }
    };
    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/weather/forecast?city=${selectedCity}`);
                setForecastData(res.data.days);
                setHourlyData(res.data.hours);
                console.log(res.data);
            } catch (err) {
                console.error("Error fetching forecast weather:", err.message);
            }
        }
        fetchForecastData(); // initial call
    }, [selectedCity])
    return (

        <Grid container spacing={4} justifyContent={"space-between"} alignItems="center" mt={5}>
            <Grid size={{ xs: 12, md: 4 }} bgcolor={'white'} color={'black'} borderRadius={2} p={3} sx={{ "&:hover": { transform: "scale(1.03)" }, transition: "all 0.3s ease-in-out" }}>
                <Typography variant="h6" fontWeight={'bold'} mb={2}>Next 5 Days</Typography>
                {forecastData?.map((day) => (
                    <Grid key={day.date} container justifyContent={'space-between'} alignItems={'center'} mb={2} p={1} borderRadius={2} bgcolor={'#f0f0f0'}>
                        <Typography variant="subtitle1">{new Date(day.date * 1000).toUTCString().slice(0, -17)}</Typography>
                        <img src={day.condition.icon} alt={day.condition.text} width={50} />
                        <Typography variant="body1">{`${day.minTemp}°C / ${day.maxTemp}°C`}</Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid bgcolor={'white'} borderRadius={2} p={2} size={{ xs: 12, md: 8 }} container flexDirection={'column'} overflow={'auto'} >
                <Grid container justifyContent={'space-between'} alignItems={'center'} mb={2} >
                    <Typography variant="h6" color='black' fontWeight={'bold'}>Hourly {chartType === "temperature" ? "Temperature" : "Humidity"} Forecast</Typography>
                    <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                        <MenuItem value="temperature">Filter by Temperature</MenuItem>
                        <MenuItem value="humidity">Filter by Humidity</MenuItem>
                    </Select>
                </Grid>
                <Grid >
                    {hourlyData && (
                        <AreaChart width={890} height={450} data={hourlyData} >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey='time' />
                            <YAxis label={{ value: chartType === "temperature" ? 'Temp (°C)' : 'Humidity (%)', position: 'insideLeft', angle: -90 }} />
                            <Tooltip content={customToolTip} />
                            <Legend align="center" />
                            <Area type="monotone" dataKey={chartType === "temperature" ? "temp" : "humidity"} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey={chartType === "temperature" ? "sensor.temperature" : "sensor.humidity"} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>)}
                </Grid>
            </Grid>
        </Grid>

    )
}

export default Charts