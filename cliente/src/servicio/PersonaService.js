import axios from "axios";
let token = localStorage.getItem("tokenAuth");

let personaServicio = {
  async listar() {
    let lista = await axios({
      url: "/persona/listar",
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
      url: "/persona/registrar",
    });
    return result;
  },

  async eliminar(id) {
    let result = await axios({
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      url: `/persona/eliminar/${id}`,
    });
    return result;
  },
};

export default personaServicio;
