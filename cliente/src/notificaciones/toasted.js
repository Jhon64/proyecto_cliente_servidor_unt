import Vue from "vue";
import Toasted from "vue-toasted";
Vue.use(Toasted);

//configurando de manera global las notficaciones
//mensaje de error
Vue.toasted.register(
  "Error",
  (payload) => {
    if (!payload.mensaje) {
      return "mensaje de error no proveido";
    }
    return payload.mensaje;
  },
  { type: "error" }
);

//mensaje de app error
Vue.toasted.register(
  "appError",
  (payload) => {
    if (!payload.mensaje) {
      return "mensaje de error no definido";
    }
    return payload.mensaje;
  },
  {
    type: "error",
  }
);

//mensaje success
Vue.toasted.register(
  "appSuccess",
  (payload) => {
    if (!payload.mensaje) {
      return "mensaje de no proveido";
    }
    return payload.mensaje;
  },
  { type: "success" }
);

//mensaje info
Vue.toasted.register(
  "appInfo",
  (payload) => {
    if (!payload.mensaje) {
      return "mensaje de no proveido";
    }
    return payload.mensaje;
  },
  { type: "info" }
);

//mensaje primary
Vue.toasted.register(
  "appPrimary",
  (payload) => {
    if (!payload.mensaje) {
      return "mensaje de no proveido";
    }
    return payload.mensaje;
  },
  { type: "primary" }
);
