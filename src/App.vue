<script setup>
import { ref, computed } from "vue";

const apiKey = "10062ad5a7ba422b08c19480331446c9";
const weatherData = ref({});
const showSettingsWindow = ref(false);
const showWeathersWindow = ref(true);
const isActiveTemp = ref(false);

const windDirection = computed(() => {
  const windDeg = weatherData.value.wind.deg;
  if (windDeg === 0) {
    return "E";
  } else if (windDeg === 90) {
    return "N";
  } else if (windDeg === 180) {
    return "W";
  } else if (windDeg === 270) {
    return "S";
  } else if (windDeg > 0 && windDeg < 90) {
    return "NE";
  } else if (windDeg > 90 && windDeg < 180) {
    return "NW";
  } else if (windDeg > 180 && windDeg < 270) {
    return "SW";
  } else if (windDeg > 270 && windDeg < 360) {
    return "SE";
  }
  return windDeg;
});

const icon = computed(() => {
  const iconDescription = weatherData.value.weather[0].description;
  if (iconDescription === "broken clouds") {
    return "cloudy_snowing";
  } else if (iconDescription === "sunny") {
    return "sunny";
  }
  return "sunny";
});

const weatherTempFahrenheit = computed(() => {
  const temp = weatherData.value.main.temp.toFixed(0) + "°F";
  return temp;
});

const weatherTempCelsius = computed(() => {
  const tempC =
    (weatherTempFahrenheit.value.slice(0, -2) / 32).toFixed(0) + "°C";
  return tempC;
});

const weatherFeelsLikeFahrenheit = computed(() => {
  const temp = weatherData.value.main.feels_like.toFixed(0) + "°F";
  return temp;
});

const weatherFeelsLikeCelsius = computed(() => {
  const tempC =
    (weatherFeelsLikeFahrenheit.value.slice(0, -2) / 32).toFixed(0) + "°C";
  return tempC;
});

function changeTemp() {
  isActiveTemp.value = isActiveTemp.value ? false : true;
  console.log(isActiveTemp);
}

function openSettings() {
  showSettingsWindow.value = true;
  showWeathersWindow.value = false;
}

function closeSettings() {
  showSettingsWindow.value = false;
  showWeathersWindow.value = true;
}

async function getWeatherData() {
  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=55.75&lon=37.61&appid=${apiKey}`
  );
  weatherData.value = await result.json();
}

async function getCurrentPosition() {
  return new Promise(async (resolve, reject) => {
    if (window?.navigator?.geolocation) {
      const currentPosition =
        await window.navigator.geolocation.getCurrentPosition(resolve);
      console.log(currentPosition);
    }
  });
}

getCurrentPosition();

getWeatherData();

const isActive = ref(false);

function toggle() {
  isActive.value = isActive.value ? false : true;
  console.log(isActive);
}
</script>

<template>
  <div class="app__weather" v-if="weatherData.main">
    <div class="app__weather-main" v-if="showWeathersWindow">
      <div class="app__header">
        <div class="app__weather-name">
          {{ weatherData.name }}
        </div>
        <div class="app__weather-toolbar">
          <span class="material-symbols-outlined"> chevron_left </span>
          <span class="material-symbols-outlined"> chevron_right </span>
          <span class="material-symbols-outlined" @click="openSettings">
            settings
          </span>
        </div>
      </div>

      <div class="app__weather-temp" id="app__weather-temp" @click="changeTemp">
        {{ isActiveTemp ? weatherTempCelsius : weatherTempFahrenheit }}
      </div>
      <span class="material-symbols-outlined" id="weather-icon">{{
        icon
      }}</span>
      <div class="app__weather-features-main">
        <div class="app__weather-features-name">
          {{ weatherData.weather[0].description }}
        </div>
        <div class="app__weather-features-feels-like-temp">
          feels like
          {{
            isActiveTemp ? weatherFeelsLikeCelsius : weatherFeelsLikeFahrenheit
          }}
        </div>
      </div>
      <p></p>
      <div class="app__weather-features">
        <div class="app__weather-features-item" id="app__weather-humidity">
          {{ weatherData.main.humidity }}%
        </div>
        <div class="app__weather-features-item" id="app__weather-pressure">
          {{ weatherData.main.pressure }} hPa
        </div>
        <div class="app__weather-features-item" id="app__weather-speed">
          {{ weatherData.wind.speed }}m/s
        </div>
        <div class="app__weather-features-item" id="app__weather-deg">
          {{ windDirection }}
        </div>
      </div>
    </div>
  </div>
  <div class="app__settings-window" v-if="showSettingsWindow">
    <span class="material-symbols-outlined" @click="closeSettings">close </span>
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
  width: 100%;
  text-align: center;
  display: flex;
  /*  flex-direction: row; */
  align-items: baseline;
  justify-content: space-between;
  padding: 12px 20px;
}

.app__weather-toolbar {
  display: flex;
  margin-right: 20px;
  margin-top: 10px;
  gap: 16px;
}

.app__weather-name {
  margin-left: 20px;
  font-size: 20px;
}

.app__weather-main {
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
  transition: 0.7 ease-in;
}

.app__weather-main p {
  background-color: rgb(180, 180, 180);
  height: 1px;
  width: 70%;
}

.app__settings-window {
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
  transition: 0.7 ease-in;
}

.app__weather-features {
  font-size: 16px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 30px 30px;
  gap: 10px;
  margin-top: 0px;
  margin-bottom: 20px;
  text-align: center;
  /* height: 10%; */
}

#app__weather-temp {
  cursor: pointer;
  font-weight: 300;
  font-size: 40px;
  letter-spacing: 3px;
  transition: 0.7 ease-in;
}

.material-symbols-outlined {
  cursor: pointer;
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}

#weather-icon {
  font-size: 42px;
  color: rgb(82, 82, 82);
  margin: 0;
}
</style>
