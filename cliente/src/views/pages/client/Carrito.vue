<template>
  <div class="container-fluid mt-4">
    <CCard>
      <CCardHeader>
        Lista de servicios añadidos
      </CCardHeader>
      <CCardBody>
        <TablaCarrito></TablaCarrito>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import TablaCarrito from "./components/TablaCarrito";
export default {
  components: {
    TablaCarrito,
  },
};
</script>

<style></style>
