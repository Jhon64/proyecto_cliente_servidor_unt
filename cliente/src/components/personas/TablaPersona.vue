<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Nombres</th>
          <th class="text-left">Apellidos</th>
          <th class="text-left">F.Creacion</th>
          <th class="text-left">F.Creacion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in lista" :key="item.Index">
          <td>{{ item.Index }}</td>
          <td>{{ item.Nombre }}</td>
          <td>{{ item.Apellido }}</td>
          <td>{{ item.CreatedAt }}</td>
          <td></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import servicioPersona from "../../servicio/PersonaService";
export default {
  props: ["lista", "actualizarTabla"],
  data() {
    return {};
  },
  methods: {
    deleteItem(data) {
      console.log(data);
    },
    async eliminar(id) {
      let result = await servicioPersona.eliminarPersona(id);
      console.log(result);
      this.actualizarTabla(true);
    },
  },
};
</script>
