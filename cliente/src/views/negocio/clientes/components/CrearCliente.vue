<template>
  <div>
    <CButton
      class="float-right btn btn-sm btn-outline-primary"
      style="border-radius:15px"
      @click="abrirModal()"
    >
      <span class="fa fa-plus">&nbsp;&nbsp;Nuevo&nbsp;&nbsp;</span>
    </CButton>
    <div class="clearfix"></div>
    <CModal title="Nueva Empresa" color="info" :show.sync="activarModal">
      <div>
        <div class="container-fluid">
          <div class="form-group" :class="{ 'bg-red': $v.ruc.$error }">
            <label>Ruc</label>
            <input
              v-model.trim="$v.ruc.$model"
              class="form-control"
              minlength="11"
              maxlength="11"
              @keyup="verificarRuc($event)"
            />
            <div class="error" v-if="!$v.ruc.required">Campo requerido</div>
          </div>

          <div class="form-group">
            <label>Razon Social</label>
            <input
              v-model.trim="$v.razonSocial.$model"
              required
              autcomplete="off"
              :class="{ 'bg-red': $v.razonSocial.$error }"
              class="form-control"
            />
            <div class="error" v-if="!$v.razonSocial.required">
              Campo requerido
            </div>
          </div>

          <div class="form-group">
            <label>Direccion</label>
            <input
              v-model.trim="$v.direccion.$model"
              autcomplete="off"
              required
              type="text"
              class="form-control"
            />
            <div class="error" v-if="!$v.direccion.required">
              Campo requerido
            </div>
          </div>

          <div class="form-group">
            <label>Correo</label>
            <MaskedInput
              type="text"
              name="correo"
              class="form-control"
              v-model="correo"
              :mask="emailmask"
              :guide="true"
            ></MaskedInput>
            <div class="error" v-if="!$v.correo.required">
              Campo requerido
            </div>
          </div>

          <div class="form-group">
            <label>Teléfono</label>
            <TheMask
              type="text"
              name="telefono"
              class="form-control"
              v-model="telefono"
              :mask="['+(51) ### ### ###']"
              :guide="true"
            ></TheMask>
            <div class="error" v-if="!$v.telefono.required">
              Campo requerido
            </div>
          </div>

          <div class="form-group">
            <label>Propietario</label>
            <select
              class="form-control form-sm"
              v-model.trim="$v.propietario.$model"
              required
            >
              <option
                v-for="(propietario, i) in propietarios"
                :value="propietario.IdPropietario"
                v-bind:key="i"
                >{{ propietario.Nombre }} {{ propietario.Apellido }}
              </option>
            </select>
            <div class="error" v-if="!$v.propietario.required">
              Campo requerido
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="float-right">
          <CButton
            color="secondary"
            @click="cerrarModal()"
            :variant="'outline'"
            class="mx-2"
            >Cancelar</CButton
          >
          <CButton
            color="primary"
            variant="outline"
            class="mx-2"
            type="button"
            @click="registrarUsuario()"
            >Registrar</CButton
          >
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
import empresaService from "../../../../servicio/EmpresaService";
import emailMask from "text-mask-addons/dist/emailMask";
import MaskedInput from "vue-text-mask";
import { TheMask } from "vue-the-mask";
import {
  required,
  minLength,
  maxLength,
  between,
} from "vuelidate/lib/validators";

import Datepicker from "vuejs-datepicker";
import usuarioService from "../../../../servicio/UsuarioService";
import propietarioService from "../../../../servicio/PropietarioService";
import Swal from "sweetalert2";

