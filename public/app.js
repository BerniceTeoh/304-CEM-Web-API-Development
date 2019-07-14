const button = document.getElementById('submit');
button.addEventListener('click', async event => {
    const city = document.getElementById('location').value;
    const location_url = `location/${city}`;
    const location_response = await fetch(location_url);
    const location = await location_response.json();
    lat = location.coord.lat;
    lon = location.coord.lon;
    country = location.sys.country
    document.getElementById('city').textContent = city;
    document.getElementById('country').textContent = country;
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lon;
    console.log(location);

    const weather_url = `weather/${lat},${lon}`;
    const weather_response = await fetch(weather_url);
    const weather = await weather_response.json();
    summary = weather.currently.summary;
    temperature = weather.currently.temperature;
    humidity = weather.currently.humidity;
    windSpeed = weather.currently.windSpeed;
    cloudCover = weather.currently.cloudCover;
    document.getElementById('summary').textContent = summary;
    document.getElementById('temperature').textContent = ((temperature-32)*5/9).toFixed(1);
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('windSpeed').textContent = windSpeed;
    document.getElementById('cloudCover').textContent = cloudCover;
    console.log(weather);

    const data = {city, lat, lon, summary,temperature, humidity, windSpeed, cloudCover};
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
       
    const dataIn = await fetch('/api', option);
    const database = await dataIn.json();
    console.log(database);
});
