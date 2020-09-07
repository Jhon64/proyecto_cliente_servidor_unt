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
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async eliminarPropietario(id) {
    let result = await axios({
      method: "DELETE",
      url: `/propietario/eliminar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async buscarPropietario(id) {
    let result = await axios({
      method: "GET",
      url: `/propietario/buscar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async actualizarPropietario(id, data) {
    let result = await axios({
      method: "PUT",
      url: `/propietario/actualizar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data,
    });
    return result;
  },
};

export default propietarioServicio;
