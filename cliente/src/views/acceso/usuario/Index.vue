<template
  ><div>
    <CCard>
      <CCardHeader>
        Usuarios
      </CCardHeader>
      <CCardBody>
        <CrearUsuario :refrescarLista="actualizarLista"></CrearUsuario>
        <div class="clearfix"></div>
        <TablaUsuario
          :lista="listaUsuarios"
          :refrescarLista="actualizarLista"
        ></TablaUsuario>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import usuarioService from "../../../servicio/UsuarioService";
import CrearUsuario from "./components/CrearUsuario";
import TablaUsuario from "./components/TablaUsuario";

export default {
  components: { CrearUsuario: CrearUsuario, TablaUsuario },
  data() {
    return {
      listaUsuarios: [],
    };
  },
  mounted() {
    this.listarUsuarios();
  },
  methods: {
    actualizarLista(condicion) {
      if (condicion) {
        this.listarUsuarios();
      }
    },

    async listarUsuarios() {
      let resultUsuarios = await usuarioService.listarUsuarios();
      console.log(resultUsuarios);
      if (resultUsuarios.status == 200) {
        this.listaUsuarios = [];
        let _vm = this;
        this.listaUsuarios = resultUsuarios.data.map((usuario) => {
          let newUsuario = usuario;
          newUsuario.Opciones = "";
          newUsuario.Clave = _vm.convertirClave(usuario.Clave);
          return newUsuario;
        });
      }
    },
    convertirClave(clave) {
      let length = clave.length;
      let cif = clave.substr(1, 1);

      for (let index = 0; index < length; index++) {
        cif += "*";
      }
      return cif;
    },
  },
};
</script>
