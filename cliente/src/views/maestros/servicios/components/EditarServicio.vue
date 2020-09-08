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
    <form @submit.prevent="actualizar(id)">
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
import Service from "../../../../servicio/ServicioService";
import Swal from "sweetalert2";

export default {
  name: "EditarEmpleado",
  components: {},
  props: ["refrescarLista", "id"],
  data() {
    return {
      activarModal: false,
      nombre: "",
      descripcion: "",
      tiempo: "",
      tipoSexo: "",
    };
  },
  props: { id: { type: Number }, refrescarTabla: { type: Function } },
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

    async actualizar(id) {
      let _vm = this;
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      let data = {
        tipoSexo: this.tipoSexo,
        tiempo: this.tiempo,
        descripcion: this.descripcion,
        nombre: this.nombre,
      };

      let resultService = await Service.actualizar(id, data);
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
        _vm.limpiarModal();
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
      this.nombre = response.nombre;
      this.descripcion = response.descripcion;
      this.tiempo = response.tiempo;
      this.tipoSexo = response.tipoSexo;
    },

    async buscar(id) {
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      let resultBusqueda = await Service.buscar(id);

      if (resultBusqueda.status === 200 && resultBusqueda.statusText === "OK") {
        Swal.close();
        this.limpiarModal();
        this.cargarInformacion(resultBusqueda.data);
        this.activarModal = true;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se encontró información",
        });
        this.limpiarInformacion();
        this.activarModal = false;
      }
    },
  },
};
</script>

<style></style>
