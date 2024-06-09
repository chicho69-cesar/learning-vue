<script setup>
  import { RouterView } from 'vue-router'
  import { useAuthStore } from './stores/auth'

  const auth = useAuthStore()
</script>

<template>
  <v-card elevation="3" max-width="1200" class="mx-auto">
    <v-layout>
      <v-app-bar color="deep-purple-darken-1">
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }"> Real State - Vue Fire </v-btn>
        </template>

        <template v-slot:append>
          <div v-if="auth.isAuth">
            <v-btn :to="{ name: 'admin-properties' }"> Admin </v-btn>
            <v-btn @click="auth.logOut"> Cerrar sesión </v-btn>
          </div>
          
          <div v-else>
            <v-btn :to="{ name: 'home' }"> Home </v-btn>
            <v-btn :to="{ name: 'login' }"> Iniciar sesión </v-btn>
          </div>
        </template>
      </v-app-bar>

      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style>
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
    background: #5e35b1;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #502d96;
  }
</style>
