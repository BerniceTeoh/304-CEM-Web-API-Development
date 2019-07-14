getData();

async function getData(){                
    const response = await fetch('/api');
    const data = await response.json();

             
    for(item of data){
        const root = document.createElement('p');
        const city = document.createElement('p');
        const lat = document.createElement('p');
        const lon = document.createElement('p');
        const summary = document.createElement('p');
        const temperature = document.createElement('p');
        const humidity = document.createElement('p');
        const windSpeed = document.createElement('p');
        const cloudCover = document.createElement('p');
        

        city.textContent = `City: ${item.city}`;
        lat.textContent = `Latitude: ${item.lat}`;
        lon.textContent = `Longitude: ${item.lon}`;
        summary.textContent = `Summary: ${item.summary}`;
        temperature.textContent = `Temperature: ${item.temperature}`;
        humidity.textContent = `Humidity: ${item.humidity}`;
        windSpeed.textContent = `Wind Speed: ${item.windSpeed}`;
        cloudCover.textContent = `Cloud Cover: ${item.cloudCover}`;
                    
        root.append(city, lat, lon, summary, temperature, humidity, windSpeed, cloudCover);
        document.body.append(root);

};
    
    

    console.log(data);
};