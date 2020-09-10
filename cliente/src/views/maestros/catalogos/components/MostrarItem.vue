<template>
  <div class="card">
    <div class="card-header content-center text-white p-0 bg-light">
      <div class="c-chart-brand">
        <div class="chartjs-size-monitor">
          <div class="chartjs-size-monitor-expand">
            <div class=""></div>
          </div>
          <div class="chartjs-size-monitor-shrink">
            <div class=""></div>
          </div>
        </div>
        <img
          v-if="informacion.imagenServicio === null"
          src="../../../../assets/img/default.png"
          height="100"
          class=""
          style="width:100%"
        />
        <img
          v-else
          :src="baseUrl + informacion.imagenServicio"
          height="100"
          class=""
          style="width:100%"
        />
      </div>
    </div>
    <div class="card-body row text-center">
      <div class="col">
        <div class="text-value-sm">Precio</div>
        <div class="text-uppercase text-muted small">
          S/. {{ informacion.precio }} soles
        </div>
      </div>
      <div class="c-vr"></div>
      <div class="col">
        <div class="text-value-sm">Tiempo</div>
        <div class="text-uppercase text-muted small">
          {{ informacion.tiempo }} horas
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
    };
  },
  props: ["informacion", "idEmpresa", "idServicio"],
};
</script>

<style></style>
