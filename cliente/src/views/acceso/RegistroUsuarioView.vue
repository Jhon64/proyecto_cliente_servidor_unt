<template>
  <div class="col-sm-6 mx-auto pt-5">
    <b-container fluid>
      <b-card title="Nuevo Usuario " class="text-center">
        <hr />
        <div class="card-body">
          <b-row class="my-1">
            <b-col sm="3">
              <label>Nombres</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                type="text"
                size="sm"
                v-model="nombre"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label>Apellidos</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                type="text"
                size="sm"
                v-model="apellidos"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label>Fecha Nacimiento</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                type="text"
                size="sm"
                v-model="fnacimiento"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label>Correo electr&oacute;nico</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                type="text"
                size="sm"
                v-model="correo"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label>Usuario</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                type="text"
                size="sm"
                v-model="usuario"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label>Clave</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                type="text"
                size="sm"
                v-model="clave"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label>verificar clave</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                type="text"
                size="sm"
                v-model="validarClave"
              ></b-form-input>
            </b-col>
          </b-row>
          <hr />
          <button
            class="btn btn-sm btn-block btn-primary"
            v-on:click="registrar()"
          >
            Registrar
          </button>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import usuarioServicio from "../../servicio/UsuarioService";
export default {
  data() {
    return {
      nombre: "",
      apellidos: "",
      correo: "",
      fnacimiento: "",
      validarClave: "",
      clave: "",
      usuario: "",
    };
  },
  methods: {
    async registrar() {
      console.log("registro");
      let data = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        correo: this.correo,
        fechaNacimiento: this.fnacimiento,
        clave: this.clave,
        usuario: this.usuario,
        rol: 1,
      };
      let result = await usuarioServicio.crear(data);
      console.log(result);
    },
  },
};
</script>
