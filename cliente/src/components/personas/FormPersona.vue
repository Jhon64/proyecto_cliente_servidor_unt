<template>
  <div>
    <v-card class="mx-auto">
      <v-card-title>
        <p class="text--primary">
          Nueva persona
        </p>
      </v-card-title>
      <v-card-text>
        <v-text-field label="Nombre" v-model="nombre"></v-text-field>
        <v-text-field label="Apellido" v-model="apellido"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          block
          primary
          color="deep-purple accent-4"
          @click="registarPersona()"
        >
          Registrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import personaServicio from "../../servicio/PersonaService";
export default {
  data() {
    return {
      apellido: "",
      nombre: "",
    };
  },
  props: ["actualizarTabla"],
  methods: {
    async registarPersona() {
      let apellido = this.apellido;
      let nombre = this.nombre;
      let data = { nombre: nombre, apellido: apellido };
      let registroPersona = await personaServicio.registrarPersona(data);
      this.actualizarTabla(true);
      console.log(registroPersona);
    },
  },
};
</script>
