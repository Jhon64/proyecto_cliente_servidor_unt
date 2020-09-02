<template>
  <div class="col-8 col-sm-4 col-lg-3 col-md-4  mx-auto pt-5">
    <div>
      <b-card title="Login" class="mb-2 text-center">
        <hr />
        <div class="form-group">
          <b-input-group size="sm" prepend="Usuario">
            <b-form-input v-model="usuario"></b-form-input>
          </b-input-group>
        </div>
        <div class="form-group">
          <b-input-group size="sm" prepend="Clave">
            <b-form-input v-model="clave"></b-form-input>
          </b-input-group>
        </div>
        <hr />
        <b-button
          size="sm"
          class="float-left"
          href="#"
          variant="primary"
          v-on:click="logear"
          >Entrar</b-button
        >
        <router-link
          to="/usuario/registrar"
          size="sm"
          variant="secondary"
          class="float-right"
          >Registrar</router-link
        >
      </b-card>
    </div>
  </div>
</template>
<script>
import usuarioService from "../../servicio/UsuarioService";
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
