<template>
  <div>
    <CButton
      color="success"
      variant="outline"
      size="sm"
      title="Editar"
      square
      @click="buscar(id)"
    >
      <Fa icon="pencil-alt"></Fa>
    </CButton>
    <CModal
      :show.sync="activarModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Actualizar Informacion"
      size="lg"
      color="success"
    >
      <div class="container-fluid">
        <div class="form-group">
          <label>Dni</label>
          <TheMask
            v-model="data.dni"
            :mask="['########']"
            class="form-control"
          />
        </div>
        <CInput label="Nombre" v-model="data.nombre" required />
        <CInput label="Apellidos" v-model="data.apellido" required />
        <div class="form-group">
          <label>Fecha Nacimiento</label>
          <Datepicker
            v-model="data.fechaNacimiento"
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
            v-model="data.correo"
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
            v-model="data.celular"
            :mask="['+(51) ### ### ###']"
            :guide="true"
          ></TheMask>
        </div>
      </div>
      <template #header>
        <h6 class="modal-title">Actualizar Información</h6>
        <CButtonClose @click="activarModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="activarModal = false" color="default"
          >Cancelar</CButton
        >
        <CButton color="success" @click="actualizar(id)">Aceptar</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import propietarioService from "../../../../servicio/PropietarioService";
import emailMask from "text-mask-addons/dist/emailMask";
import MaskedInput from "vue-text-mask";
import { TheMask } from "vue-the-mask";
import Swal from "sweetalert2";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    MaskedInput,
    emailMask,
    Datepicker,
    TheMask,
  },
  props: ["refrescarLista", "id"],
  data() {
    return {
      activarModal: false,
      darkModal: false,
      data: {
        idPropietario: "",
        idPersona: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        dni: "",
        correo: "",
        celular: "",
      },
      emailmask: emailMask,
    };
  },
  props: { id: { type: Number }, refrescarTabla: { type: Function } },
  methods: {
    async actualizar(id) {
      let _vm = this;
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      let resultService = await propietarioService.actualizarPropietario(
        id,
        this.data
      );
      console.log(resultService);
      if (resultService.status === 200 && resultService.statusText === "OK") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        _vm.$toasted.global
          .appSuccess({
            mensaje: "información actualizada",
          })
          .goAway(3000);
        _vm.limpiarInformacion();
        _vm.activarModal = false;
        _vm.refrescarTabla(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "no se pudo actualizar información",
        });
      }
    },
    cargarInformacion(response) {
      this.data = {
        idPropietario: response.id,
        idPersona: response.persona.id,
        nombre: response.persona.nombre,
        apellido: response.persona.apellido,
        fechaNacimiento: response.persona.fechaNacimiento,
        dni: response.persona.dni,
        correo: response.persona.correo,
        celular: response.persona.celular,
        tipo: response.persona.tipo,
      };
    },
    limpiarInformacion(resultBusqueda) {
      let responseEmpleado = "";
      this.data = {
        idPropietario: "",
        idPersona: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        dni: "",
        correo: "",
        celular: "",
        tipo: null,
      };
    },

    async buscar(id) {
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      let resultBusqueda = await propietarioService.buscarPropietario(id);
      console.log(resultBusqueda);
      if (resultBusqueda.status === 200 && resultBusqueda.statusText === "OK") {
        Swal.close();
        this.cargarInformacion(resultBusqueda.data);
        this.activarModal = true;
        return true;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se encontró información",
        });
        this.limpiarInformacion();
        this.activarModal = false;
        return false;
      }
    },
  },
};
</script>

<style></style>
