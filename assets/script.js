const apiKey = '47ce048f456d1fe36bdae6a97fd9b879';
const cityInput = document.querySelector('#city-input');
const searchButton = document.querySelector('#search-button');
const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');
let searchHistory = [];


// Search for city weather data and update UI
function searchCity(city) {
  // API call to get current and forecast weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Create current weather card
      const currentWeatherCard = createCurrentWeatherCard(data);
      currentWeather.innerHTML = '';
      currentWeather.appendChild(currentWeatherCard);

      // Add city to search history
      if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        createSearchHistory();
      }

      // API call to get 5-day forecast weather data
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Create forecast cards
          const forecastCards = createForecastCards(data);
          forecast.innerHTML = '';
          forecast.appendChild(forecastCards);
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
      alert('City not found. Please try again.');
    });
}

// Create current weather card
function createCurrentWeatherCard(data) {
  const currentWeatherCard = document.createElement('section');
  currentWeatherCard.classList.add('weather-card', 'current-weather');

  const city = document.createElement('h2');
  city.textContent = data.name;
  currentWeatherCard.appendChild(city);

  const date = document.createElement('p');
  date.textContent = new Date().toLocaleDateString();
  currentWeatherCard.appendChild(date);

  const icon = document.createElement('img');
  icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  icon.alt = data.weather[0].description;
  currentWeatherCard.appendChild(icon);

  const temperature = document.createElement('p');
  temperature.innerHTML = `Temperature: ${data.main.temp}&deg;C`;
  currentWeatherCard.appendChild(temperature);

  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  currentWeatherCard.appendChild(humidity);

  const windSpeed = document.createElement('p');
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  currentWeatherCard.appendChild(windSpeed);

  return currentWeatherCard;
}

// Create forecast cards
function createForecastCards(data) {
  const forecastCards = document.createElement('div');
  forecastCards.classList.add('forecast-cards');

  for (let i = 0; i < data.list.length; i += 8) {
    const forecastCard = document.createElement('section');
    forecastCard.classList.add('weather-card', 'forecast');

    const date = document.createElement('h2');
    date.textContent = new Date(data.list[i].dt * 1000).toLocaleDateString();
    forecastCard.appendChild(date);

    const icon = document.createElement('img');
    icon.src = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
    icon.alt = data.list[i].weather[0].description;
    forecastCard.appendChild(icon);

    const temperature = document.createElement('p');
    temperature.innerHTML

