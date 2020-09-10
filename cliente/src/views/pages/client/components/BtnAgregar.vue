<template>
  <div>
    <button
      class="btn btn-sm btn-block btn-success"
      @click="agregandoCarrito()"
    >
      <i class="fas fa-shopping-cart"></i>&nbsp; Añadir Servicio
    </button>
  </div>
</template>

<script>
export default {
  props: ["servicio", "idEmpresa", "idServicio"],
  methods: {
    redireccionando() {
      let usuario = JSON.parse(localStorage.getItem("usuario"));
      console.log(usuario);
      if (usuario !== null) {
        this.$router.push(
          "/reservacion/carro/" + this.idEmpresa,
          () => {},
          () => {}
        );
      } else {
        this.$router.push(
          "/home/carrito/" + this.idEmpresa,
          () => {},
          () => {}
        );
      }
    },
    agregandoCarrito() {
      let listCarrito = [];
      listCarrito = JSON.parse(localStorage.getItem("listCarrito"));
      let objectServicio = this.servicio;
      objectServicio.idEmpresa = this.idEmpresa;
      objectServicio.idServicio = this.idServicio;
      objectServicio.cantidad = 1;
      objectServicio.monto = objectServicio.cantidad * objectServicio.precio;

      if (listCarrito === null) {
        let carrito = [];
        carrito.push(objectServicio);
        localStorage.setItem("listCarrito", JSON.stringify(carrito));
        this.$toasted.global
          .appSuccess({
            mensaje: "añadiendo servicio al carrito ...",
          })
          .goAway(4000);
        this.redireccionando();
      } else {
        console.log("hay carritos registrados pendiendtes");
        let resulBusqueda = listCarrito.filter((element) => {
          if (
            element.idServicio == objectServicio.idServicio &&
            element.idEmpresa == objectServicio.idEmpresa &&
            element.idServicioEmpresa == objectServicio.idServicioEmpresa
          )
            return true;
          else return false;
        });

        if (resulBusqueda.length > 0) {
          this.$toasted.global
            .appError({
              mensaje: "este servicio ya se añadido al carrito",
            })
            .goAway(4000);
          this.redireccionando();
        } else {
          listCarrito.push(objectServicio);
          localStorage.setItem("listCarrito", JSON.stringify(listCarrito));
          this.$toasted.global
            .appSuccess({
              mensaje: "añadiendo servicio al carrito ...",
            })
            .goAway(4000);
          this.redireccionando();
        }
      }
    },
  },
};
</script>

<style></style>
