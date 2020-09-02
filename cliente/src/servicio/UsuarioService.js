import axios from "axios";
let usuarioService = {
  async login(credenciales) {
    let result = await axios({
      baseURL: "http://localhost:4000",
      url: "/login",
      method: "POST",
      data: credenciales,
    });
    if (result.status == 200) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
    return result;
  },
};

export default usuarioService;
