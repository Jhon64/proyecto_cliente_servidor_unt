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
      title="Nuevo Usuario"
      color="default"
      :show.sync="activarModal"
      :footer="false"
    >
      <div class="container-fluid">
        <div>
          <label>Dni</label>
          <input class="form-control form-sm" placeholder="DNI" />
        </div>
        <div class="">
          <label>Usuario</label>
          <input class="form-control form-sm" />
        </div>
        <div class="">
          <label>Clave</label>
          <input class="form-control form-sm" />
        </div>
        <div class="">
          <label>Repetir clave</label>
          <input class="form-control form-sm" />
        </div>
      </div>
      <hr />
      <div>
        <CButton>Registrar</CButton>
        <CButton>Cancelar</CButton>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "../../components/coreui/Modal";
export default {
  name: "CrearUsuario",
  components: {
    Modal: Modal,
  },
  data() {
    return {
      activarModal: false,
    };
  },
};
</script>

<style></style>
