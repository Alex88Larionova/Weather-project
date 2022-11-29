<script setup>
import { computed } from "vue";

const props = defineProps({
  showSettingsWindow: Boolean,
  showWeathersWindow: Boolean,
  weatherData: Object,
  selectedTempUnits:String,
  weatherTemp:String,
  tempText:String
});


const emit = defineEmits(["main", "closeSettings", "openSettings", "changeWeatherTemp"]);

const windDirection = computed(() => {
  const windDeg = props.weatherData?.wind?.deg;
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

const windDegIcon = computed(() => {
  if (windDirection.value === "E") {
    return "wi wi-wind towards-90-deg";
  } else if (windDirection.value === "N") {
    return "wi wi-wind towards-0-deg";
  } else if (windDirection.value === "W") {
    return "wi wi-wind towards-270-deg";
  } else if (windDirection.value === "S") {
    return "wi wi-wind towards-180-deg";
  } else if (windDirection.value === "NE") {
    return "wi wi-wind towards-45-deg";
  } else if (windDirection.value === "NW") {
    return "wi wi-wind towards-313-deg";
  } else if (windDirection.value === "SW") {
    return "wi wi-wind towards-225-deg";
  } else if (windDirection.value === "SE") {
    return "wi wi-wind towards-135-deg";
  }
  return windDegIcon;
});

const iconClass = computed(() => {
  const iconDescription = props.weatherData?.weather[0]?.description;
  if (iconDescription === "broken clouds") {
    return "wi wi-day-cloudy";
  } else if (iconDescription === "sunny") {
    return "wi wi-day-sunny";
  } else if (iconDescription === "moderate rain") {
    return "wi wi-rain";
  } else if (iconDescription === "light rain") {
    return "wi wi-day-rain";
  } else if (iconDescription === "mist") {
    return "wi wi-fog";
  } else if (iconDescription === "overcast clouds") {
    return "wi wi-cloudy";
  } else if (iconDescription === "snow") {
    return "wi wi-snow";
  } else if (iconDescription === "light snow") {
    return "wi wi-snow";
  }
  return "wi wi-day-sunny";
});

function changeTemp() {
  isActiveTemp.value = !isActiveTemp.value;
}
</script>

<template>
  <div
    v-if="weatherData.main"
    class="app__weather"
  >
    {{ props.selectedTempUnits }}
    <div
      v-if="props.showWeathersWindow"
      class="app__weather-main"
    >
      <div class="app__header">
        <div class="app__weather-name">
          {{ weatherData.name }}
        </div>
        <div class="app__weather-toolbar">
          <span class="material-symbols-outlined"> chevron_left </span>
          <span class="material-symbols-outlined"> chevron_right </span>
          <span
            class="material-symbols-outlined"
            @click="emit('openSettings')"
          >
            settings
          </span>
        </div>
      </div>

      <div
        id="app__weather-temp"
        class="app__weather-temp"
        @click="changeTemp"
      >
        {{ props.tempText }}
      </div>
      <i :class="iconClass" />
      <div class="app__weather-features-main">
        <div class="app__weather-features-name">
          {{ weatherData.weather[0].description }}
        </div>
        <div class="app__weather-features-feels-like-temp">
          feels like
          {{ weatherTemp }}
        </div>
      </div>
      <p />
      <div class="app__weather-features">
        <div
          id="app__weather-humidity"
          class="app__weather-features-item"
        >
          <i class="wi wi-humidity" /> {{ weatherData.main.humidity }}%
        </div>
        <div
          id="app__weather-pressure"
          class="app__weather-features-item"
        >
          <i class="wi wi-barometer" /> {{ weatherData.main.pressure }} hPa
        </div>
        <div
          id="app__weather-speed"
          class="app__weather-features-item"
        >
          <i class="wi wi-strong-wind" /> {{ weatherData.wind.speed }}m/s
        </div>
        <div
          id="app__weather-deg"
          class="app__weather-features-item"
        >
          <i :class="windDegIcon" /> {{ windDirection }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.app__header {
  width: 100%;
  text-align: center;
  display: flex;
  /*  flex-direction: row; */
  align-items: baseline;
  justify-content: space-between;
  padding: 10px 20px;
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
  background-color: rgb(230, 230, 230);
  border-radius: 20px;
  box-shadow: 0 0 2px 4px hsl(0deg 0% 100% / 10%),
    -12px -12px 32px hsl(0deg 0% 100% / 50%), 12px 12px 32px rgb(0 0 0 / 10%);
  transition: 0.7 ease-in;
}

.app__weather-main p {
  background-color: rgb(180, 180, 180);
  height: 1px;
  width: 70%;
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

.app__weather-features i {
  font-size: 18px;
}

.app__weather-features-main {
  text-align: center;
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

.wi {
  font-size: 40px;
}
</style>
