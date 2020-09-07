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
    <Modal
      title="Nuevo Empleado"
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

          <div class="form-group">
            <label>Empresa</label>
            <select class="form-control form-sm" v-model="negocio" required>
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
              v-model="tipoEmpleado"
            >
              <option value="Contratado">Contratado</option>
              <option value="Planilla">Planilla</option>
            </select>
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
              v-on:click="registrarEmpleado($event)"
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
import empleadoService from "../../../../servicio/EmpleadoService";
import empresaService from "../../../../servicio/EmpresaService";
import emailMask from "text-mask-addons/dist/emailMask";
import MaskedInput from "vue-text-mask";
import { TheMask } from "vue-the-mask";

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
      listEmpresas: [],
    };
  },
  props: ["refrescarLista"],
  methods: {
    abrirModal() {
      this.limpiarModal();
      if (this.listarEmpresas()) {
        this.activarModal = true;
      } else {
        this.activarModal = false;
        this.$toasted.global
          .appError({
            mensaje:
              "No se pudo cargar Emresas...<br> por favor registre empresas",
          })
          .goAway(1200);
        alse;
      }
    },
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
    limpiarModal() {
      this.nombre = "";
      this.apellido = "";
      this.dni = "";
      this.fechaNacimiento = "";
      this.correo = "";
      this.celular = "";
      this.negocio = "";
      this.tipo = "";
      this.tipoEmpleado = "";
    },
    cerrarModal() {
      this.limpiarModal();
      this.activarModal = false;
    },
    async registrarEmpleado(evt) {
      this.$toasted.global
        .appSuccess({
          mensaje: "registrando Empleado",
        })
        .goAway(1200);
      let data = {
        nombre: this.nombre,
        apellido: this.apellido,
        dni: this.dni,
        fechaNacimiento: this.fechaNacimiento,
        correo: this.correo,
        celular: this.celular,
        tipo: "Empleado",
        empresa: this.negocio,
        tipoEmpleado: this.tipoEmpleado,
      };
      console.log(data);
      let resultRegistro = await empleadoService.registrarEmpleado(data);
      console.log(resultRegistro);
      if (resultRegistro.status === 200 && resultRegistro.statusText === "OK") {
        this.cerrarModal();
        this.$toasted.global
          .appPrimary({
            mensaje: "Empleado registrado ....",
          })
          .goAway(3000);
        this.refrescarLista(true);
      } else {
        this.$toasted.global
          .appError({
            mensaje: "No se pudo registrar el empleado",
          })
          .goAway(3000);
      }

      //let resulRegistro = await empleadoService.registrarEmpleado(data);
      return false;
    },
  },
};
</script>

<style></style>
