let now = new Date();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

let h2 = document.querySelector("h2");
h2.innerHTML = `${month} ${date}, ${year}`;

let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let h3 = document.querySelector("h3");
h3.innerHTML = `${hour}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    findCityWeather(searchInput.value);
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }
}
let form = document.querySelector("#search-for-city");
form.addEventListener("submit", searchCity);

function findCityWeather(city) {
  let apiKey = "b44a9bf56bc77c3722a82aafc305edd4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
findCityWeather("San Francisco");

function showTemperature(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureValue = document.querySelector("#temperature-value");
  let descriptionElement = document.querySelector("#conditions");
  temperatureValue.innerHTML = `${temperature}°`;
  descriptionElement.innerHTML = response.data.weather[0].description;
}
function findWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b44a9bf56bc77c3722a82aafc305edd4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findWeather);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 63;
}

function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 17;
}
let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", convertFahrenheit);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", convertCelsius);
