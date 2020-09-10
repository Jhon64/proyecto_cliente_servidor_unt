import "core-js/stable";
import Vue from "vue";
import App from "./App";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./assets/icons/icons.js";
import store from "./store/";
import "core-js/stable";
import "regenerator-runtime/runtime";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faTrash,
  faPencilAlt,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VueHead from "vue-head";
import MaskedInput from "vue-text-mask";
import VueTheMask from "vue-the-mask";
import "./notificaciones/toasted";
import "./assets/scss/estilo.scss";
import Vuelidate from "vuelidate";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "./assets/css/mysqpaymentform.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.component("v-select", vSelect);

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

Vue.use(Antd);
Vue.use(Vuelidate);
Vue.use(VueTheMask);
Vue.component("masked-input", MaskedInput);
Vue.use(VueHead);
library.add(faUserSecret, faTrash, faPencilAlt);
Vue.component("Fa", FontAwesomeIcon);

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.prototype.$log = console.log.bind(console);

axios.interceptors.response.use(
  function(response) {
    /// Cualquier código de estado que se encuentre dentro del rango de 2xx hace que esta función se active
    // Haga algo con los datos de
    return response;
  },
  function(error) {
    Swal.close();
    if (error.response.status === 500) {
      Vue.toasted.error(
        `<p>status:${error.response.status} </p><br>
      <p>${error.response.statusText}</p><br>
      <p>${error.message}</p><br>`,
        {
          duration: 5000,
          dismissible: true,
        }
      );
    }

    if (error.response.status === 401) {
      localStorage.removeItem("tokenAuth");
      router.push(
        "/",
        () => {},
        () => {}
      );
      Vue.toasted.error(
        `status:${error.response.status}  <br>
      ${error.response.statusText} <br>
      ${error.message} <br>
      Error de autenticacion
      `,
        {
          duration: 5000,
          dismissible: true,
        }
      );
    }

    // Cualquier código de estado que esté fuera del gama de 2xx causa de esta función de desencadenar la
    // hacer algo con error de respuesta
    return Promise.reject(error);
  }
);

new Vue({
  el: "#app",
  router,
  store,
  icons,
  template: "<App/>",
  components: {
    App,
  },
});
