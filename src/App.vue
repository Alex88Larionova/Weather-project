<script setup>

import { computed, ref } from "vue";
import { getCountries } from "./net/countries.js";
import { getWeatherData } from "./net/weather.js";
import HomeView from "./views/HomeView/HomeView.vue";
import SettingsView from "./views/SettingsView/SettingsView.vue";



const apiKey = "10062ad5a7ba422b08c19480331446c9";
const apiBase = "https://api.openweathermap.org/data/2.5/weather";
const apiLat = "55.75";
const apiLon = "37.61";
const weatherData = ref({});
const showSettingsWindow = ref(false);
const showWeathersWindow = ref(true);
const savedLocations = ref([])
const selectedLocation = ref('')
const tempUnit = ref('celsius')
const tempUnitList = ref(['celsius', 'fahrenheit'])
const weatherTemp = ref('')
const isActiveTemp = ref(false);

const countries = ref({});

const tempUnitSymbol = computed(() =>{
  return tempUnit.value === 'celsius' ? '°C' : '°F'
})

const tempText = computed(() =>{
  return weatherData.value?.main?.temp.toFixed(0) + tempUnitSymbol.value
})

const formattedUnit = computed(() =>{
  return tempUnit.value === 'celsius' ? 'metric' : 'imperial'
})

function closeSettings() {
  showSettingsWindow.value = false;
  showWeathersWindow.value = true;
}

function openSettings() {
  showSettingsWindow.value = true;
  showWeathersWindow.value = false;
}

async function setTempUnit(value) {
tempUnit.value = value
await fetchWeather()
}

/* async function getCurrentPosition() {
  return new Promise(async (resolve, reject) => {
    if (window?.navigator?.geolocation) {
      const currentPosition =
        await window.navigator.geolocation.getCurrentPosition(resolve);
    }
  });
} */

/* getCurrentPosition(); */

async function fetchWeather() {
  weatherData.value = await getWeatherData(apiKey, apiBase, apiLat, apiLon, formattedUnit.value);

}

async function main() {
  await fetchWeather()
  countries.value = await getCountries();
}

main();
</script>

<template>
  <HomeView
    v-if="showWeathersWindow"
    :weather-data="weatherData"
    :show-weathers-window="showWeathersWindow"
    :show-settings-window="showSettingsWindow"
    :selected-temp-units="selectedTempUnits"
    :temp-text="tempText"
    @openSettings="openSettings"
    @main="main"
  />
  <SettingsView
    v-if="showSettingsWindow"
    :weather-data="weatherData"
    :show-settings-window="showSettingsWindow"
    :countries="countries"
    :selected-temp-units="selectedTempUnits"
    :weather-temp="weatherTemp"
    :temp-unit-list="tempUnitList"
    @closeSettings="closeSettings"
    @changeWeatherTemp="changeWeatherTemp"
    @setTempUnit="setTempUnit"
  />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200&family=Roboto:wght@100;300;400&display=swap");

body {
  background-color: #e9e9ef;
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
</style>
