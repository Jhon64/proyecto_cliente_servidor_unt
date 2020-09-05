<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Ingresar a tu cuenta</p>
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
                    <CCol col="6" class="text-center">
                      <CButton color="primary" class="px-4" @click="logear()"
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
    </CContainer>
  </div>
</template>
<script>
import usuarioService from "../../servicio/UsuarioService";

export default {
  name: "Login",
  data() {
    return {
      usuario: "",
      clave: "",
    };
  },
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
      let data = {
        usuario: this.usuario,
        clave: this.clave,
      };
      usuarioService.login(data).then((result) => {
        if (result.status == 200) {
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
      });
    },
  },
};
</script>
