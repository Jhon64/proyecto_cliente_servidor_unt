<template>
  <div>
    <div class="card">
      <div class="card-body row text-center " style="height:188px">
        <div class="col mx-auto my-auto">
          <div class=" content-center text-white p-0 ">
            <div class="c-chart-brand">
              <div class="chartjs-size-monitor">
                <div class="chartjs-size-monitor-expand">
                  <div class=""></div>
                </div>
                <div class="chartjs-size-monitor-shrink">
                  <div class=""></div>
                </div>
              </div>
              <button style="background-color:white;" @click="abrirModal()">
                <img
                  src="https://image.flaticon.com/icons/svg/813/813654.svg"
                  width="50"
                  height="50"
                  alt="100"
                  title="Agregar nuevo catalogo"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CModal title="Nuevo Item" color="info" :show.sync="activarModal">
      <div class="px-4">
        <div>
          <div class="text-center">
            <!-- <img
              src="../../../../assets/img/default.png"
              height="150"
              width="200"
            />-->
            <label>Agregar Imagen</label>
            <input type="file" id="imagenCatalogo" />
          </div>
          <div class="form-group ">
            <label class="text-left">Descipción</label>
            <textarea class="form-control" v-model="descripcion" />
          </div>
          <div class="form-group ">
            <label class="text-left">Tiempo</label>
            <input class="form-control" v-model="tiempo" />
          </div>
          <div class="form-group ">
            <label class="text-left">Precio</label>
            <input class="form-control" v-model="precio" />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="float-right">
          <CButton
            color="secondary"
            @click="cerrarModal()"
            :variant="'outline'"
            class="mx-2"
            >Cancelar</CButton
          >
          <CButton
            color="primary"
            variant="outline"
            class="mx-2"
            type="button"
            @click="registrarCatalogo()"
            >Registrar</CButton
          >
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
import Service from "../../../../servicio/EmpresaServicioService";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      activarModal: false,
      imagen: null,
      tiempo: "",
      precio: "",
      descripcion: "",
    };
  },
  props: ["idEmpresa", "idServicio", "refreshCatalogo"],
  methods: {
    async registrarCatalogo() {
      let inputFile = document.getElementById("imagenCatalogo");
      Swal.fire({
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      let files = inputFile.files;
      console.log(this.precio.trim().length);
      console.log(this.tiempo.trim().length);
      console.log(files.length);
      if (
        this.precio.trim().length > 0 &&
        this.tiempo.trim().length > 0 &&
        files.length > 0
      ) {
        let _vm = this;
        let form = new FormData();
        form.append("imagen", files[0]);
        form.append("tiempo", _vm.tiempo);
        form.append("descripcion", _vm.descripcion);
        form.append("precio", _vm.precio);
        form.append("idEmpresa", _vm.idEmpresa);
        form.append("idServicio", _vm.idServicio);
        let result = await Service.subirImagen(form);
        if (result.status == 200 && result.statusText === "OK") {
          this.$toasted.global
            .appSuccess({
              mensaje: "Catalogo registrado",
            })
            .goAway(5000);
          Swal.fire({
            position: "top-center",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.refreshCatalogo();
          this.cerrarModal();
        } else {
          this.$toasted.global
            .appError({
              mensaje: "error en el servidor",
            })
            .goAway(5000);
          Swal.fire({
            icon: "error",
            title: "Oops...",
          });
        }
      } else {
        Swal.close();
        this.$toasted.global
          .appError({
            mensaje: "completar todos los campos del formulario",
          })
          .goAway(5000);
      }
      console.log(files);
    },
    abrirModal() {
      this.limpiar();

      this.activarModal = true;
    },
    cerrarModal() {
      this.limpiar();
      this.activarModal = false;
    },
    limpiar() {
      this.descripcion = "";
      this.precio = "";
      this.tiempo = "";
      document.getElementById("imagenCatalogo").value = "";
    },
  },
};
</script>

<style></style>
