<template>
  <CCard>
    <CCardHeader>
      Catalogo
    </CCardHeader>
    <CCardBody>
      <div class="row">
        <div class="col-6">
          <span>Seleccionar Empresa :</span>
          <select
            class="form-control"
            name="empresa"
            v-model="selectEmpresa"
            @change="filtrarCatalogo($event)"
          >
            <option value=""></option>
            <option
              v-for="(empresa, i) in listEmpresas"
              :key="i"
              :value="empresa.id"
            >
              {{ empresa.nombre }}
            </option>
          </select>
        </div>
        <div class="col-6">
          <span>Seleccionar Servicio</span>
          <select
            class="form-control"
            v-model="selectServicio"
            name="servicio"
            @change="filtrarCatalogo($event)"
          >
            <option value=""></option>
            <option
              v-for="(servicio, i) in listServicio"
              :key="i"
              :value="servicio.id"
              >{{ servicio.nombre }}
            </option>
          </select>
        </div>
      </div>
      <hr />
      <Catalogo
        :refreshCatalogo="actualizarCatalogo"
        :catalogoList="listCatalogo"
        :idEmpresa="selectEmpresa"
        :idServicio="selectServicio"
      ></Catalogo>
    </CCardBody>
  </CCard>
</template>

<script>
import empresaService from "../../../servicio/EmpresaService";
import servicioService from "../../../servicio/ServicioService";
import empresaSrvicioService from "../../../servicio/EmpresaServicioService";
import Catalogo from "./components/Catalogo";
export default {
  components: {},
  data() {
    return {
      listServicio: [],
      listEmpresas: [],
      listEmpresaServicio: [],
      listCatalogo: [],
      selectEmpresa: "",
      selectServicio: "",
    };
  },
  components: { Catalogo },
  mounted() {
    this.listarEmpresas();
    this.listarServicios();
  },
  head: {
    title: { inner: "Catalogo" },
  },
  methods: {
    actualizarCatalogo() {
      this.cargarCatalogo();
    },
    filtrarCatalogo(evt) {
      if (this.selectServicio == "") {
        this.$toasted.global
          .appError({
            mensaje: "Seleccionar Servicio",
          })
          .goAway(1200);
      }
      if (this.selectEmpresa == "") {
        this.$toasted.global
          .appError({
            mensaje: "Seleccionar Empresa",
          })
          .goAway(1200);
      }
      if (this.selectServicio !== "" && this.selectEmpresa !== "") {
        this.cargarCatalogo();
      }
    },
    async cargarCatalogo() {
      let empresa = this.selectEmpresa;
      let servicio = this.selectServicio;
      this.listCatalogo = [];
      let resultCatalogo = await empresaSrvicioService.listarxEmpxserv(
        empresa,
        servicio
      );
      if (resultCatalogo.status == 200 && resultCatalogo.statusText === "OK") {
        this.listCatalogo = resultCatalogo.data;
      } else {
        this.$toasted.global
          .appError({
            mensaje: "error en la base de datos",
          })
          .goAway(3000);
      }
    },
    async listarEmpresas() {
      let resultService = await empresaService.listarEmpresa();
      if (resultService.status == 200 && resultService.statusText === "OK") {
        this.listEmpresas = [];
        this.listEmpresas = resultService.data.map((item) => {
          let newItem = { id: item.IdEmpresa, nombre: item.RazonSocial };
          return newItem;
        });
      }
    },

    async listarServicios() {
      let resultService = await servicioService.listar();
      if (resultService.status == 200 && resultService.statusText === "OK") {
        this.listServicio = [];
        this.listServicio = resultService.data.map((item) => {
          let newItem = { id: item.idServicio, nombre: item.nombre };
          return newItem;
        });
      }
    },
  },
};
</script>

<style></style>
