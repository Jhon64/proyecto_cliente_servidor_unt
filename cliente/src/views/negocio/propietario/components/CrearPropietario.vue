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
    <Modal
      title="Nuevo Propietario"
      color="primary"
      :show.sync="activarModal"
      :footer="false"
    >
      <div>
        <div class="container-fluid">
          <div class="form-group">
            <label>Dni</label>
            <TheMask v-model="dni" :mask="['########']" class="form-control" />
          </div>
          <CInput label="Nombre" v-model="nombre" required />
          <CInput label="Apellidos" v-model="apellido" required />
          <div class="form-group">
            <label>Fecha Nacimiento</label>
            <Datepicker
              v-model="fechaNacimiento"
              input-class="form-control "
              format="dd/MM/yyyy"
              required
            ></Datepicker>
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
          </div>
          <div class="form-group">
            <label>Celular</label>
            <TheMask
              type="text"
              name="celular"
              class="form-control"
              v-model="celular"
              :mask="['+(51) ### ### ###']"
              :guide="true"
            ></TheMask>
          </div>
        </div>

        <hr />
        <div>
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
              v-on:click="registrar($event)"
              >Registrar</CButton
            >
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "../../../../components/coreui/Modal";
import propietarioService from "../../../../servicio/PropietarioService";
import emailMask from "text-mask-addons/dist/emailMask";
import MaskedInput from "vue-text-mask";
import { TheMask } from "vue-the-mask";
import Swal from "sweetalert2";
import Datepicker from "vuejs-datepicker";

export default {
  name: "CrearEmpleado",
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
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      dni: "",
      correo: "",
      celular: "",
      negocio: null,
      tipoEmpleado: null,
      emailmask: emailMask,
    };
  },
  props: ["refrescarLista"],
  methods: {
    limpiarDatos() {
      this.nombre = "";
      this.apellido = "";
      this.dni = "";
      this.fechaNacimiento = "";
      this.correo = "";
      this.celular = "";
      this.negocio = "";
      this.tipoEmpleado = "";
    },
    cerrarModal() {
      this.activarModal = false;
      this.limpiarDatos();
    },
    async registrar(evt) {
      let _vm = this;
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      this.$toasted.global
        .appSuccess({
          mensaje: "registrando Propietario",
        })
        .goAway(1200);
      let data = {
        nombre: this.nombre,
        apellido: this.apellido,
        dni: this.dni,
        fechaNacimiento: this.fechaNacimiento,
        correo: this.correo,
        celular: this.celular,
        tipo: "Propietario",
      };
      console.log(data);
      let resultRegistro = await propietarioService.registrarPropietario(data);
      console.log(resultRegistro);
      if (resultRegistro.status === 200 && resultRegistro.statusText === "OK") {
        this.cerrarModal();
        Swal.fire({
          position: "top-center",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$toasted.global
          .appPrimary({
            mensaje: "propietario registrada ....",
          })
          .goAway(3000);

        this.refrescarLista(true);
      } else {
        this.$toasted.global
          .appError({
            mensaje: "No se pudo registrar la empresa",
          })
          .goAway(3000);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "no se pudo actualizar información",
        });
      }

      //let resulRegistro = await empleadoService.registrarEmpleado(data);
    },
  },
};
</script>

<style></style>
