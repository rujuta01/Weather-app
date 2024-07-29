document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');
    const weatherIcon = document.getElementById('weather-icon');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');

    const APIKey = '9131ead93e983324f35bf3345851ee1c'; // Replace with your actual API key

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();

        if (city === '') {
            alert('Please enter a city name');
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(json => {
                if (json.cod === '404') {
                    alert('City not found');
                    return;
                }

                const weatherMain = json.weather[0].main;
                const temperature = json.main.temp;
                const description = json.weather[0].description;
                const humidity = json.main.humidity;
                const windSpeed = json.wind.speed;

                switch (weatherMain) {
                    case 'Clear':
                        weatherIcon.src = 'clear.png';
                        break;
                    case 'Rain':
                        weatherIcon.src = 'rain.png';
                        break;
                    case 'Snow':
                        weatherIcon.src = 'snow.png';
                        break;
                    case 'Clouds':
                        weatherIcon.src = 'clouds.png';
                        break;
                    case 'Mist':
                        weatherIcon.src = 'mist1.png';
                        break;
                    case 'Haze':
                        weatherIcon.src = 'haze.png';
                        break;
                    default:
                        weatherIcon.src = 'default.png';
                }

                temperatureElement.innerHTML = `${Math.round(temperature)}<span>°C</span>`;
                descriptionElement.innerHTML = description;
                humidityElement.innerHTML = `${humidity}%`;
                windSpeedElement.innerHTML = `${Math.round(windSpeed)}Km/h`;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to fetch weather data. Please check your API key and network connection.');
            });
    });
});