export default {
  name: "CrearUsuario",
  components: {
    MaskedInput,
    emailMask,
    Datepicker,
    TheMask,
  },

  data() {
    return {
      activarModal: false,
      ruc: "",
      razonSocial: "",
      correo: "",
      direccion: "",
      propietario: "",
      telefono: "",
      propietarios: [],
      emailmask: emailMask,
      mostrarCampos: false,
    };
  },
  validations: {
    ruc: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
    },
    razonSocial: {
      required,
      minLength: minLength(2),
    },
    direccion: {
      required,
      minLength: minLength(2),
    },
    correo: {
      required,
      minLength: minLength(2),
    },
    telefono: {
      required,
    },
    propietario: {
      required,
    },
  },
  props: ["refrescarLista"],

  methods: {
    abrirModal() {
      if (this.listarPropietarios()) {
        this.activarModal = true;
      } else {
        this.activarModal = false;
      }
    },
    async listarPropietarios() {
      let result = await propietarioService.listarPropietario();
      console.log(result);
      if (result.status == 200 && result.statusText === "OK") {
        this.propietarios = result.data;
        return true;
      } else {
        this.$toasted.global
          .appError({
            mensaje: "no se pudo cargar propietarios ",
          })
          .goAway(5000);
      }
      return false;
    },
    async verificarRuc(ruc) {
      let rucValdar = ruc.target.value;
      let numberRuc = parseInt(rucValdar);
      if (rucValdar >= 0 && rucValdar < 10000000000000) {
        if (rucValdar.trim().length === 11) {
          console.log(rucValdar);
          let resultBusqueda = await empresaService
            .verificarRuc(rucValdar)
            .catch((e) => {
              this.$toasted.global
                .appError({
                  mensaje: "no se encontró informacion ",
                })
                .goAway(5000);
              console.log(e);

              this.mostrarCampos = false;
            });

          console.log(resultBusqueda);
          if (resultBusqueda) {
            let data = resultBusqueda.data;
            let longuitud = data.length;
            if (longuitud > 0) {
              this.mostrarCampos = false;
              this.$toasted.global
                .appError({
                  mensaje: "Esta empresa ya se encuentra registrada ... ",
                })
                .goAway(5000);
            } else {
              this.mostrarCampos = false;
            }
            console.log(resultBusqueda);
          }
        } else {
          this.mostrarCampos = false;
        }
      } else {
        console.log(rucValdar.trim().length);

        this.mostrarCampos = false;
        this.$toasted.global
          .appError({
            mensaje: "Ruc incorrecto",
          })
          .goAway(3000);
      }
    },
    cerrarModal() {
      this.limpiar();
      this.activarModal = false;
    },
    limpiar() {
      this.ruc = "";
      this.razonSocial = "";
      this.direccion = "";
      this.telefono = "";
      this.correo = "";
      this.propietario = "";
    },
    async registrarUsuario(evt) {
      this.$toasted.global
        .appSuccess({
          mensaje: "enviando datos ..",
        })
        .goAway(1200);
      let data = {
        ruc: this.ruc,
        razonSocial: this.razonSocial,
        direccion: this.direccion,
        correo: this.correo,
        telefono: this.telefono,
        idPropietario: this.propietario,
      };
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      if (
        this.$v.ruc.required &&
        this.$v.razonSocial.required &&
        this.$v.correo.required &&
        this.$v.telefono.required &&
        this.$v.propietario.required
      ) {
        this.$toasted.global
          .appSuccess({
            mensaje: "registrando",
          })
          .goAway(3000);

        let resultRegistro = await empresaService.registrarEmpresa(data);
        console.log(resultRegistro);
        if (
          resultRegistro.status === 200 &&
          resultRegistro.statusText === "OK"
        ) {
          this.limpiar();
          this.activarModal = false;
          this.$toasted.global
            .appSuccess({
              mensaje: "Usuario registrado ....",
            })
            .goAway(3000);
          Swal.fire({
            position: "top-center",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.refrescarLista(true);
        } else {
          this.$toasted.global
            .appError({
              mensaje: "No se pudo registrar empresa",
            })
            .goAway(3000);
        }
      } else {
        this.$toasted.global
          .appError({
            mensaje: "completar todos los campos",
          })
          .goAway(3000);
        Swal.fire({
          icon: "error",
          title: "Oops...",
        });
      }
    },
  },
};
</script>

<style></style>
