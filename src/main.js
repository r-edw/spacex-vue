import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faBars,
  faCalendarAlt,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(faUserSecret, faBars, faCalendarAlt, faInfoCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import "./assets/styles/index.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
