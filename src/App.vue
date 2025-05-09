<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Navbar />
  <router-view />
  <Footer />
</template>
<style>
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>