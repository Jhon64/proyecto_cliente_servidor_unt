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

  async eliminarPersona(id) {
    let result = await axios({
      method: "DELETE",
      url: `/persona/eliminar/${id}`,
    });
    return result;
  },
};

export default empleadoServicio;
