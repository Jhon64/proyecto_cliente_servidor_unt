import axios from "axios";
let token = localStorage.getItem("tokenAuth");

let empleadoServicio = {
  async listarEmpelados() {
    let lista = await axios({
      url: "/empleado/listar",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return lista;
  },

  async registrarEmpleado(data) {
    let result = await axios({
      method: "POST",
      data: data,
      url: "/empleado/registrar",
    });
    return result;
  },

  async eliminarEmpleado(id) {
    let result = await axios({
      method: "DELETE",
      url: `/empleado/eliminar/${id}`,
    });
    return result;
  },

  async buscarEmpleado(id) {
    let result = await axios({
      method: "GET",
      url: `/empleado/buscar/${id}`,
    });
    return result;
  },

  async actualizarEmpleado(id, data) {
    let result = await axios({
      method: "PUT",
      url: `/empleado/actualizar/${id}`,
      data,
    });
    return result;
  },
};

export default empleadoServicio;
