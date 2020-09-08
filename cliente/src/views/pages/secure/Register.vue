<template>
  <div class="">
    <Navbar></Navbar>
    <CContainer fluid>
      <CRow class="justify-content-center mt-5">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h3 class="text-center">Registrar</h3>
                <hr />
                <CInput placeholder="Nombres" v-model="nombre">
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput placeholder="Apellidos" v-model="apellidos">
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Dni"
                  v-model="dni"
                  maxlenght="8"
                  minlenght="8"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput placeholder="Fecha de Nacimiento" v-model="fnacimiento">
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput placeholder="Correo" v-model="correo" prepend="@">
                </CInput>
                <CInput placeholder="Celular" v-model="celular">
                  <template #prepend-content
                    ><CIcon name="cil-mobile"
                  /></template>
                </CInput>
                <CInput placeholder="Usuario" v-model="usuario">
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
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
                  >Crear Cuenta</CButton
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
import usuarioServicio from "../../../servicio/UsuarioService";
import Navbar from "../../../components/NavBar";
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
      celular: "",
      tipo: "Cliente",
    };
  },
  components: { Navbar },
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
        celular: this.celular,
        dni: this.dni,
        tipo: "Cliente",
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
