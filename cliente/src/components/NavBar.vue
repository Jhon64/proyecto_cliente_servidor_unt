<template>
  <CNavbar
    expandable="md"
    type="dark"
    style="background-color: #049a27 !important;"
  >
    <CToggler in-navbar @click="collapsed = !collapsed" />
    <CNavbarBrand href="/home">BarberShop</CNavbarBrand>
    <CCollapse :show="collapsed" navbar>
      <!-- Right aligned nav items -->
      <CNavbarNav class="ml-auto">
        <router-link class="link" to="/login">Login</router-link>
        <router-link class="link" to="/registrar">Registrar</router-link>
      </CNavbarNav>
    </CCollapse>
  </CNavbar>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>
<style lang="scss">
.link {
  padding: 5px;
  font-size: 15px;
  color: white;
}
</style>
