<template>
  <div class="">
    <table class="table table-responsive table-striped table-bordered">
      <thead>
        <th>Servicio</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Monto</th>
      </thead>
      <tbody>
        <tr v-for="(item, i) in listCarrito" :key="i">
          <td style="width:100%">
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
              <div style="width:100px;vertical-align:middle">
                <button
                  class="btn btn-sm btn-danger mt-3"
                  @click="quitarItem(i)"
                >
                  <span class="fa fa-trash"></span>&nbsp;Quitar
                </button>
              </div>
            </div>
          </td>
          <td>
            <div style="width:100px">S/. {{ item.precio }} soles</div>
          </td>
          <td>
            <div style="width:150px">
              <input
                style="width:50px"
                :value="item.cantidad"
                @change="actualizarMonto(i, $event)"
              />
              unidades
            </div>
          </td>
          <td>
            <div style="width:80px">S/. {{ item.monto }} soles</div>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="text-align:end">
            <button
              class="btn btn-sm btn-success"
              @click="agregar($route.params.id)"
            >
              <span class="fa fa-plus"></span>&nbsp;Agregar
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="cancelar($route.params.id)"
            >
              <span class="fa fa-times"></span>&nbsp;Cancelar
            </button>
          </td>
          <td>Subtotal</td>
          <td>S/. {{ calcularMoonto }} soles</td>
        </tr>
      </tbody>
    </table>
    <div class="text-center">
      <button class="btn btn-sm btn-success" @click="finalizarReservacion()">
        Finalizar Reservacion
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
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
    redireccionando(id, opcion) {
      let usuario = localStorage.getItem("usuario");

      if (opcion == 1) {
        if (usuario !== null) {
          this.$router.push(
            "/reservacion/catalogo/" + id,
            () => {},
            () => {}
          );
        } else {
          this.$router.push(
            "/home/empresa/" + id,
            () => {},
            () => {}
          );
        }
      }
      if (opcion == 2) {
        if (usuario !== null) {
          this.$router.push(
            "/reservacion/catalogo/",
            () => {},
            () => {}
          );
        } else {
          this.$router.push(
            "/home",
            () => {},
            () => {}
          );
        }
      }
    },
    finalizarReservacion() {
      let token = localStorage.getItem("tokenAuth");
      if (token === null) {
        Swal.fire({
          text: "Inicie sesión o cree una cuenta para continuar",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
          cancelmButtonText: "Cancelar",
        }).then((result) => {
          console.log(result);
          if (result.isConfirmed) {
            this.$router.push(
              "/login",
              () => {},
              () => {}
            );
          } else {
            localStorage.removeItem("listCarrito");
            this.$router.push(
              "/",
              () => {},
              () => {}
            );
          }
        });
      } else {
        this.$router.push(
          "/reservacion/finalizar",
          () => {},
          () => {}
        );
      }
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
    cancelar(id) {
      localStorage.removeItem("listCarrito");
      this.redireccionando(id, 2);
    },
    agregar(id) {
      this.redireccionando(id, 1);
    },
  },
};
</script>

<style></style>
