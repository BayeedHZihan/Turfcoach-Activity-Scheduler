import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function WeatherDisplay() {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState(null);
    const [prob, setProb] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            await navigator.geolocation.getCurrentPosition(function(position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(res => res.json())
            .then(result => {
                if (result.main) setData(result)
                console.log(result);
            });

            await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
                .then(res => res.json())
                .then(result => {
                    // console.log("forcast rsult : ", result)
                    if (result && result.list) {
                        const forecastList = result.list;
                        // console.log('List : ', forecastList)
                        const currentDate = new Date();
                        const currentDay = currentDate.getDate();
                        const forecastToday = forecastList.filter(entry => {
                            const entryDate = new Date(entry.dt_txt);
                            return entryDate.getDate() === currentDay;
                        });
                        // console.log('forecast : ', forecastToday)
                        const probability = calculateProbability(forecastToday);
                        if (!isNaN(probability)) setProb(probability);
                    }
                })
        }
        fetchData();
    }, [lat, long]);

    const calculateProbability = (forecastToday) => {
        const probabilitySum = forecastToday.reduce((acc, val) => acc + val.pop, 0);
        return Math.round(probabilitySum/forecastToday.length*100);
    }

    return (
        <Container sx={{ mt: 4}}>
            <Card variant="outlined" sx={{ minWidth: 275, maxWidth: 400 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Weather
                    </Typography>
                    <Typography variant="h3" component="div">
                        { `${Math.round(data?.main?.temp)}°C` || "Not available"}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary">
                        { data?.weather[0]?.main || "" }
                    </Typography>
                    <Typography variant="body1">
                        {prob}% chance of precipitation today.
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}