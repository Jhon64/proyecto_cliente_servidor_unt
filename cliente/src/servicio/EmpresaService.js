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
    });
    return result;
  },

  async eliminarEmpresa(id) {
    let result = await axios({
      method: "DELETE",
      url: `/empresa/eliminar/${id}`,
    });
    return result;
  },

  async buscarEmpresa(id) {
    let result = await axios({
      method: "GET",
      url: `/empresa/buscar/${id}`,
    });
    return result;
  },

  async actualizarEmpresa(id, data) {
    let result = await axios({
      method: "PUT",
      url: `/empresa/actualizar/${id}`,
      data,
    });
    return result;
  },

  async verificarRuc(ruc) {
    let result = await axios({
      method: "GET",
      url: `/empresa/buscar/ruc/${ruc}`,
    });
    return result;
  },
};

export default empresaServicio;
