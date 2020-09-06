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
        <CInput label="Usuario" v-model="usuario.usuario" required disabled />

        <CInput
          label="Clave"
          v-model="usuario.clave"
          autcomplete="off"
          required
          type="password"
        />

        <div class="form-group">
          <label>Rol Usuario</label>
          <select v-model="usuario.rol" class="form-control form-sm" required>
            <option value="1">Administrador</option>
            <option value="2">Empleado</option>
            <option value="3">Cliente</option>
          </select>
        </div>
      </div>
      <template #header>
        <h6 class="modal-title">Actualizar Información</h6>
        <CButtonClose @click="activarModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="cerrarModal()" color="danger">Cancelar</CButton>
        <CButton color="success" @click="actualizar(id)">Aceptar</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import usuarioService from "../../../../servicio/UsuarioService";

import Swal from "sweetalert2";

export default {
  name: "EditarEmpleado",
  components: {},
  props: ["refrescarLista", "id"],
  data() {
    return {
      activarModal: false,
      darkModal: false,
      usuario: {
        idUsuario: "",
        usuario: "",
        clave: "",
        rol: "",
      },
    };
  },
  props: { id: { type: Number }, refrescarTabla: { type: Function } },
  methods: {
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
      let resultService = await usuarioService.actualizarUsuario(
        id,
        this.usuario
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
    cargarInformacion(responseUsuario) {
      this.usuario = {
        idUsuario: responseUsuario.IdUsuario,
        clave: responseUsuario.Clave,
        usuario: responseUsuario.Usuario,
        rol: responseUsuario.Rol,
      };
    },
    limpiarInformacion(resultBusqueda) {
      this.empleado = {
        idUsuario: "",
        usuario: "",
        clave: "",
        rol: "",
      };
    },

    async buscar(id) {
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      let resultBusqueda = await usuarioService.buscarUsuarioId(id);
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
