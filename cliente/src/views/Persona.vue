<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3 col-xs-12">
        <FormPersona :actualizarTabla="refreshTabla"></FormPersona>
      </div>
      <div class="col-sm-7 col-xs-12">
        <div class="card p-3">
          <TablaPersona
            v-bind:lista="listaPersonas"
            :actualizarTabla="refreshTabla"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormPersona from "../components/personas/FormPersona";
import TablaPersona from "../components/personas/TablaPersona";
import personaServicio from "../servicio/PersonaService";

export default {
  components: {
    FormPersona,
    TablaPersona,
  },
  data() {
    return {
      listaPersonas: [],
    };
  },
  methods: {
    refreshTabla(estado) {
      if (estado) {
        this.cargarLista();
      } else {
        console.log("no actualizando");
      }
    },
    cargarLista() {
      let _vm = this;
      _vm.listaPersonas = [];
      personaServicio.listarUsuarios().then((result) => {
        _vm.listaPersonas = result.data;
      });
    },
  },
  mounted() {
    this.cargarLista();
  },
};
</script>
