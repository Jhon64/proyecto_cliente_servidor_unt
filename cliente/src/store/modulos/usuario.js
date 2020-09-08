const usuarioModule = {
  state: {
    mensaje: "",
    usuario: {
      usuario: "",
      nombre: "",
      apellidos: "",
      avatar: "",
      rol: "",
      id: "",
    },
  },
  mutations: {
    cargarUsuario(state, usuario) {
      state.usuario.usuario = usuario.usuario;
      state.usuario.rol = usuario.rol;
      state.usuario.id = usuario.idUsuario;
    },
  },
  actions: {
    socket_login(opciones, credenciales) {
      console.log(opciones);
    },
  },
  getters: {},
};

export default usuarioModule;
