<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img src="img/avatars/6.jpg" class="c-avatar-img " />
        </div>
      </CHeaderNavLink>
    </template>

    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>{{ $store.state.usuarioModule.usuario.usuario }}</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user" /><router-link to="/perfil">Perfil</router-link>
    </CDropdownItem>
    <CDropdownItem @click="cerrarSesion()">
      <CIcon name="cil-lock-locked" />
      <a>Cerrar sesion </a>
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      itemsCount: 42,
    };
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem("usuario");
      localStorage.removeItem("tokenAuth");
      this.$router.push(
        "/",
        () => {},
        () => {}
      );
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
