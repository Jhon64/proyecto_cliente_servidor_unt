<template
  ><div class="container-fluid">
    <div class="row">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import usuarioService from "../servicio/UsuarioService";
export default {
  data() {
    return {
      usuario: "",
      clave: "",
    };
  },
  methods: {
    async logear() {
      let data = {
        usuario: this.usuario,
        clave: this.clave,
      };
      let result = await usuarioService.login(data);
      if (result.status == 200) {
        let token = result.data.token;
        localStorage.setItem("tokenAuth", token);
      } else {
        localStorage.removeItem("tokenAuth");
      }
    },
  },
};
</script>
