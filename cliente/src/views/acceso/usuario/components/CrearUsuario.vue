<template>
  <div>
    <CButton
      class="float-right btn btn-sm btn-outline-primary"
      style="border-radius:15px"
      @click="activarModal = true"
    >
      <span class="fa fa-plus">&nbsp;&nbsp;Nuevo&nbsp;&nbsp;</span>
    </CButton>
    <div class="clearfix"></div>
    <CModal
      title="Nuevo Usuario"
      color="primary"
      :show.sync="activarModal"
      :footer="false"
    >
      <div>
        <div class="container-fluid">
          <div class="form-group" :class="{ 'bg-red': $v.dni.$error }">
            <label>buscar persona por Dni</label>
            <input
              v-model.trim="$v.dni.$model"
              class="form-control"
              minlength="8"
              maxlength="8"
              @keyup="verificarDni($event)"
            />
            <div class="error" v-if="!$v.dni.required">Campo requerido</div>
            <div v-if="infoPersona !== null">
              Persona : {{ infoPersona.nombre + " " + infoPersona.apellidos
              }}<br />
              Tipo : {{ infoPersona.tipoPersona }}<br />
            </div>
            <div v-else></div>
          </div>
          <div v-show="mostrarCampos">
            <CInput
              label="Usuario"
              v-model.trim="$v.usuario.$model"
              required
              autcomplete="off"
              :class="{ 'bg-red': $v.usuario.$error }"
            />
            <div class="error" v-if="!$v.usuario.required">Campo requerido</div>
            <CInput
              label="Clave"
              v-model.trim="$v.clave.$model"
              autcomplete="off"
              required
              type="password"
            />
            <div class="error" v-if="!$v.clave.required">Campo requerido</div>
            <CInput
              label="Repetir clave"
              v-model.trim="$v.repetirClave.$model"
              type="password"
              autcomplete="off"
              required
            />
            <div class="error" v-if="!$v.repetirClave.required">
              Campo requerido
            </div>
            <div class="error" v-if="!verificarClave">
              claves no coinciden
            </div>
            <div class="form-group">
              <label>Tipo Usuario</label>
              <select
                class="form-control form-sm"
                v-model.trim="$v.tipoUsuario.$model"
                required
              >
                <option value="1">Administrador</option>
                <option value="2">Empleado</option>
                <option value="3">Cliente</option>
              </select>
              <div class="error" v-if="!$v.tipoUsuario.required">
                Campo requerido
              </div>
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
            v-show="mostrarCampos"
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
import Modal from "../../../../components/coreui/Modal";
import empleadoService from "../../../../servicio/EmpleadoService";
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
import Swal from "sweetalert2";
export default {
  name: "CrearUsuario",
  components: {
    Modal,
    MaskedInput,
    emailMask,
    Datepicker,
    TheMask,
  },

  data() {
    return {
      activarModal: false,
      dni: "",
      usuario: "",
      clave: "",
      repetirClave: "",
      tipoUsuario: "",
      verificarClaves: true,
      personaEncontrado: false,
      mostrarCampos: false,
      infoPersona: null,
    };
  },
  validations: {
    dni: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(8),
    },
    usuario: {
      required,
      minLength: minLength(2),
    },
    clave: {
      required,
      minLength: minLength(2),
    },
    repetirClave: {
      required,
      minLength: minLength(2),
    },
    tipoUsuario: {
      required,
    },
  },
  props: ["refrescarLista"],
  computed: {
    verificarClave() {
      let repeatClave = this.repetirClave;
      if (repeatClave === this.clave) {
        this.verificarClaves = true;
        return true;
      } else {
        this.verificarClaves = false;
        return false;
      }
    },
  },
  methods: {
    async verificarDni(dni) {
      let dniValdar = dni.target.value;
      let numberDni = parseInt(dniValdar);
      if (dniValdar >= 0 && dniValdar < 1000000000) {
        if (dniValdar.trim().length === 8) {
          console.log(dniValdar);
          let resultBusqueda = await usuarioService
            .buscarDni(dniValdar)
            .catch((e) => {
              this.$toasted.global
                .appError({
                  mensaje: "no se encontró informacion ",
                })
                .goAway(5000);
              console.log(e);
              this.infoPersona = null;
              this.mostrarCampos = false;
            });
          if (resultBusqueda) {
            let data = resultBusqueda.data;
            let longuitud = data.length;
            if (longuitud > 0) {
              this.infoPersona = {
                nombre: data[0].nombre,
                apellidos: data[0].apellido,
                tipoPersona: data[0].tipo,
                id: data[0].id,
              };
              if (data[0].usuario !== null) {
                this.personaEncontrado = true;
                this.mostrarCampos = false;
                this.$toasted.global
                  .appSuccess({
                    mensaje: "esta persona ya tiene usuario registrado ",
                  })
                  .goAway(5000);
              } else {
                this.personaEncontrado = false;
                this.mostrarCampos = true;
              }
            } else {
              this.mostrarCampos = false;
              this.infoPersona = null;
              this.$toasted.global
                .appError({
                  mensaje:
                    "Esta persona no se encuentra registrada ...<br>por favor registre ",
                })
                .goAway(5000);
            }
            console.log(resultBusqueda);
          }
        } else {
          this.infoPersona = null;
          this.mostrarCampos = false;
        }
      } else {
        console.log(dniValdar.trim().length);
        this.infoPersona = null;
        this.mostrarCampos = false;
        this.$toasted.global
          .appError({
            mensaje: "Dni incorrecto",
          })
          .goAway(3000);
      }
    },
    cerrarModal() {
      this.limpiar();
      this.activarModal = false;
    },
    limpiar() {
      this.usuario = "";
      this.clave = "";
      this.repetirClave = "";
      this.tipoUsuario = "";
    },
    async registrarUsuario(evt) {
      this.$toasted.global
        .appSuccess({
          mensaje: "enviando datos ..",
        })
        .goAway(1200);
      let data = {
        clave: this.clave,
        usuario: this.usuario,
        repetirClave: this.repetirClave,
        rol: this.tipoUsuario,
        idPersona: this.infoPersona.id,
      };
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      if (
        this.$v.tipoUsuario.required &&
        this.$v.dni.required &&
        this.$v.usuario.required &&
        this.$v.clave.required &&
        this.$v.repetirClave.required &&
        this.verificarClaves
      ) {
        this.$toasted.global
          .appSuccess({
            mensaje: "registrando",
          })
          .goAway(3000);

        let resultRegistro = await usuarioService.registrarUsuario(data);
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
              mensaje: "No se pudo registrar el empleado",
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
