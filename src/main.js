import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import router from "./router";
import store from "./store";
import "./assets/main.css";
// Vue Datepicker
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// sweetalert2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Vuetify
import "../node_modules/vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "vuetify/dist/vuetify.min.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labsComponents from "vuetify/labs/components";

const vuetify = createVuetify({
  ssr: true,
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App);
app.component("VueDatePicker", VueDatePicker);
app.use(store);
app.use(router);
app.use(vuetify);
app.use(VueSweetalert2);
app.mount("#app");
