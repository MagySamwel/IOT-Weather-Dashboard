import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

function Filters(props) {

    return (
        <Grid container spacing={{xs:5 ,md:10}} justifyContent={'center'} >
            <FormControl sx={{ minWidth: 120 }} >
                <InputLabel>Country</InputLabel>
                <Select
                    sx={{ backgroundColor: "white", borderRadius: "20px" }}
                    value={props.selectedCountry}
                    onChange={(e) => props.setSelectedCountry(e.target.value)}
                >
                    {props.countries.map((country) => (
                        <MenuItem key={country.isoCode} value={country.isoCode} >
                            {country.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>City</InputLabel>
                <Select
                    sx={{ backgroundColor: "white", borderRadius: "20px" }}
                    value={props.selectedCity}
                    onChange={(e) => props.setSelectedCity(e.target.value)}
                >
                    {props.cities.map((city) => (
                        <MenuItem key={city.name} value={city.name}>
                            {city.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </Grid>
    )
}

export default Filters