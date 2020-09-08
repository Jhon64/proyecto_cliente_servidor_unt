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
    <form @submit.prevent="registrar()">
      <CModal
        title="Nuevo Servicio"
        color="primary"
        :show.sync="activarModal"
        :footer="false"
      >
        <div>
          <div class="container-fluid">
            <div class="form-group">
              <label>Nombre</label>
              <input class="form-control " required v-model="nombre" />
            </div>

            <div class="form-group">
              <label>Descripción</label>
              <textarea
                class="form-control"
                required
                v-model="descripcion"
              ></textarea>
            </div>
            <div class="form-group">
              <label>Tiempo horas</label>
              <input
                class="form-control"
                required
                v-model="tiempo"
                type="number"
                step="any"
                min="0"
              />
            </div>
            <div class="form-group">
              <label>Para clientes</label>
              <select class="form-control" required v-model="tipoSexo">
                <option value="1">Caballeros</option>
                <option value="2">Damas </option>
                <option value="3">Ambos</option>
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
              type="submit"
              >Registrar</CButton
            >
          </div>
        </template>
      </CModal>
    </form>
  </div>
</template>

<script>
import axiosService from "../../../../servicio/ServicioService";

export default {
  components: {},

  data() {
    return {
      activarModal: false,
      nombre: "",
      descripcion: "",
      tiempo: "",
      tipoSexo: "",
    };
  },
  props: ["refrescarLista"],
  methods: {
    abrirModal() {
      this.limpiarModal();
      this.activarModal = true;
    },

    limpiarModal() {
      this.nombre = "";
      this.descripcion = "";
      this.tiempo = "";
      this.tipoSexo = "";
    },
    cerrarModal() {
      this.limpiarModal();
      this.activarModal = false;
    },
    async registrar() {
      this.$toasted.global
        .appSuccess({
          mensaje: "registrando servicio",
        })
        .goAway(5000);
      let data = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        tiempo: this.tiempo,
        tipoSexo: this.tipoSexo,
      };
      console.log(data);
      let resultRegistro = await axiosService.registrar(data);
      console.log(resultRegistro);
      if (resultRegistro.status === 200 && resultRegistro.statusText === "OK") {
        this.cerrarModal();
        this.$toasted.global
          .appPrimary({
            mensaje: "servicio registrado ....",
          })
          .goAway(3000);
        this.refrescarLista(true);
      } else {
        this.$toasted.global
          .appError({
            mensaje: "No se pudo registrar servicio",
          })
          .goAway(3000);
      }
      return false;
    },
  },
};
</script>

<style></style>
