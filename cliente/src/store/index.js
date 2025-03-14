import Vue from "vue";
import Vuex from "vuex";
import notificacionesModule from "./modulos/notificaciones";
import usuarioModule from "./modulos/usuario";

Vue.use(Vuex);

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: false,
};

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarOpened ? false : "responsive";
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarClosed ? true : "responsive";
  },
  set(state, [variable, value]) {
    state[variable] = value;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    notificacionesModule,
    usuarioModule,
  },
});
