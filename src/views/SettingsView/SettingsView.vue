<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  showSettingsWindow: Boolean,
  showWeathersWindow: Boolean,
  countries: Array,
  weatherTemp: String,
  weatherData: Object,
  tempUnit: String,
  tempUnitList: Array,
  savedLocations: Array,
  exampleSavedLocations: Array
})


const emit = defineEmits(['closeSettings', 'openSettings', 'changeWeatherTemp', 'setTempUnit', 'addSavedLocation', 'removeSavedLocation', 'removeExampleSavedLocation'])

const tempUnit = ref('')
const search = ref('')

const matchedSearchLocations = computed(() => {
  if(search.value === ''){
    return [] }
  const matchedSearchLocations = []
  props.countries.data.forEach(country => {
    country.cities.forEach(city => {
      if(city.toLowerCase().includes(search.value.toLowerCase())){
        matchedSearchLocations.push({
          city,
          countryCode: country.iso2,
          country: country.country })
      }
    })
  })
  return matchedSearchLocations
})

/* watch(selectedLocation, (newValue) =>{
console.log(newValue);
}) */

watch(tempUnit, newValue => {
  emit('setTempUnit', newValue)
})

tempUnit.value = 'Celsius'

</script>

<template>
  <div
    v-if="props.showSettingsWindow"
    class="app__settings-window"
  >
    <div class="app__settings-window-header">
      <p>{{ $t("settings") }}</p>
      <span
        id="app__close-settings-btn"
        class="material-symbols-outlined"
        @click="emit('closeSettings')"
      >close
      </span>
    </div>
    <div class="app__settings">
      <p>
        Saved locations
      </p>
      <div class="app__saved-locations">
        <div
          v-for="(item, index) in exampleSavedLocations"
          :key="index"
          class="app__example-saved-locations"
          @click="emit('changeSelectedLocation', item)"
        >
          {{ item.city }}, {{ item.countryCode }}
          <span
            id="saved-location-delete-button"
            class="material-symbols-outlined"
            @click.stop="emit('removeExampleSavedLocation', index)"
          >
            delete
          </span>
        </div>
        <div
          v-for="(item, index) in savedLocations"
          :key="index"
          class="app__saved-locations-item"
          @click="emit('changeSelectedLocation', item)"
        >
          {{ item.city }}, {{ item.countryCode }}
          <span
            id="saved-location-delete-button"
            class="material-symbols-outlined"
            @click.stop="emit('removeSavedLocation', index)"
          >
            delete
          </span>
        </div>
      </div>
      <p>
        Add locations
      </p>
      <div class="app__select-country">
        <label>Enter city name</label>
        <input
          v-model="search"
          class="app__select-country-input"
          placeholder="City name"
        >
      </div>
      <div class="matched-location-container">
        <div
          v-for="(item, index) in matchedSearchLocations"
          :key="index"
          class="matched-location-item"
          @click="emit('addSavedLocation', item)"
        >
          {{ item.city }}, {{ item.countryCode }}
        </div>
      </div>
      <div class="app__settings-options">
        <p>Options</p>
        <div class="app__units">
          <label>Tempreture units</label>
          <select
            v-model="tempUnit"
            class="app__select-tempUnits"
          >
            <option
              v-for="(option, index) in props.tempUnitList"
              :key="index"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          {{ weatherTemp }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>

:root {
  --items-border-color: rgb(196, 196, 196);
  --container-border-color:  rgb(196, 196, 196);
  --text-dark-color: rgb(108, 108, 108);
  --text-light-color: rgb(165, 165, 165);
  --settings-window-background-color: rgb(230, 230, 230);
  --scrollbar-background-color:  rgb(227, 225, 225);
  --scrollbar-thumb-color:  rgb(204, 204, 204);
  --select-locations-input-focus-color: rgb(74, 134, 255);
}

.app__settings::-webkit-scrollbar {
 width: 5px;
 margin-right: 10px;
}

.app__settings::-webkit-scrollbar-track {
  background-color: var(--scrollbar-background-color);
}

.app__settings::-webkit-scrollbar-thumb {
  border-radius: 20px;
  border: 3px solid var(--scrollbar-thumb-color);
}

.app__settings {
  width: 100%;
  padding: 15px;
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  box-sizing: border-box;
}

.app__settings-window {
  font-family: "Open", sans-serif;
  color: var(--text-dark-color);
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: column;
  width: 320px;
  height: 400px;
  background-color: var(--settings-window-background-color);
  border-radius: 20px;
  border: solid 1px rgb(228, 228, 228);
  box-shadow: 0 0 2px 4px hsl(0deg 0% 100% / 10%),
    -12px -12px 32px hsl(0deg 0% 100% / 50%), 12px 12px 32px rgb(0 0 0 / 10%);
  transition: 0.7s ease-in;
}

.app__settings p {
  color:var(--text-light-color);
  text-transform: uppercase;
  font-size: 14px;
}

.app__settings-window-header {
  padding: 12px 0px 0px 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.app__settings-window-header p {
  font-size: 20px;
  color:var(--text-dark-color);
  font-weight: 0;
  margin-left: 0;
  margin-top: 10px;
  margin-bottom: 0;
}

#app__close-settings-btn {
  margin-right: 40px;
  font-size: 20px;
}

.app__select-country {
  width: 100%;
  display: block;
  position: relative;
  box-sizing: border-box;
}

.app__select-country-input {
  width: 100%;
  background-color: transparent;
  border: solid 1px var(--items-border-color);
  padding: 12px 10px 8px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  outline: 0;
  margin-bottom: 10px;
  color: var(--text-dark-color);
}

.app__select-country-input:focus {
  border-bottom: solid 3px var(--select-locations-input-focus-color);
  color: var(--select-locations-input-focus-color) ;
}

.app__select-country label {
  font-size: 14px;
  color: var(--text-dark-color);
  position: absolute;
        top: -8px;
        left: 10px;
  background-color: var(--settings-window-background-color);
  font-weight: lighter;
}

.app__units {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  box-sizing: border-box;
}

.app__units select {
  width: 100%;
  background-color: transparent;
  color: var(--text-dark-color);
  border: solid 1px var(--items-border-color);
  padding: 12px 10px 8px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  outline: 0;
  font-size: 16px;
}

.app__units select:focus {
  border-bottom: solid 3px var(--select-locations-input-focus-color);
  color: var(--select-locations-input-focus-color) ;
}

.app__units label {
  font-size: 14px;
  color: var(--text-dark-color);
  position: absolute;
        top: -8px;
        left: 10px;
  background-color: var(--settings-window-background-color);
  font-weight: lighter;
}

.app__units option {
  background-color: var(--settings-window-background-color);
}

.matched-location-container {
  width: 100%;
  display: block;
  max-height: 100px;
  min-height: auto;
  overflow-y: auto;
  border: solid 1px var(--container-border-color);
}

.matched-location-container::-webkit-scrollbar {
  width: 5px;
}

.matched-location-container::-webkit-scrollbar-track {
  background: var(--scrollbar-background-color);
}

.matched-location-container::-webkit-scrollbar-thumb {
  border-radius: 20px;
  border: 3px solid var(--scrollbar-thumb-color);
}

.matched-location-item {
  cursor: pointer;
  padding: 5px;
  font-size: 14px;
  border: 0;
}

.matched-location-item:hover {
  background-color:  var(--scrollbar-background-color);
  color: var(--select-locations-input-focus-color);
}

.matched-location-item:active {
  transform: scale(0.8);
}

.app__example-saved-locations,
.app__saved-locations-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: auto;
  border: 0;
  box-shadow: -2px -2px 8px hsl(0deg 0% 100% / 60%), 2px 2px 8px rgb(0 0 0 / 10%);
  border-radius: 4px;
  margin: 16px 0;
  padding: 12px;
  font-size: 16px;
  color: var(--text-dark-color);
}

.app__example-saved-locations:active,
.app__saved-locations-item:active {
color: var(--select-locations-input-focus-color);
transform: scale(0.98);
}

#saved-location-delete-button {
  cursor: pointer;
  z-index: 1;
}

#saved-location-delete-button:hover {
  color: var(--select-locations-input-focus-color);
}

#saved-location-delete-button:active {
  transform: scale(0.8);
}

.app__select-tempUnits {
  background-color: transparent;
}

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

</style>
