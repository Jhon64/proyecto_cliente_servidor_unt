<template>
  <PagoReservacion v-if="listCarrito != null"></PagoReservacion>
  <DashboardCliente v-else></DashboardCliente>
</template>

<script>
import PagoReservacion from "../../pages/client/PagoReservacion";
import DashboardCliente from "../../Dashboard/cliente/Index";
export default {
  components: { PagoReservacion, DashboardCliente },
  data() {
    return {
      listCarrito: JSON.parse(localStorage.getItem("listCarrito")),
    };
  },
  mounted() {
    this.listCarrito = JSON.parse(localStorage.getItem("listCarrito"));
  },
};
</script>

<style></style>
