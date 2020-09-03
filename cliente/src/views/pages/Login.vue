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
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="usuario"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    v-model="clave"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" :click="logear()"
                        >Login x</CButton
                      >
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0"
                        >Forgot password?</CButton
                      >
                      <CButton
                        color="link"
                        class="d-lg-none"
                        :click="redirect()"
                        >Register now!</CButton
                      >
                    </CCol>
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <CButton color="light" variant="outline" size="lg">
                  Register Now!
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
  methods: {
    redirect() {
      this.$router.push(
        "/registrar",
        () => {},
        () => {}
      );
    },
    async logear() {
      let data = {
        usuario: this.usuario,
        clave: this.clave,
      };
      let result = await usuarioService.login(data);
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
    },
  },
};
</script>
