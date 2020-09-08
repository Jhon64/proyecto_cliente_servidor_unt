<template>
  <div>
    <Navbar></Navbar>

    <CContainer fluid>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </CContainer>
  </div>
</template>

<script>
import Navbar from "../components/NavBar";
export default {
  components: { Navbar },
};
</script>

<style></style>
