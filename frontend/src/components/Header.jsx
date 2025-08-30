import Typography from '@mui/material/Typography'
import Filters from '../components/Filters'
import Grid from '@mui/material/Grid'
import RefreshIcon from '@mui/icons-material/Refresh';
function Header(props) {

    return (
        <Grid container spacing={2} justifyContent={"space-between"} alignItems="center">
            <Grid item textAlign={{ xs: 'center', sm: 'left' }}>
                <Typography variant="h4" fontWeight="bold" py={1} fontSize={{ xs: '1.8rem', md: '2.2rem' }}>Weather Dashboard</Typography>
                <Typography variant="body2">Real-time weather data and IoT sensor monitoring</Typography>
            </Grid>
            {/* Selection fFilter  */}
            <Grid item>
                <Filters {...props} />
            </Grid>

            <Grid item alignItems="center" textAlign={"right"} fontWeight={100} display={{ xs: 'none', md: 'block' }} >
                <RefreshIcon sx={{ fontSize: 20, fontWeight: 100, marginRight: .5, transform: "translateY(5px)" }} />
                Last Updated: {props.latest.toLocaleTimeString()}
            </Grid>
        </Grid>
    )
}

export default Header