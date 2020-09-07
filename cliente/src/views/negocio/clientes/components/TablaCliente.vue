<template>
  <CDataTable
    :items="lista"
    :fields="cabeceraTabla"
    table-filter
    items-per-page-select
    :items-per-page="5"
    small
    bordered
    striped
    sorter
    pagination
  >
    <template #FechaNacimiento="{item}">
      <td class="py-2" style="vertical-align:middle">
        {{ moment(item.FechaNacimiento).format("DD/MM/YYYY") }}
      </td>
    </template>
    <template #Tipo="{item}">
      <td class="py-2" style="vertical-align:middle">
        <CBadge color="primary" v-if="item.Tipo !== null">
          {{ item.Tipo }}</CBadge
        >
      </td>
    </template>
    <template #Propietario="{item}">
      <td class="py-2" style="vertical-align:middle">
        <div class="bg-info text-center" v-if="item.Propietario !== null">
          {{ item.Propietario.Nombre }}&nbsp;{{ item.Propietario.Apellido }}
        </div>
      </td>
    </template>
    <template #Opciones="{item}">
      <td class="py-2" style="vertical-align:middle">
        <CButtonToolbar>
          <EditarCliente
            :refrescarTabla="refrescarLista"
            :id="item.IdCliente"
          ></EditarCliente>
          <EliminarCliente
            :refrescarTabla="refrescarLista"
            :id="item.IdCliente"
          ></EliminarCliente>
        </CButtonToolbar>
      </td>
    </template>
  </CDataTable>
</template>

<script>
import EliminarCliente from "./EliminarCliente";
import EditarCliente from "./EditarCliente";
import moment from "moment";

let cabeceraTabla = [
  { key: "Index", label: "Index" },
  { key: "Dni", class: "bg-primary" },
  { key: "Nombre", class: "bg-primary" },
  { key: "Apellido", class: "bg-primary" },
  { key: "Correo", class: "bg-primary" },
  { key: "Celular", class: "bg-primary" },
  { key: "Tipo", class: "bg-primary" },
  { key: "Opciones", class: "bg-primary" },
];
export default {
  name: "TablaEmpleado",
  components: { EliminarCliente, EditarCliente },

  data() {
    return {
      cabeceraTabla,
      moment: moment,
    };
  },
  props: { lista: Array, refrescarLista: Function },
  methods: {
    refreshTabla() {
      console.log("Actualizando tabla");
      this.refrescarLista(true);
    },
  },
};
</script>
