<template>
  <div class="col-6 col-sm-4 col-md-3 col-lg-3 mx-auto" v-if="defaultCard">
    <div v-if="idEmpresa !== '' && idServicio !== ''">
      <AgregarItem
        :idEmpresa="idEmpresa"
        :idServicio="idServicio"
        :refreshCatalogo="refreshCatalogo"
      ></AgregarItem>
    </div>
    <div v-else>
      Seleccione opciones ....
    </div>
  </div>
  <div v-else class="col-6 col-sm-4 col-md-3 col-lg-3 ">
    <MostrarItem
      :informacion="catalogo"
      :idEmpresa="idEmpresa"
      :idServicio="idServicio"
    ></MostrarItem>
  </div>
</template>

<script>
import AgregarItem from "./AgregarItem";
import MostrarItem from "./MostrarItem";
export default {
  props: [
    "catalogo",
    "defaultCard",
    "idServicio",
    "idEmpresa",
    "refreshCatalogo",
  ],

  components: { AgregarItem, MostrarItem },
};
</script>

<style></style>
