<template>
  <CDataTable
    :items="lista"
    :fields="fields"
    table-filter
    items-per-page-select
    :items-per-page="5"
    hover
    striped
    sorter
    pagination
  >
    <template #Persona="{item}">
      <td class="">
        <div v-if="item.Persona !== null">
          <div><strong>Nombre</strong> : {{ item.Persona.nombre }}</div>
          <div><strong>Apellido</strong> : {{ item.Persona.apellido }}</div>
          <div><strong>Dni</strong> : {{ item.Persona.dni }}</div>
        </div>
      </td>
    </template>
    <template #opciones="{item }">
      <td class="py-2" style="vertical-align:middle">
        <CButtonToolbar>
          <EditarUsuario :id="item.IdUsuario" :refrescarTabla="refrescarLista">
          </EditarUsuario>
          <EliminarUsuario
            :id="item.IdUsuario"
            :refrescarTabla="refrescarLista"
            :disabled="item.Persona !== null ? true : false"
          ></EliminarUsuario>
        </CButtonToolbar>
      </td>
    </template>
  </CDataTable>
</template>

<script>
import EliminarUsuario from "./EliminarUsuario";
import EditarUsuario from "./EditarUsuario";
import moment from "moment";
const fields = [
  { key: "Index", label: "Index" },
  { key: "Usuario", class: "bg-primary" },
  { key: "Clave", _style: "min-width:100px;", class: "bg-primary" },
  { key: "Rol", class: "bg-primary" },
  { key: "Persona", _style: "min-width:100px;", class: "bg-primary" },
  {
    key: "opciones",
    label: "",
    class: "bg-primary",
    sorter: false,
    filter: false,
  },
];
export default {
  name: "TablaEmpleado",
  components: { EliminarUsuario, EditarUsuario },

  data() {
    return {
      fields,
      moment: moment,
    };
  },
  props: { lista: Array, refrescarLista: Function },
  methods: {},
};
</script>
