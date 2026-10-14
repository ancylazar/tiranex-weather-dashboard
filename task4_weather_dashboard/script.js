(() => {
  'use strict';
  const form = document.getElementById('searchForm');
  const input = document.getElementById('cityInput');
  const status = document.getElementById('status');
  const card = document.getElementById('weatherCard');
  const $ = id => document.getElementById(id);
  const codeInfo = code => {
    if (code === 0) return ['Clear sky', '☀'];
    if ([1, 2, 3].includes(code)) return ['Mainly clear / partly cloudy', '⛅'];
    if ([45, 48].includes(code)) return ['Foggy', '🌫'];
    if ([51, 53, 55, 56, 57].includes(code)) return ['Drizzle', '🌦'];
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return ['Rain', '🌧'];
    if ([71, 73, 75, 77, 85, 86].includes(code)) return ['Snow', '❄'];
    if ([95, 96, 99].includes(code)) return ['Thunderstorm', '⛈'];
    return ['Current conditions', '🌤'];
  };
  async function fetchWeather(city) {
    status.className = 'status';
    status.textContent = 'Searching for city and fetching current weather…';
    card.classList.add('hidden');
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
      const geoResponse = await fetch(geoUrl);
      if (!geoResponse.ok) throw new Error('City lookup service is unavailable. Try again later.');
      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0) throw new Error(`No city found for "${city}". Check the spelling and try again.`);
      const place = geoData.results[0];
      const params = new URLSearchParams({
        latitude: place.latitude, longitude: place.longitude,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
        timezone: 'auto'
      });
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      if (!weatherResponse.ok) throw new Error('Weather service is unavailable. Please try again.');
      const data = await weatherResponse.json();
      if (!data.current) throw new Error('Weather data was not returned for this city.');
      const current = data.current;
      const [description, icon] = codeInfo(current.weather_code);
      $('place').textContent = [place.name, place.admin1, place.country].filter(Boolean).join(', ');
      $('condition').textContent = description;
      $('temp').textContent = Math.round(current.temperature_2m);
      $('humidity').textContent = `${current.relative_humidity_2m}%`;
      $('wind').textContent = `${current.wind_speed_10m} km/h`;
      $('feels').textContent = `Feels like ${Math.round(current.apparent_temperature)}°C`;
      $('feelsMetric').textContent = `${Math.round(current.apparent_temperature)}°C`;
      $('weatherIcon').textContent = icon;
      $('updated').textContent = `Weather observation time: ${current.time.replace('T', ' ')} (local to city)`;
      card.classList.remove('hidden');
      status.textContent = 'Weather updated successfully.';
    } catch (error) {
      status.className = 'status error';
      status.textContent = error.message || 'Something went wrong. Check your internet connection and try again.';
    }
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const city = input.value.trim();
    if (!city) {
      status.className = 'status error';
      status.textContent = 'Please enter a city name.';
      input.focus();
      return;
    }
    fetchWeather(city);
  });
})();
