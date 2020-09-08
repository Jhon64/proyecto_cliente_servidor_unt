<template
  ><div class="mt-3">
    <CardEmpresa></CardEmpresa>
  </div>
</template>

<script>
import usuarioService from "../../../servicio/UsuarioService";
import CardEmpresa from "./components/CardEmpresa";
export default {
  components: { CardEmpresa },
  name: "VistaPrincipal",
  mounted() {
    this.verificarLogin();
  },
  methods: {
    async verificarLogin() {
      let token = localStorage.getItem("tokenAuth");
      if (token !== null) {
        let verificar = await usuarioService.verificarAutenticacion();
        if (verificar.status == 200 && verificar.statusText === "OK") {
          this.$router.push(
            "/dashboard",
            () => {},
            () => {}
          );
        }
      } else {
        this.$router.push(
          "/home",
          () => {},
          () => {}
        );
      }
    },
  },
};
</script>

<style></style>
