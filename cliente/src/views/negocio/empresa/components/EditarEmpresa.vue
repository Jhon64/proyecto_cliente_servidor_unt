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
      title="Actualizar Información"
      color="info"
      :show.sync="activarModal"
    >
      <div>
        <div class="container-fluid">
          <div class="form-group">
            <label>Ruc</label>
            <input
              v-model="data.ruc"
              class="form-control"
              minlength="11"
              maxlength="11"
              @keyup="verificarRuc($event)"
            />
          </div>

          <div class="form-group">
            <label>Razon Social</label>
            <input
              v-model="data.razonSocial"
              required
              autcomplete="off"
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label>Direccion</label>
            <input
              v-model="data.direccion"
              autcomplete="off"
              required
              type="text"
              class="form-control"
            />
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
            <label>Teléfono</label>
            <TheMask
              type="text"
              name="telefono"
              class="form-control"
              v-model="data.telefono"
              :mask="['+(51) ### ### ###']"
              :guide="true"
            ></TheMask>
          </div>

          <div class="form-group">
            <label>Propietario</label>
            <select
              class="form-control form-sm"
              v-model="data.propietario"
              required
            >
              <option
                v-for="(propietario, i) in propietarios"
                :value="propietario.IdPropietario"
                v-bind:key="i"
                >{{ propietario.Nombre }} {{ propietario.Apellido }}
              </option>
            </select>
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
            @click="actualizar(id)"
            >Registrar</CButton
          >
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
import empresaService from "../../../../servicio/EmpresaService";
import propietarioService from "../../../../servicio/PropietarioService";
import emailMask from "text-mask-addons/dist/emailMask";
import MaskedInput from "vue-text-mask";
import { TheMask } from "vue-the-mask";
import Swal from "sweetalert2";
import Datepicker from "vuejs-datepicker";

export default {
  name: "EditarEmpleado",
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
      propietarios: [],
      emailmask: emailMask,
      data: {
        ruc: "",
        razonSocial: "",
        correo: "",
        direccion: "",
        propietario: "",
        telefono: "",
        idEmpresa: "",
      },
    };
  },
  props: { id: { type: Number }, refrescarTabla: { type: Function } },
  methods: {
    abrirModal() {
      this.limpiar();
      if (this.listarPropietarios()) {
        this.activarModal = true;
      } else {
        this.activarModal = false;
      }
    },
    cerrarModal() {
      this.limpiarInformacion();
      this.activarModal = false;
    },

    async actualizar(id) {
      let _vm = this;
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      let resultService = await empresaService.actualizarEmpresa(id, this.data);
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
    cargarInformacion(response) {
      this.data = {
        ruc: response.ruc,
        idEmpresa: response.id,
        razonSocial: response.razonSocial,
        correo: response.correo,
        direccion: response.direccion,
        propietario: response.propietario.id,
        telefono: response.telefono,
      };
    },
    limpiarInformacion(resultBusqueda) {
      this.data = {
        ruc: "",
        idEmpresa: "",
        razonSocial: "",
        correo: "",
        direccion: "",
        propietario: "",
        telefono: "",
      };
      this.propietarios = [];
    },

    async buscar(id) {
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      if (this.listarPropietarios()) {
        let resultBusqueda = await empresaService.buscarEmpresa(id);
        console.log(resultBusqueda);
        if (
          resultBusqueda.status === 200 &&
          resultBusqueda.statusText === "OK"
        ) {
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No hay propietarios registrados ...",
        });
      }
    },
  },
};
</script>

<style></style>
