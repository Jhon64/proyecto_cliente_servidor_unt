<template
  ><CCard
    ><CCardHeader>Reservaciones</CCardHeader>
    <CCardBody>
      <table class="table table-bordered">
        <thead>
          <th>Fecha</th>
          <th>Estado</th>
          <th>Monto</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="(reservacion, i) in listReservaciones" :key="i">
            <td>
              <div v-if="reservacion.fechaReservacion !== null">
                {{
                  moment(reservacion.fechaReservacion).format(
                    "DD/MM/YYYY hh:mm a"
                  )
                }}
              </div>
            </td>
            <td>
              <div>{{ reservacion.estado }}</div>
            </td>
            <td>
              <div v-if="reservacion.servicioEmpresa.length > 0">
                S/. {{ monto(reservacion.servicioEmpresa) }} soles
              </div>
            </td>
            <td>
              <div>
                <ButtonPagar
                  v-if="
                    reservacion.servicioEmpresa.length > 0 &&
                      reservacion.estado == 1
                  "
                  :monto="monto(reservacion.servicioEmpresa)"
                ></ButtonPagar>
                <button class="btn btn-sm btn-danger">Cancelar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </CCardBody>
  </CCard>
</template>

<script>
import ButtonPagar from "../../../views/pages/client/components/Pago";
import Servicio from "../../../servicio/ReservacionService";
import moment from "moment";
export default {
  components: {
    ButtonPagar,
  },
  data() {
    return {
      listReservaciones: [],
    };
  },
  mounted() {
    this.listarReservaciones();
  },
  methods: {
    monto(listServicios) {
      console.log(listServicios);
      let suma = 0;
      listServicios.forEach((item) => {
        suma += item.precio;
      });
      return suma;
    },
    moment,
    async listarReservaciones() {
      let list = await Servicio.listar();
      if (list.status == 200) {
        this.listReservaciones = list.data;
        console.log(this.listReservaciones);
      }
    },
  },
};
</script>

<style></style>
