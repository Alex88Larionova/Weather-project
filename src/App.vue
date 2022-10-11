<script setup>
import { ref } from "vue";

const apiKey = "10062ad5a7ba422b08c19480331446c9";
const weatherData = ref({});
const weatherDataTemperature = ref("");

async function getWeatherData() {
  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`
  );
  weatherData.value = await result.json();
}

getWeatherData();
</script>

<template>
  <div class="app__weather" v-if="weatherData.main">
    <div class="app__header">
      <div>{{ weatherData.coord.lon }}; {{ weatherData.coord.lat }}</div>
      <span class="material-symbols-outlined"> chevron_left </span>
      <span class="material-symbols-outlined"> chevron_right </span>
      <span class="material-symbols-outlined"> settings </span>
    </div>
    <div class="app__weather-features" id="app__weather-temp">
      {{ (weatherData.main.temp / 32).toFixed(0) }}°C
    </div>
    <span class="material-symbols-outlined">sunny</span>
    <div class="app__weather-features" id="app__weather-humidity">
      {{ weatherData.main.humidity }}%
    </div>
    <div class="app__weather-features" id="app__weather-pressure">
      {{ weatherData.main.pressure }}°
    </div>
    <div class="app__weather-features" id="app__weather-speed">
      {{ weatherData.wind.speed }}m/s
    </div>
    <div class="app__weather-features" id="app__weather-deg">
      {{ weatherData.wind.deg }}
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200&family=Roboto:wght@100;300;400&display=swap");

body {
  background-color: rgb(235, 235, 235);
  height: 100vh;
  width: 100vw;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.app__header {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.app__weather {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: rgb(88, 88, 88);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 400px;
  background-color: rgb(227, 225, 225);
  border-radius: 30px;
  box-shadow: 6px 12px 20px rgb(173, 172, 172);
}

.app__weather-features {
  height: 10%;
}

#app__weather-temp {
  font-weight: 300;
  font-size: 36px;
  letter-spacing: 3px;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
