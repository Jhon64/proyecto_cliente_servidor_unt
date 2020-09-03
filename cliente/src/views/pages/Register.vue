<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <CInput placeholder="Nombres" v-model="nombre">
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput placeholder="Apellidos" v-model="apellidos">
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput placeholder="Dni" v-model="dni">
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput placeholder="Fecha de Nacimiento" v-model="fnacimiento">
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput placeholder="Correo" v-model="correo">
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput placeholder="Usuario" prepend="@" v-model="usuario" />
                <CInput placeholder="Clave" type="password">
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CInput
                  placeholder="Repetir clave"
                  type="password"
                  class="mb-4"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CButton color="success" block v-on:click="registrar()"
                  >Create Account</CButton
                >
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import usuarioServicio from "../../servicio/UsuarioService";
export default {
  name: "Register",
  data() {
    return {
      nombre: "",
      apellidos: "",
      correo: "",
      fnacimiento: "",
      validarClave: "",
      clave: "",
      usuario: "",
      dni: "",
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
        dni: this.dni,
        rol: 1,
      };
      let result = await usuarioServicio.crear(data);

      if (result.status == 200 || result.statusText == "Ok") {
        let token = result.data.token;
        localStorage.setItem("tokenAuth", token);
        this.$router.push(
          "/dashboard",
          () => {},
          () => {}
        );
      } else {
        localStorage.removeItem("tokenAuth");
      }
    },
  },
};
</script>
