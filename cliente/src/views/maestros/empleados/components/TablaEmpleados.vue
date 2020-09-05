<template>
  <CDataTable
    :items="lista"
    :fields="cabeceraTabla"
    table-filter
    items-per-page-select
    :items-per-page="5"
    hover
    striped
    sorter
    pagination
  >
    <template #opciones="{persona, index}">
      <td class="py-2" style="vertical-align:middle">
        <CButtonToolbar>
          <CButton
            color="success"
            variant="outline"
            size="sm"
            title="Editar"
            square
          >
            <Fa icon="pencil-alt"></Fa>
          </CButton>
          <CButton
            color="danger"
            variant="outline"
            size="sm"
            square
            title="Eliminar"
            @click="eliminar()"
            ><Fa icon="trash"
          /></CButton>
        </CButtonToolbar>
      </td>
    </template>
  </CDataTable>
</template>

<script>
let cabeceraTabla = [
  { key: "Index", label: "Index" },
  { key: "Nombre", class: "bg-primary" },
  { key: "Apellido", class: "bg-primary" },
  { key: "Opciones", class: "bg-primary" },
];
export default {
  name: "TablaEmpleado",
  data() {
    return {
      cabeceraTabla,
    };
  },
  props: { lista: Array },
  methods: {
    eliminar() {},
    editar() {},
  },
};
</script>

<style></style>
