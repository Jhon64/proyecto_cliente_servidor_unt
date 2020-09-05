import Vue from "vue";

const chatModule = {
  state: {
    mensaje: "",
  },
  mutations: {},
  actions: {
    socket_login(opciones, credenciales) {
      console.log(opciones);
    },
  },
  getters: {},
};

export default chatModule;
