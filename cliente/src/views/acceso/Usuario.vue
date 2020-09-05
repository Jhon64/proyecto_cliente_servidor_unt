<template
  ><div>
    <CCard>
      <CCardHeader>
        Usuarios
      </CCardHeader>
      <CCardBody>
        <template>
          <CCardBody>
            <CrearUsuario></CrearUsuario>
            <div class="clearfix"></div>
            <CDataTable
              :items="listaUsuarios"
              :fields="fields"
              table-filter
              items-per-page-select
              :items-per-page="5"
              hover
              striped
              sorter
              pagination
            >
              <template #Persona="{item}">
                <td class="">
                  <div v-if="item.Persona !== null">
                    <div>
                      <strong>Nombre</strong> : {{ item.Persona.nombre }}
                    </div>
                    <div>
                      <strong>Apellido</strong> : {{ item.Persona.apellido }}
                    </div>
                    <div><strong>Dni</strong> : {{ item.Persona.dni }}</div>
                  </div>
                </td>
              </template>
              <template #opciones="{persona, index}">
                <td class="py-2" style="vertical-align:middle">
                  <CButtonToolbar>
                    <CButton
                      color="success"
                      variant="outline"
                      size="sm"
                      title="Editar"
                      square
                    >
                      <Fa icon="pencil-alt"></Fa>
                    </CButton>
                    <CButton
                      color="danger"
                      variant="outline"
                      size="sm"
                      square
                      title="Eliminar"
                      @click="eliminar()"
                      ><Fa icon="trash"
                    /></CButton>
                  </CButtonToolbar>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </template>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import usuarioService from "../../servicio/UsuarioService";
import CrearUsuario from "../../components/usuario/CrearUsuario";

const items = [
  {
    username: "Samppa Nori",
    registered: "2012/01/01",
    role: "Member",
    status: "Active",
  },
  {
    username: "Estavan Lykos",
    registered: "2012/02/01",
    role: "Staff",
    status: "Banned",
  },
  {
    username: "Chetan Mohamed",
    registered: "2012/02/01",
    role: "Admin",
    status: "Inactive",
  },
  {
    username: "Derick Maximinus",
    registered: "2012/03/01",
    role: "Member",
    status: "Pending",
  },
  {
    username: "Friderik Dávid",
    registered: "2012/01/21",
    role: "Staff",
    status: "Active",
  },
  {
    username: "Yiorgos Avraamu",
    registered: "2012/01/01",
    role: "Member",
    status: "Active",
  },
  {
    username: "Avram Tarasios",
    registered: "2012/02/01",
    role: "Staff",
    status: "Banned",
    _classes: "table-success",
  },
  {
    username: "Quintin Ed",
    registered: "2012/02/01",
    role: "Admin",
    status: "Inactive",
  },
  {
    username: "Enéas Kwadwo",
    registered: "2012/03/01",
    role: "Member",
    status: "Pending",
  },
  {
    username: "Agapetus Tadeáš",
    registered: "2012/01/21",
    role: "Staff",
    status: "Active",
  },
  {
    username: "Carwyn Fachtna",
    registered: "2012/01/01",
    role: "Member",
    status: "Active",
    _classes: "table-info",
  },
  {
    username: "Nehemiah Tatius",
    registered: "2012/02/01",
    role: "Staff",
    status: "Banned",
  },
  {
    username: "Ebbe Gemariah",
    registered: "2012/02/01",
    role: "Admin",
    status: "Inactive",
  },
  {
    username: "Eustorgios Amulius",
    registered: "2012/03/01",
    role: "Member",
    status: "Pending",
  },
  {
    username: "Leopold Gáspár",
    registered: "2012/01/21",
    role: "Staff",
    status: "Active",
  },
  {
    username: "Pompeius René",
    registered: "2012/01/01",
    role: "Member",
    status: "Active",
  },
  {
    username: "Paĉjo Jadon",
    registered: "2012/02/01",
    role: "Staff",
    status: "Banned",
  },
  {
    username: "Micheal Mercurius",
    registered: "2012/02/01",
    role: "Admin",
    status: "Inactive",
  },
  {
    username: "Ganesha Dubhghall",
    registered: "2012/03/01",
    role: "Member",
    status: "Pending",
  },
  {
    username: "Hiroto Šimun",
    registered: "2012/01/21",
    role: "Staff",
    status: "Active",
  },
  {
    username: "Vishnu Serghei",
    registered: "2012/01/01",
    role: "Member",
    status: "Active",
  },
  {
    username: "Zbyněk Phoibos",
    registered: "2012/02/01",
    role: "Staff",
    status: "Banned",
  },
  {
    username: "Einar Randall",
    registered: "2012/02/01",
    role: "Admin",
    status: "Inactive",
    _classes: "table-danger",
  },
  {
    username: "Félix Troels",
    registered: "2012/03/21",
    role: "Staff",
    status: "Active",
  },
  {
    username: "Aulus Agmundr",
    registered: "2012/01/01",
    role: "Member",
    status: "Pending",
  },
];

const fields = [
  { key: "Index", label: "Index" },
  { key: "Usuario", class: "bg-primary" },
  { key: "Clave", _style: "min-width:100px;", class: "bg-primary" },
  { key: "Persona", _style: "min-width:100px;", class: "bg-primary" },
  {
    key: "opciones",
    label: "",
    class: "bg-primary",
    sorter: false,
    filter: false,
  },
];

export default {
  components: { CrearUsuario: CrearUsuario },
  data() {
    return {
      listaUsuarios: [],
      items: items.map((item, id) => {
        return { ...item, id };
      }),
      fields,
      details: [],
      collapseDuration: 0,
      acticarModal: false,
    };
  },
  mounted() {
    this.listarUsuarios();
  },
  methods: {
    eliminar(id) {
      console.log("elminar " + id);
    },

    async listarUsuarios() {
      let resultUsuarios = await usuarioService.listarUsuarios();

      if (resultUsuarios.status == 200) {
        this.listaUsuarios = [];
        this.listaUsuarios = resultUsuarios.data.map((usuario) => {
          let newUsuario = usuario;
          newUsuario.Opciones = "<button>Editar</button>";
          return newUsuario;
        });
      }
    },
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
  },
};
</script>

<style></style>
