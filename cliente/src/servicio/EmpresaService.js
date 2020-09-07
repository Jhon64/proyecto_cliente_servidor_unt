import axios from "axios";
let token = localStorage.getItem("tokenAuth");

let empresaServicio = {
  async listarEmpresa() {
    let lista = await axios({
      url: "/empresa/listar",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return lista;
  },

  async registrarEmpresa(data) {
    let result = await axios({
      method: "POST",
      data: data,
      url: "/empresa/registrar",
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async eliminarEmpresa(id) {
    let result = await axios({
      method: "DELETE",
      url: `/empresa/eliminar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async buscarEmpresa(id) {
    let result = await axios({
      method: "GET",
      url: `/empresa/buscar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async actualizarEmpresa(id, data) {
    let result = await axios({
      method: "PUT",
      url: `/empresa/actualizar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data,
    });
    return result;
  },

  async verificarRuc(ruc) {
    let result = await axios({
      method: "GET",
      url: `/empresa/buscar/ruc/${ruc}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },
};

export default empresaServicio;
