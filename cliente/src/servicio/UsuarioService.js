import axios from "axios";
let token = localStorage.getItem("tokenAuth");
let usuarioService = {
  async login(credenciales) {
    let result = await axios({
      url: "/login",
      method: "POST",
      data: credenciales,
    });
    if (result.status == 200) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
    return result;
  },

  async crear(data) {
    let result = await axios({
      url: "/usuario/crear",
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data: data,
    });
    return result;
  },

  async listarUsuarios() {
    let result = await axios({
      url: "/usuario/listar",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async buscarDni(dni) {
    let result = await axios({
      url: "/usuario/buscar/" + dni,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async registrarUsuario(data) {
    console.log("registrando");
    let result = await axios({
      url: "/usuario/registrar",
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data,
    });
    return result;
  },

  async eliminarUsuario(id) {
    let result = await axios({
      url: "/usuario/eliminar/" + id,
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    });
    return result;
  },

  async buscarUsuarioId(id) {
    let result = await axios({
      url: "/usuario/buscar/id/" + id,
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async actualizarUsuario(id, data) {
    let result = await axios({
      url: "/usuario/actualizar/" + id,
      headers: { Authorization: `Bearer ${token}` },
      method: "PUT",
      data,
    });
    return result;
  },

  async verificarAutenticacion() {
    let result = await axios({
      url: "/usuario/verificarAuth",
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
    });
    return result;
  },
};

export default usuarioService;
