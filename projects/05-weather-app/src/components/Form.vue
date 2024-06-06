<script setup>
  import { ref, reactive } from "vue"
  import Alert from "./Alert.vue"

  const search = reactive({
    city: "",
    country: "",
  })

  const error = ref("")
  const emit = defineEmits(["get-weather"])

  const countries = [
    { code: "US", name: "Estados Unidos" },
    { code: "MX", name: "México" },
    { code: "AR", name: "Argentina" },
    { code: "CO", name: "Colombia" },
    { code: "CR", name: "Costa Rica" },
    { code: "ES", name: "España" },
    { code: "PE", name: "Perú" },
  ]

  const getWeather = () => {
    if (Object.values(search).includes("")) {
      error.value = "Todos los fields son obligatorios"
      return
    }

    error.value = ""
    emit("get-weather", search)
  }
</script>

<template>
  <form class="form" @submit.prevent="getWeather">
    <Alert v-if="error">
      {{ error }}
    </Alert>

    <div class="field">
      <label for="city">Ciudad</label>
      <input type="text" id="city" placeholder="Ciudad" v-model="search.city" />
    </div>

    <div class="field">
      <label for="country">País</label>
      <select id="country" v-model="search.country">
        <option value="" class="text">-- Seleccione un país --</option>
        <option class="text" v-for="country in countries" :value="country.code" :key="country.code">
          {{ country.name }}
        </option>
      </select>
    </div>

    <input type="submit" value="Consultar Clima" />
  </form>
</template>
