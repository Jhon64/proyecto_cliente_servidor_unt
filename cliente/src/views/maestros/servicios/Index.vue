<template
  ><div>
    <CCard>
      <CCardHeader>
        Servicios
      </CCardHeader>
      <CCardBody>
        <Crear :refrescarLista="actualizarLista"></Crear>
        <div class="clearfix"></div>
        <div>
          <Tabla :lista="listTabla" :refrescarLista="actualizarLista"></Tabla>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import axiosService from "../../../servicio/ServicioService";
import Crear from "./components/CrearServicio";
import Tabla from "./components/TablaServicio";

export default {
  components: { Crear, Tabla },
  data() {
    return {
      listTabla: [],
    };
  },
  mounted() {
    this.listarServicios();
  },
  head: {
    title: { inner: "Servicios" },
  },
  methods: {
    actualizarLista(condicion) {
      if (condicion) {
        this.listarServicios();
      }
    },
    async listarServicios() {
      let resultInfo = await axiosService.listar();
      console.log(resultInfo);
      if (resultInfo.status == 200) {
        this.listTabla = [];
        this.listTabla = resultInfo.data.map((info) => {
          let newInfo = info;
          newInfo.Opciones = "";
          return newInfo;
        });
      }
    },
  },
};
</script>

<style></style>
