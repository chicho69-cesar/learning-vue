<script setup>
  import Form from "./components/Form.vue"
  import Weather from "./components/Weather.vue"
  import Spinner from "./components/Spinner.vue"
  import Alert from "./components/Alert.vue"
  import useWeather from "./composables/useWeather"

  const { weather, error, loading, showWeather, getWeather, temperatureFormatter } = useWeather()
</script>

<template>
  <header>
    <h1 class="title">Buscador de Clima</h1>
  </header>

  <div class="container weather-searcher">
    <Form @get-weather="getWeather" />
    <Spinner v-if="loading" />
    <Alert v-if="error">{{ error }}</Alert>
    <Weather v-if="showWeather" :weather="weather" />
  </div>
</template>
