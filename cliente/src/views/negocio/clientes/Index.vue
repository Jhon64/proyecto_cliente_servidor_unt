<template
  ><div>
    <CCard>
      <CCardHeader>
        Empresas
      </CCardHeader>
      <CCardBody>
        <CrearCliente :refrescarLista="actualizarLista"></CrearCliente>
        <div class="clearfix"></div>
        <div>
          <TablaCliente
            :lista="list"
            :refrescarLista="actualizarLista"
          ></TablaCliente>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import clienteService from "../../../servicio/ClienteService";
import CrearCliente from "./components/CrearCliente";
import TablaCliente from "./components/TablaCliente";

export default {
  components: { CrearCliente, TablaCliente },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.listarClientes();
  },
  head: {
    title: { inner: "Clientes" },
  },
  methods: {
    actualizarLista(condicion) {
      if (condicion) {
        this.listarClientes();
      }
    },
    async listarClientes() {
      let resultClient = await clienteService.listar();
      console.log(resultClient);
      if (resultClient.status == 200) {
        this.list = [];
        this.list = resultClient.data.map((client) => {
          let newClient = client;
          newClient.Opciones = "";
          return newClient;
        });
      }
    },
  },
};
</script>

<style></style>
