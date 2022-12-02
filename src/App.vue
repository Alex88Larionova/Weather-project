<script setup>

import { computed, ref } from 'vue'
import { getCountries } from './net/countries.js'
import { getWeatherData } from './net/weather.js'
import HomeView from './views/HomeView/HomeView.vue'
import SettingsView from './views/SettingsView/SettingsView.vue'



const apiKey = '10062ad5a7ba422b08c19480331446c9'
const apiBase = 'https://api.openweathermap.org/data/2.5/weather'
const apiLat = '55.75'
const apiLon = '37.61'
const weatherData = ref({})
const showSettingsWindow = ref(false)
const showWeathersWindow = ref(true)
const savedLocations = ref([])
const exampleSavedLocations = ref([
  { city: 'Moscow',
    countryCode: 'RU' },
  { city: 'New York',
    countryCode: 'US' }])
const selectedLocation = ref({
  city: '',
  countryCode: ''
})
const tempUnit = ref('Celsius')
const tempUnitList = ref(['Celsius', 'Fahrenheit'])
const weatherTemp = ref('')
const isActiveTemp = ref(false)
const apiFetchType = ref('coord')

const countries = ref({})

const tempUnitSymbol = computed(() => tempUnit.value === 'Celsius' ? '°C' : '°F')

const tempText = computed(() => weatherData.value?.main?.temp.toFixed(0) + tempUnitSymbol.value)

const formattedUnit = computed(() => tempUnit.value === 'Celsius' ? 'metric' : 'imperial')

function closeSettings() {
  showSettingsWindow.value = false
  showWeathersWindow.value = true
}

function openSettings() {
  showSettingsWindow.value = true
  showWeathersWindow.value = false
}

async function setTempUnit(value) {
  tempUnit.value = value
  await fetchWeather()
}

function addSavedLocation(location) {
  savedLocations.value.push(location)
}

async function changeSelectedLocation(location) {
  selectedLocation.value = location
  apiFetchType.value = 'city'
  await fetchWeather()

}

function removeExampleSavedLocation(index) {
  exampleSavedLocations.value.splice(index, 1)
}

function removeSavedLocation(index) {
  savedLocations.value.splice(index, 1)
}

async function fetchWeather() {
  weatherData.value = await getWeatherData({ apiKey,
    apiBase,
    apiLat,
    apiLon,
    unit: formattedUnit.value,
    type: apiFetchType.value,
    city: selectedLocation.value.city,
    countryCode: selectedLocation.value.countryCode })

}

async function main() {
  await fetchWeather()
  countries.value = await getCountries()
}

main()
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
    :saved-locations="savedLocations"
    :example-saved-locations="exampleSavedLocations"
    @closeSettings="closeSettings"
    @changeWeatherTemp="changeWeatherTemp"
    @setTempUnit="setTempUnit"
    @addSavedLocation="addSavedLocation"
    @changeSelectedLocation="changeSelectedLocation"
    @removeSavedLocation="removeSavedLocation"
    @removeExampleSavedLocation="removeExampleSavedLocation"
  />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200&family=Roboto:wght@100;300;400&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400&family=Montserrat:wght@200&family=Open+Sans:wght@300;400&family=PT+Serif:wght@400;700&family=Roboto:wght@100;300;400&display=swap');

body {
  background-color: #e9e9ef;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>
