<template>
  <CCard>
    <CCardHeader>Reservación </CCardHeader>
    <CCardBody>
      <div class="row mt-4">
        <div class="col-sm-12 col-lg-6 col-md-12 col-xs-12">
          <table class="table table-responsive  table-bordered">
            <thead>
              <th>Servicio</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Monto</th>
            </thead>
            <tbody>
              <tr v-for="(item, i) in listCarrito" :key="i">
                <td>
                  <div style="display:flex">
                    <div style="display:flex;width:100%">
                      <div class="mx-2">
                        <img
                          v-if="item.imagenServicio === null"
                          class="rounded"
                          style="width:100px"
                          height="50"
                          src="../../../../assets/img/default.png"
                        />
                        <img
                          v-else
                          :src="baseUrl + item.imagenServicio"
                          class="rounded"
                          height="50"
                          style="width:100px"
                        />
                      </div>
                      <div>
                        <div>Descripcion : {{ item.descripcion }}</div>
                        <div>Tiempo : {{ item.tiempo }} horas</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style="width:80px">S/. {{ item.precio }} soles</div>
                </td>
                <td>
                  <div style="width:80px">{{ item.cantidad }} unidades</div>
                </td>
                <td>
                  <div style="width:80px">S/. {{ item.monto }} soles</div>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="text-align:end;width:100%"></td>
                <td style="width:100%">Subtotal</td>
                <td style="width:100%">S/. {{ calcularMoonto }} soles</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-sm-12 col-lg-6 col-md-12 col-xs-12">
          <div class="form-group mb-2">
            <label class="mb-0">Fecha de reservación</label>
            <a-date-picker
              format="DD/MM/YYYY hh:mm:ss a"
              :disabled-date="disabledDate"
              :show-time="{ defaultValue: moment('00:00:00', 'hh:mm:ss a') }"
              class="form-control form-control-sm"
              placeholder="Seleccionar fecha y hora"
              v-model="fechaReservacion"
            />
          </div>

          <div class="form-group mb-2 " hidden>
            <label class="form-label mb-0">Empleado</label>
            <select class=" form-control form-control-sm">
              <option value=""></option>
              <option value="1">Emleado 1</option>
              <option value="2">Empleado 2</option>
            </select>
          </div>
          <div class="form-group my-3 d-flex justify-content-center">
            <button
              class="btn btn-sm btn-danger"
              @click="cancelarReservacion()"
            >
              Cancelar
            </button>
            <button
              class="btn btn-sm btn-success"
              @click="registrarReservacion()"
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import moment from "moment";
import Servicio from "../../../../servicio/ReservacionService";
export default {
  data() {
    return {
      fechaReservacion: null,
      baseUrl: process.env.VUE_APP_BASE_URL,
      listCarrito: JSON.parse(localStorage.getItem("listCarrito")),
      subtotal: "",
    };
  },
  computed: {
    calcularMoonto() {
      let suma = 0;
      this.listCarrito.forEach((item) => {
        suma += item.cantidad * item.precio;
      });
      return suma;
    },
  },
  methods: {
    async registrarReservacion() {
      let fecha = this.fechaReservacion;
      console.log(fecha);
      if (fecha !== null) {
        console.log(this.fechaReservacion);
        let usuario = JSON.parse(localStorage.getItem("usuario"));
        let listCarrito = JSON.parse(localStorage.getItem("listCarrito"));
        let data = {
          fechaReservacion: fecha,
          idUsuario: usuario.id,
          listCarrito,
        };
        let resultReservacion = await Servicio.registrar(data);
        console.log(resultReservacion);
        if (
          resultReservacion.status == 200 &&
          resultReservacion.statusText == "OK"
        ) {
          this.$toasted.global
            .appSuccess({
              mensaje: "se registro reservacion",
            })
            .goAway(5000);
          localStorage.removeItem("listCarrito");
          this.$router.push(
            "reservacion",
            () => {},
            () => {}
          );
        } else {
          this.$toasted.global
            .appError({
              mensaje: "error en el servidor",
            })
            .goAway(5000);
        }
      } else {
        this.$toasted.global
          .appError({
            mensaje: "seleccione fecha para la reservación",
          })
          .goAway(5000);
      }
    },
    cancelarReservacion() {
      localStorage.removeItem("listCarrito");
      this.$router.push(
        "/reservacion/catalogo",
        () => {},
        () => {}
      );
    },
    moment,
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },

    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf("day");
    },

    finalizarReservacion() {
      this.$router.push(
        "/home/reservacion",
        () => {},
        () => {}
      );
    },
    actualizarMonto(i, evt) {
      let item = this.listCarrito[i];
      item.cantidad = evt.target.value;
      item.monto = item.cantidad * item.precio;
      localStorage.setItem("listCarrito", JSON.stringify(this.listCarrito));
      console.log(item);
    },
    quitarItem(i) {
      this.listCarrito.splice(i, 1);
    },
    cancelar() {
      localStorage.removeItem("listCarrito");
      this.$router.push(
        "/home",
        () => {},
        () => {}
      );
    },
    agregar(id) {
      this.$router.push(
        "/home/empresa/" + id,
        () => {},
        () => {}
      );
    },
  },
};
</script>

<style></style>
