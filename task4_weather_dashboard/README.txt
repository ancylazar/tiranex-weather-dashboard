TASK 4 — SKYCAST WEATHER DASHBOARD
Topic: Asynchronous JavaScript & RESTful APIs

FILES
- index.html: page structure
- style.css: responsive dashboard styling
- script.js: Fetch API, async/await, JSON processing and error handling

RUN
1. Keep all three files in the same folder.
2. Open index.html in Chrome or Edge.
3. Ensure internet access is enabled.
4. Search for a city such as Chennai, Vellore, London or Paris.

FEATURES
- City search using a public geocoding REST API
- Current weather data using Open-Meteo
- Displays temperature, condition, humidity, wind speed and feels-like temperature
- Parses JSON responses and dynamically updates the DOM
- async/await and Fetch API
- Handles unknown cities, service errors and network failures
- Responsive desktop/mobile interface

API PROVIDERS
- Open-Meteo Geocoding API: https://geocoding-api.open-meteo.com/
- Open-Meteo Forecast API: https://open-meteo.com/en/docs

TEST PLAN
1. Search Chennai; verify current weather is displayed.
2. Search Vellore; verify the location/weather updates.
3. Search a nonsense city name; verify a helpful error appears.
4. Disconnect internet and search again; verify failure is handled.
5. Resize the browser to check responsive layout.

NOTES
Weather data requires an internet connection. No API key is required for this demonstration.

DEPLOYMENT
This is a static site. It can be published using GitHub Pages, Netlify or Vercel by uploading the three files. Weather features still require an internet connection.
