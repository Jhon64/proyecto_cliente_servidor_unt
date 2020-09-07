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
      title="Modal title 2"
      size="lg"
      color="success"
    >
      <div class="container-fluid">
        <div class="form-group">
          <label>Dni</label>
          <TheMask
            v-model="empleado.dni"
            :mask="['########']"
            class="form-control"
          />
        </div>
        <CInput label="Nombre" v-model="empleado.nombre" required />
        <CInput label="Apellidos" v-model="empleado.apellido" required />
        <div class="form-group">
          <label>Fecha Nacimiento</label>
          <Datepicker
            v-model="empleado.fechaNacimiento"
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
            v-model="empleado.correo"
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
            v-model="empleado.celular"
            :mask="['+(51) ### ### ###']"
            :guide="true"
          ></TheMask>
        </div>

        <div class="form-group">
          <label>Empresa</label>
          <select
            class="form-control form-sm"
            v-model="empleado.empresa"
            required
          >
            <option
              v-for="(empresa, i) in listEmpresas"
              :key="i"
              :value="empresa.IdEmpresa"
              >{{ empresa.RazonSocial }}</option
            >
          </select>
        </div>
        <div class="form-group">
          <label>Tipo empleado</label>
          <select
            class="form-control form-sm"
            required
            v-model="empleado.tipoEmpleado"
          >
            <option value="Contratado">Contratado</option>
            <option value="Planilla">Planilla</option>
          </select>
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
import empleadoService from "../../../../servicio/EmpleadoService";
import emailMask from "text-mask-addons/dist/emailMask";
import MaskedInput from "vue-text-mask";
import { TheMask } from "vue-the-mask";
import Swal from "sweetalert2";
import Datepicker from "vuejs-datepicker";
import empresaService from "../../../../servicio/EmpresaService";
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
      empleado: {
        idEmpleado: "",
        idPersona: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        dni: "",
        correo: "",
        celular: "",
        empresa: "",
        tipoEmpleado: "",
        tipo: "Empleado",
      },
      listEmpresas: [],
      emailmask: emailMask,
    };
  },
  props: { id: { type: Number }, refrescarTabla: { type: Function } },
  methods: {
    async listarEmpresas() {
      let resultEmpresas = await empresaService.listarEmpresa();
      console.log(resultEmpresas);
      if (resultEmpresas.status === 200 && resultEmpresas.statusText == "OK") {
        this.listEmpresas = resultEmpresas.data;
        return true;
      } else {
        return false;
      }
    },
    async actualizar(id) {
      let _vm = this;
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      this.empleado.tipo = "Empleado";
      let resultService = await empleadoService.actualizarEmpleado(
        id,
        this.empleado
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
    cargarInformacion(responseEmpleado) {
      this.empleado = {
        idEmpleado: responseEmpleado.IdEmpleado,
        idPersona: responseEmpleado.IdPersona,
        nombre: responseEmpleado.Nombre,
        apellido: responseEmpleado.Apellido,
        fechaNacimiento: responseEmpleado.FechaNacimiento,
        dni: responseEmpleado.Dni,
        correo: responseEmpleado.Correo,
        celular: responseEmpleado.Celular,
        empresa: responseEmpleado.IdEmpresa,
        tipoEmpleado: responseEmpleado.Tipo,
      };
    },
    limpiarInformacion(resultBusqueda) {
      let responseEmpleado = "";
      this.empleado = {
        idEmpleado: "",
        idPersona: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        dni: "",
        correo: "",
        celular: "",
        empresa: "",
        tipoEmpleado: "",
        tipo: "",
      };
    },

    async buscar(id) {
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      let resultBusqueda = await empleadoService.buscarEmpleado(id);
      if (this.listarEmpresas()) {
        if (
          resultBusqueda.status === 200 &&
          resultBusqueda.statusText === "OK"
        ) {
          Swal.close();
          this.limpiarInformacion();
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
      }
    },
  },
};
</script>

<style></style>
