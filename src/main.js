import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";
import "./assets/styles/tailwind.css";

createApp(App).use(store).use(router).use(VueAxios, axios).mount("#app");
