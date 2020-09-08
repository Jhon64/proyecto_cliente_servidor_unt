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
    <template #estado="{item}">
      <td class="py-2" style="vertical-align:middle">
        <label
          class="badge"
          v-if="item.estado !== null"
          :class="dibujarEstados(item.estado).class"
        >
          {{ dibujarEstados(item.estado).text }}
        </label>
      </td>
    </template>
    <template #tiempo="{item}">
      <td class="py-2" style="vertical-align:middle">
        {{ item.tiempo }} horas
      </td>
    </template>

    <template #tipoSexo="{item}">
      <td class="py-2" style="vertical-align:middle">
        <label class="text-center">{{ tipoCliente(item.tipoSexo) }}</label>
      </td>
    </template>

    <template #Opciones="{item}">
      <td class="py-2" style="vertical-align:middle">
        <CButtonToolbar>
          <Editar
            :refrescarTabla="refrescarLista"
            :id="item.idServicio"
          ></Editar>
          <Eliminar
            :refrescarTabla="refrescarLista"
            :id="item.idServicio"
          ></Eliminar>
        </CButtonToolbar>
      </td>
    </template>
  </CDataTable>
</template>

<script>
import Eliminar from "./EliminarServicio";
import Editar from "./EditarServicio";
import moment from "moment";
let cabeceraTabla = [
  { key: "Index", label: "Index" },
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { key: "tiempo", label: "Tiempo" },
  { key: "estado", label: "Estado" },
  { key: "tipoSexo", label: "Clientes" },

  { key: "Opciones", class: "bg-primary" },
];
export default {
  name: "TablaEmpleado",
  components: { Eliminar, Editar },

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
    dibujarEstados(estado) {
      if (estado == 1) {
        return { text: "Activo", class: "badge-info" };
      }
      if (estado == 2) {
        return { text: "Pendiente", class: "badge-success" };
      }
      if (estado == 3) {
        return { text: "Cancelado", class: "badge-danger" };
      }
    },

    tipoCliente(cliente) {
      if (cliente == 1) {
        return "Caballeros";
      }
      if (cliente == 2) {
        return "Damas";
      }
      if (cliente == 3) {
        return "Damas y Caballeros";
      }
    },
  },
};
</script>
