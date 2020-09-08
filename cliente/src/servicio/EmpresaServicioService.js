import axios from "axios";
let token = localStorage.getItem("tokenAuth");

let Servicio = {
  async listar() {
    let lista = await axios({
      url: "/empresa/servicio/listar",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return lista;
  },

  async listarxEmpxserv(empresa, servicio) {
    let lista = await axios({
      url: `/empresa/servicio/catalogo/`,
      method: "post",
      data: { idEmpresa: empresa, idServicio: servicio },
      headers: { Authorization: `Bearer ${token}` },
    });
    return lista;
  },

  async registrar(data) {
    let result = await axios({
      method: "POST",
      data: data,
      url: "/empresa/servicio/registrar",
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async eliminar(id) {
    let result = await axios({
      method: "DELETE",
      url: `/empresa/servicio/eliminar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async buscar(id) {
    let result = await axios({
      method: "GET",
      url: `/empresa/servicio/buscar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },

  async actualizar(id, data) {
    let result = await axios({
      method: "PUT",
      url: `/empresa/servicio/actualizar/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data,
    });
    return result;
  },

  async subirImagen(imagen) {
    let result = await axios({
      method: "POST",
      data: imagen,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: "/empresa/servicio/subirImagen",
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  },
};

export default Servicio;
