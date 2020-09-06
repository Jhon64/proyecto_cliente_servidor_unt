import axios from "axios";
let usuarioService = {
  async login(credenciales) {
    let result = await axios({
      baseURL: "http://localhost:4000",
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
      baseURL: "http://localhost:4000",
      url: "/usuario/crear",
      method: "POST",
      data: data,
    });
    return result;
  },

  async listarUsuarios() {
    let result = await axios({
      url: "/usuario/listar",
      method: "GET",
    });
    return result;
  },

  async buscarDni(dni) {
    let result = await axios({
      url: "/usuario/buscar/" + dni,
      method: "GET",
    });
    return result;
  },

  async registrarUsuario(data) {
    console.log("registrando");
    let result = await axios({
      url: "/usuario/registrar",
      method: "POST",
      data,
    });
    return result;
  },

  async eliminarUsuario(id) {
    let result = await axios({
      url: "/usuario/eliminar/" + id,
      method: "DELETE",
    });
    return result;
  },

  async buscarUsuarioId(id) {
    let result = await axios({
      url: "/usuario/buscar/id/" + id,
      method: "GET",
    });
    return result;
  },

  async actualizarUsuario(id, data) {
    let result = await axios({
      url: "/usuario/actualizar/" + id,
      method: "PUT",
      data,
    });
    return result;
  },
};

export default usuarioService;
