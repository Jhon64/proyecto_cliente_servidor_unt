<template>
  <div class="">
    <div>
      <Navbar></Navbar>
      <CRow class="mt-5">
        <CCol md="6" sm="6" xs="12" class="mx-auto">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h3 class="text-center">Login</h3>
                  <hr />

                  <CInput placeholder="Usuario" v-model="usuario">
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput placeholder="Clave" type="password" v-model="clave">
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="12" class="d-flex justify-content-center">
                      <CButton
                        color="primary"
                        class="btn btn-block btn-sm"
                        @click="logear()"
                        >Login
                      </CButton>
                    </CCol>
                    <CCol col="6" class="text-right"> </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>
                  si no tienes cuenta, registrate
                </p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                  @:click="redirect()"
                >
                  Registrar
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </div>
  </div>
</template>
<script>
import usuarioService from "../../../servicio/UsuarioService";
import Navbar from "../../../components/NavBar";
import Swal from "sweetalert2";
export default {
  name: "Login",
  data() {
    return {
      usuario: "",
      clave: "",
    };
  },
  components: { Navbar },
  created() {},

  methods: {
    redirect() {
      console.log("redireccionando");
      this.$router.push(
        "/registrar",
        () => {},
        () => {}
      );
    },
    logear() {
      console.log("enviando datos para logeo");
      let _vm = this;
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      let data = {
        usuario: this.usuario,
        clave: this.clave,
      };

      usuarioService
        .login(data)
        .then((result) => {
          Swal.close();
          if (result.status == 200) {
            let token = result.data.token;
            this.$store.commit("cargarUsuario", result.data.usuario);
            localStorage.setItem("tokenAuth", token);
            localStorage.removeItem("usuario");
            localStorage.setItem(
              "usuario",
              JSON.stringify({
                usuario: result.data.usuario.usuario,
                id: result.data.usuario.idUsuario,
                rol: result.data.usuario.rol,
              })
            );
            _vm.$toasted.global
              .appSuccess({
                mensaje: "Accediendo a la aplicación...",
              })
              .goAway(5000);
            location.href = "/Dashboard";
          } else {
            localStorage.removeItem("tokenAuth");
          }
        })
        .catch((error) => {
          _vm.$toasted.global
            .appError({
              mensaje: "clave y/o contraseña incorrecta",
            })
            .goAway(5000);
          this.$router.push(
            "/login",
            () => {},
            () => {}
          );
        });
    },
  },
};
</script>
