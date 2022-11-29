<script setup>
import { computed, ref, watch } from 'vue';



const props = defineProps({
  showSettingsWindow: Boolean,
  showWeathersWindow: Boolean,
  countries: Array,
  weatherTemp:String,
  weatherData: Object,
  tempUnit:String,
  tempUnitList:Array
});

const emit = defineEmits(["closeSettings", "openSettings", "changeWeatherTemp", "setTempUnit"]);

const tempUnit = ref('')
const search = ref('')

const matchedSearchLocations = computed(() => {
  if(search.value === ''){
    return []  }
  const matchedSearchLocations = []
 props.countries.data.forEach(country => {
    country.cities.forEach(city => {
    if(city.toLowerCase().includes(search.value.toLowerCase())){
       matchedSearchLocations.push({
        city, 
        countryCode: country.iso2,
        country:country.country})
      }
 })
 })
 return matchedSearchLocations
})

/* watch(selectedLocation, (newValue) =>{
console.log(newValue);
}) */

watch(tempUnit, (newValue) =>{
emit('setTempUnit', newValue)
})

tempUnit.value = 'celsius'

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
      <p class="app__settings-p">
        Saved locations
      </p>
      <div class="app__saved-locations">
        <input
          v-model="search"
          class="app__select-country"
        >
        <div>
          {{ matchedSearchLocations }}
        </div>
      </div>
      <div class="app__units">
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
</template>

<style>
.app__settings{
margin-left: 20px;

}

.app__settings-window {
  font-family: "Roboto", sans-serif;
  color: rgb(88, 88, 88);
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: column;
  width: 300px;
  height: 400px;
  background-color: rgb(227, 225, 225);
  border-radius: 20px;
  box-shadow: 0 0 2px 4px hsl(0deg 0% 100% / 10%),
    -12px -12px 32px hsl(0deg 0% 100% / 50%), 12px 12px 32px rgb(0 0 0 / 10%);
  transition: 0.7s ease-in;
}

.app__settings-p{
  color:rgb(165, 165, 165);
  text-transform: uppercase;
  font-size: 14px;
  margin-left: 5px;
}

.app__settings-window-header {
  padding: 12px 0px 0px 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.app__settings-window-header p {
  font-size: 20px;
  font-weight: 0;
  margin-left: 0;
  margin-top: 10px;
  margin-bottom: 0;
}

#app__close-settings-btn {
  margin-right: 40px;
  font-size: 20px;
}

.app__select-country{
  width: 90%;
}
</style>
