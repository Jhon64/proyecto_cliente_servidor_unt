<template>
  <div class="row">
    <template v-if="catalogoList.length > 0">
      <div class="col-6 col-sm-4 col-md-3 col-lg-3 my-auto">
        <AgregarItem
          :idEmpresa="idEmpresa"
          :idServicio="idServicio"
          :refreshCatalogo="refreshCatalogo"
        ></AgregarItem>
      </div>
      <Tarjeta
        v-for="(catalogo, i) in catalogoList"
        :key="i"
        :defaultCard="false"
        :catalogo="catalogo"
        :idEmpresa="idEmpresa"
        :idServicio="idServicio"
        :refreshCatalogo="refreshCatalogo"
      ></Tarjeta>
    </template>
    <template v-else>
      <Tarjeta
        :defaultCard="true"
        :idEmpresa="idEmpresa"
        :idServicio="idServicio"
        :catalogo="null"
        :refreshCatalogo="refreshCatalogo"
      ></Tarjeta>
    </template>
  </div>
</template>
<script>
import Tarjeta from "./Tarjeta";
import AgregarItem from "./AgregarItem";
export default {
  components: { Tarjeta, AgregarItem },
  props: ["catalogoList", "idEmpresa", "idServicio", "refreshCatalogo"],
};
</script>
