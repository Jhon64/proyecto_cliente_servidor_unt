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
          <EditarEmpresa
            :refrescarTabla="refrescarLista"
            :id="item.IdEmpresa"
          ></EditarEmpresa>
          <EliminarEmpresa
            :refrescarTabla="refrescarLista"
            :id="item.IdEmpresa"
          ></EliminarEmpresa>
        </CButtonToolbar>
      </td>
    </template>
  </CDataTable>
</template>

<script>
import EliminarEmpresa from "./EliminarEmpresa";
import EditarEmpresa from "./EditarEmpresa";
import moment from "moment";

let cabeceraTabla = [
  { key: "Index", label: "Index" },
  { key: "RazonSocial", class: "bg-primary" },
  { key: "Ruc", class: "bg-primary" },
  { key: "Direccion", class: "bg-primary" },
  { key: "Telefono", class: "bg-primary" },
  { key: "Correo", class: "bg-primary" },
  { key: "Propietario", class: "bg-primary" },

  { key: "Opciones", class: "bg-primary" },
];
export default {
  name: "TablaEmpleado",
  components: { EliminarEmpresa, EditarEmpresa },

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
