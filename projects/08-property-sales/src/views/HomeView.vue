<script setup>
  import Property from '../components/Property.vue'
  import useProperties from '../composables/useProperties'
  import { propertyPrice } from '../helpers/index'

  const { swimmingPool, filteredItems } = useProperties()
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5">
    Nuestras propiedades
  </h1>

  <v-card-title class="text-h5">
    Búsqueda
    <v-checkbox label="Alberca" v-model="swimmingPool" />
  </v-card-title>

  <v-card flat class="py-10">
    <v-row>
      <Property
        v-for="property in filteredItems"
        :key="property.id"
        :property="property"
        :price="propertyPrice"
      />
    </v-row>
  </v-card>
</template>
