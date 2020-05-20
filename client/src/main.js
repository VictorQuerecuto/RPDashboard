import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";
import { GOOGLE_API_KEY } from "./exports";

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_API_KEY,
    libraries: "places",
  },
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
}).$mount("#app");
