import axios from "axios";
let token = localStorage.getItem("tokenAuth");

let propietarioServicio = {
  async listarPropietario() {
    let lista = await axios({
      url: "/propietario/listar",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return lista;
  },

  async registrarPropietario(data) {
    let result = await axios({
      method: "POST",
      data: data,
      url: "/propietario/registrar",
    });
    return result;
  },

  async eliminarPropietario(id) {
    let result = await axios({
      method: "DELETE",
      url: `/propietario/eliminar/${id}`,
    });
    return result;
  },

  async buscarPropietario(id) {
    let result = await axios({
      method: "GET",
      url: `/propietario/buscar/${id}`,
    });
    return result;
  },

  async actualizarPropietario(id, data) {
    let result = await axios({
      method: "PUT",
      url: `/propietario/actualizar/${id}`,
      data,
    });
    return result;
  },
};

export default propietarioServicio;
