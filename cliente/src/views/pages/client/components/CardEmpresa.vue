<template>
  <div class="row">
    <div
      class="card-deck col-xs-12 col-md-4 col-sm-6 col-lg-4"
      v-for="(empresa, i) in listEmpresas"
      :key="i"
    >
      <div class="card">
        <!--<img class="card-img-top" src="" alt="Card image cap" />-->
        <div class="card-body">
          <h5 class="card-title text-center">
            <label
              class="title"
              title="click para detalles "
              @click="redireccionar(empresa.IdEmpresa)"
              >{{ empresa.RazonSocial }}</label
            >
          </h5>
          <hr />
          <div class="card-text">
            <div style="display:flex">
              <div style="width:80px">Ruc</div>
              <div>: {{ empresa.Ruc }}</div>
            </div>
            <div style="display:flex">
              <div style="width:80px">Telefono</div>
              <div>: {{ empresa.Telefono }}</div>
            </div>
            <div style="display:flex">
              <div style="width:80px">Correo</div>
              <div>: {{ empresa.Correo }}</div>
            </div>
            <div style="display:flex">
              <div style="width:80px">Dirección</div>
              <div>: {{ empresa.Direccion }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import empresaService from "../../../../servicio/EmpresaService";
export default {
  name: "CardEmpresa",
  data() {
    return { listEmpresas: [] };
  },
  methods: {
    redireccionar(empresaId) {
      console.log(empresaId);
      let usuario = JSON.parse(localStorage.getItem("usuario"));
      if (usuario !== null) {
        this.$router.push(
          { path: `/reservacion/catalogo/${empresaId}` },
          () => {},
          () => {}
        );
      } else {
        this.$router.push(
          { path: `/home/empresa/${empresaId}` },
          () => {},
          () => {}
        );
      }
    },
    async cargarEmpresas() {
      this.listEmpresas = [];
      let empresas = await empresaService.listarEmpresa();
      if (empresas.status == 200 && empresas.statusText == "OK") {
        this.listEmpresas = empresas.data;
      } else {
        this.$toasted.global
          .appError({
            mensaje: "No hay empresas registradas",
          })
          .goAway(5000);
      }
    },
  },
  mounted() {
    this.cargarEmpresas();
  },
};
</script>

<style>
.title:hover {
  cursor: pointer;
}
</style>
