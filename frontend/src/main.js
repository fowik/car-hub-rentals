import "bootstrap/dist/css/bootstrap.min.css";
import "vue3-toastify/dist/index.css";
import "leaflet/dist/leaflet.css";

import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import VueParticles from "vue-particles";
import router from "./router";
import store from "./store";

library.add(fas, far, fab);

createApp(App)
  .use(VueParticles)
  .component("fa", FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount("#app");
