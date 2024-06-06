<script setup>
  import useWeather from "../composables/useWeather"
  const { temperatureFormatter } = useWeather()

  defineProps({
    weather: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <div class="result">
    <h2>Clima de: {{ weather.name }}</h2>
    <p class="actual">{{ temperatureFormatter(weather.main.temp) }}&deg;C</p>
    
    <div class="temperatures">
      <p>Min: {{ temperatureFormatter(weather.main.temp_min) }}<span>&deg;C</span></p>
      <p>Max: {{ temperatureFormatter(weather.main.temp_max) }}<span>&deg;C</span></p>
    </div>
  </div>
</template>
