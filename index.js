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

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let day = days[now.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day}, ${month} ${date}, ${year}`;

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
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function findCityWeather(city) {
  let apiKey = "b44a9bf56bc77c3722a82aafc305edd4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
findCityWeather("San Francisco");

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
       <div class="col-2">
         <div class="forecast-day">${day}</div>
         <img src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="34"
            />
            <div class="forecast-temp-range">
              <span class="forecast temp-range-max">
                18</span> 
                <span class="forecast-temp-range-min">
                  12</span>
                </div>
       </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureValue = document.querySelector("#temperature-value");
  let descriptionElement = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celTemperature = Math.round(response.data.main.temp);

  temperatureValue.innerHTML = `${temperature}°`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  let fahrTemperature = (celTemperature * 9) / 5 + 32;
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = Math.round(fahrTemperature);
}

function convertCelsius(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = celTemperature;
}
let celTemperature = null;

displayForecast();

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", convertFahrenheit);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", convertCelsius);
