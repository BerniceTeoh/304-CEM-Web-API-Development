const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

const app = express();
app.listen(3000, () =>
    console.log('Listening at 3000')
);
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));


const database = new Datastore('database.db');
database.loadDatabase();

//get data
app.get('/api', (request, response) => {
    database.find({},(err, data) =>{
        if (err){
            response.end();
            return;
        }
        response.json(data);
    });
});

//store data
app.post('/api', (request, response) =>{
    const data = request.body;
    database.insert(data);
    response.json(data);
});

//API 1
app.get('/location/:city', async (request, response) => {
    const city = request.params.city;
    const location_url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=88b5040ac450b0a898e2387e7fee7faf`;
    const location_response = await fetch(location_url);
    const location = await location_response.json();
    response.json(location);
});

//API 2
app.get('/weather/:latlon', async (request, response) => {
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    const weather_url = `https://api.darksky.net/forecast/1d4194e26f8d8a430355588136580373/${lat},${lon}`;
    const weather_response = await fetch(weather_url);
    const weather = await weather_response.json();
    response.json(weather);
});