<script setup>
  import { onMounted } from "vue"
  import { RouterView } from "vue-router"

  import Header from "./components/ui/Header.vue"
</script>

<template>
  <Header />

  <main class="max-w-6xl mx-auto mt-10">
    <!-- El componente RouterView es el componente donde se va a renderizar
    el router de nuestra pagina. -->
    <RouterView />
  </main>
</template>

<style lang="css">
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #fff;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #1e293b;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #0b1016;
  }
</style>
