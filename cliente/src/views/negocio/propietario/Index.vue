<template
  ><div>
    <CCard>
      <CCardHeader>
        Propietarios
      </CCardHeader>
      <CCardBody>
        <CrearPropietario :refrescarLista="actualizarLista"></CrearPropietario>
        <div class="clearfix"></div>
        <div>
          <TablaPropietario
            :lista="listPropietario"
            :refrescarLista="actualizarLista"
          ></TablaPropietario>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import propietarioService from "../../../servicio/PropietarioService";
import CrearPropietario from "./components/CrearPropietario";
import TablaPropietario from "./components/TablaPropietario";

export default {
  components: { CrearPropietario, TablaPropietario },
  data() {
    return {
      listPropietario: [],
    };
  },
  mounted() {
    this.listarPropietarios();
  },
  head: {
    title: { inner: "Propietarios" },
  },
  methods: {
    actualizarLista(condicion) {
      if (condicion) {
        this.listarPropietarios();
      }
    },
    async listarPropietarios() {
      let resultPropietarios = await propietarioService.listarPropietario();

      if (resultPropietarios.status == 200) {
        this.listPropietario = [];
        this.listPropietario = resultPropietarios.data.map((propietario) => {
          let newPropietario = propietario;
          newPropietario.Opciones = "<button>Editar</button>";
          return newPropietario;
        });
      }
    },
  },
};
</script>

<style></style>
