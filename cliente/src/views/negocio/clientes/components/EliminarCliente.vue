<template>
  <div>
    <CButton
      color="danger"
      variant="outline"
      size="sm"
      square
      title="Eliminar"
      @click="confirmarEliminacion(id)"
      ><Fa icon="trash"
    /></CButton>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Service from "../../../../servicio/ClienteService";
export default {
  name: "EliminarEmpresa",
  props: { id: { type: Number }, refrescarTabla: { type: Function } },
  methods: {
    confirmarEliminacion(id) {
      let _vm = this;
      Swal.fire({
        text: "Desea eliminar este item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.value) {
          console.log(result);
          Swal.fire({
            text: "Eliminando....",
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
          let resultEliminar = await Service.eliminar(id).catch((error) => {
            _vm.$toasted.global
              .appError({
                mensaje:
                  "no se puede eliminar informacion <br> hay informacion enlazada",
              })
              .goAway(3000);
          });
          if (
            resultEliminar.status === 200 &&
            resultEliminar.statusText === "OK"
          ) {
            Swal.close();
            Swal.fire({
              position: "top-center",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            _vm.$toasted.global
              .appSuccess({
                mensaje: "empresa eliminado",
              })
              .goAway(3000);
            _vm.refrescarTabla(true);
          }
        }
      });
    },
  },
};
</script>

<style></style>
