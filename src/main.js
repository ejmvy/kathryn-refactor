import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";
import "./assets/styles/tailwind.css";
// import { Overlay } from "vuejs-overlay.js";
const emitter = mitt();

const app = createApp(App);

app.config.globalProperties.emitter = emitter;

app.use(store).use(router).use(VueAxios, axios).mount("#app");
