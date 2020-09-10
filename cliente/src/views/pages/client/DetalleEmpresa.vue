<template>
  <CCard class="mt-4">
    <CCardHeader>
      {{ empresa }}
    </CCardHeader>
    <CCardBody>
      <div class="row">
        <div
          v-for="(servicio, i) in listServicios"
          :key="i"
          class="col-sm-6 col-xs-12 col-md-4 col-lg-3"
        >
          <MostrarServicio
            :informacion="{
              descripcion: servicio.descripcion,
              tiempo: servicio.tiempo,
              precio: servicio.precio,
              imagenServicio: servicio.imagenServicio,
              idServicioEmpresa: servicio.idServicioEmpresa,
            }"
            :idEmpresa="empresaId"
            :idServicio="servicio.servicio.idServicio"
          ></MostrarServicio>
        </div>
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
import Servicio from "../../../servicio/EmpresaService.js";
import MostrarServicio from "./components/MostrarServicio";
export default {
  data() {
    return {
      empresaId: this.$route.params.id,
      listServicios: [],
      empresa: "",
    };
  },
  components: { MostrarServicio },
  mounted() {
    this.cargarServiciosxEmpresa();
  },
  head: { title: { inner: "Servicios" } },
  methods: {
    async cargarServiciosxEmpresa() {
      let servicios = await Servicio.listarServiciosxEmpresas(this.empresaId);
      if (servicios.status == 200 && servicios.statusText === "OK") {
        this.listServicios = servicios.data[0].empresaServicio;
        this.empresa = servicios.data[0].razonSocial;
      }
      console.log(servicios);
    },
  },
};
</script>

<style></style>
