import axios from "axios";
let token = localStorage.getItem("tokenAuth");

let Servicio = {
  async listar() {
    let lista = await axios({
      url: "/reservacion/listar",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return lista;
  },

  async registrar(data) {
    let result = await axios({
      method: "POST",
      data: data,
      url: "/reservacion/registrar",
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async eliminar(id) {
    let result = await axios({
      method: "DELETE",
      url: `/reservacion/eliminar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async buscar(id) {
    let result = await axios({
      method: "GET",
      url: `/reservacion/buscar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async actualizar(id, data) {
    let result = await axios({
      method: "PUT",
      url: `/reservacion/actualizar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data,
    });
    return result;
  },
};

export default Servicio;
