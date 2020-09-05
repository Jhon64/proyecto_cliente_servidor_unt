<template
  ><div>
    <CCard>
      <CCardHeader>
        Empleados
      </CCardHeader>
      <CCardBody>
        <CrearEmpleado :refrescarLista="actualizarLista"></CrearEmpleado>
        <div class="clearfix"></div>
        <div>
          <TablaEmpleado
            :lista="listEmpleado"
            :refrescarLista="actualizarLista"
          ></TablaEmpleado>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import empleadoService from "../../../servicio/EmpleadoService";
import CrearEmpleado from "./components/CrearEmpleado";
import TablaEmpleado from "./components/TablaEmpleados";

export default {
  components: { CrearEmpleado, TablaEmpleado },
  data() {
    return {
      listEmpleado: [],
    };
  },
  mounted() {
    this.listarEmpleados();
  },
  head: {
    title: { inner: "Empleados" },
  },
  methods: {
    eliminar(id) {
      console.log("elminar " + id);
    },
    actualizarLista(condicion) {
      if (condicion) {
        this.listarEmpleados();
      }
    },
    async listarEmpleados() {
      let resultEmpleado = await empleadoService.listarEmpelados();

      if (resultEmpleado.status == 200) {
        this.listEmpleado = [];
        this.listEmpleado = resultEmpleado.data.map((empleado) => {
          let newEmpleado = empleado;
          newEmpleado.Opciones = "<button>Editar</button>";
          return newEmpleado;
        });
      }
    },
  },
};
</script>

<style></style>
