<template
  ><div>
    <CCard>
      <CCardHeader>
        Empresas
      </CCardHeader>
      <CCardBody>
        <CrearEmpresa :refrescarLista="actualizarLista"></CrearEmpresa>
        <div class="clearfix"></div>
        <div>
          <TablaEmpresa
            :lista="listEmpresas"
            :refrescarLista="actualizarLista"
          ></TablaEmpresa>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import empresaService from "../../../servicio/EmpresaService";
import CrearEmpresa from "./components/CrearEmpresa";
import TablaEmpresa from "./components/TablaEmpresa";

export default {
  components: { CrearEmpresa, TablaEmpresa },
  data() {
    return {
      listEmpresas: [],
    };
  },
  mounted() {
    this.listarEmpresas();
  },
  head: {
    title: { inner: "Empresas" },
  },
  methods: {
    actualizarLista(condicion) {
      if (condicion) {
        this.listarEmpresas();
      }
    },
    async listarEmpresas() {
      let resultEmpresas = await empresaService.listarEmpresa();

      if (resultEmpresas.status == 200) {
        this.listEmpresas = [];
        this.listEmpresas = resultEmpresas.data.map((empresa) => {
          let newEmpresa = empresa;
          newEmpresa.Opciones = "";
          return newEmpresa;
        });
      }
    },
  },
};
</script>

<style></style>
