<template>
  <div class="">
    <Navbar></Navbar>
    <CContainer fluid>
      <CRow class="justify-content-center mt-5">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm @submit.prevent="registrar()">
                <h3 class="text-center">Registrar</h3>
                <hr />
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><CIcon name="cil-user"></CIcon
                    ></span>
                  </div>
                  <TheMask
                    v-model="dni"
                    :mask="['########']"
                    class="form-control"
                    placeholder="Dni"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><CIcon name="cil-user"></CIcon
                    ></span>
                  </div>
                  <input
                    v-model="nombre"
                    type="text"
                    class="form-control"
                    placeholder="Nombres"
                    required
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><CIcon name="cil-user"></CIcon
                    ></span>
                  </div>
                  <input
                    v-model="apellidos"
                    type="text"
                    class="form-control"
                    placeholder="Apellidos"
                    required
                  />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><CIcon name="cil-user"></CIcon
                    ></span>
                  </div>
                  <Datepicker
                    v-model="fnacimiento"
                    input-class="form-control "
                    format="dd/MM/yyyy"
                    required
                    placeholder="Fecha nacimiento"
                  ></Datepicker>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><CIcon name="cil-user"></CIcon
                    ></span>
                  </div>
                  <MaskedInput
                    type="text"
                    name="correo"
                    class="form-control"
                    v-model="correo"
                    :mask="emailmask"
                    required
                    placeholder="correo"
                    :guide="true"
                  ></MaskedInput>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><CIcon name="cil-user"></CIcon
                    ></span>
                  </div>
                  <TheMask
                    type="text"
                    name="celular"
                    class="form-control"
                    v-model="celular"
                    :mask="['+(51) ### ### ###']"
                    :guide="true"
                    required
                    placeholder="Celular"
                  ></TheMask>
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><CIcon name="cil-user"></CIcon
                    ></span>
                  </div>
                  <input
                    class="form-control"
                    v-model="usuario"
                    placeholder="Usuario"
                    required
                  />
                </div>

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><CIcon name="cil-lock-locked"></CIcon
                    ></span>
                  </div>
                  <input
                    class="form-control"
                    v-model="clave"
                    placeholder="Clave"
                    required
                  />
                </div>
                <CButton type="submit" color="success" block
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
import Servicio from "../../servicio/ClienteService";
import emailMask from "text-mask-addons/dist/emailMask";
import MaskedInput from "vue-text-mask";
import { TheMask } from "vue-the-mask";
import Navbar from "../../components/NavBar";
import Datepicker from "vuejs-datepicker";
import Swal from "sweetalert2";

export default {
  name: "CrearEmpleado",
  components: {
    MaskedInput,
    emailMask,
    Datepicker,
    TheMask,
    Navbar,
  },

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
      emailmask: emailMask,
    };
  },
  props: ["refrescarLista"],
  methods: {
    async registrar() {
      console.log("registro");
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
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
      let result = await Servicio.crear(data);

      if (result.status == 200 || result.statusText == "Ok") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$toasted.global
          .appSuccess({
            mensaje: "Usuario Registrado",
          })
          .goAway(5000);
        let token = result.data.token;
        localStorage.setItem("tokenAuth", token);
        this.$router.push(
          "/dashboard",
          () => {},
          () => {}
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "no se pudo actualizar información",
        });
        localStorage.removeItem("tokenAuth");
      }
    },
  },
};
</script>

<style></style>
