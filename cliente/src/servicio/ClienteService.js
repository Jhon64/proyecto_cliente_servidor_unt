import axios from "axios";
let token = localStorage.getItem("tokenAuth");

let Servicio = {
  async listar() {
    let lista = await axios({
      url: "/cliente/listar",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return lista;
  },

  async registrar(data) {
    let result = await axios({
      method: "POST",
      data: data,
      headers: { Authorization: `Bearer ${token}` },
      url: "/cliente/registrar",
    });
    return result;
  },

  async eliminar(id) {
    let result = await axios({
      method: "DELETE",
      url: `/cliente/eliminar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },
  async crear(data) {
    let result = await axios({
      url: "/cliente/crear",
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data: data,
    });
    return result;
  },
};

export default Servicio;
