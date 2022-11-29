import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./localization/i18n";
import router from "./router";

import "./assets/main.css";
import "./icons/css/weather-icons-wind.css";
import "./icons/css/weather-icons-wind.min.css";
import "./icons/css/weather-icons.css";
import "./icons/css/weather-icons.min.css";

const app = createApp(App);

app.use(router);
app.use(i18n);

app.mount("#app");
