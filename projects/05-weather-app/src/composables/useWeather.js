import { ref, computed } from 'vue'
import axios from 'axios'

export default function useWeather() {
  const weather = ref({})
  const loading = ref(false)
  const error = ref('')

  const getWeather = async ({ city, country }) => {
    const key = import.meta.env.VITE_API_KEY

    loading.value = true
    weather.value = {}
    error.value = ''

    try {
      const urlLatLon = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${key}`
      const { data } = await axios(urlLatLon)
      const { lat, lon } = data[0]

      const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
      const { data: result } = await axios(urlWeather)
      
      weather.value = result
    } catch {
      error.value = 'city no encontrada'
    } finally {
      loading.value = false
    }
  }

  const showWeather = computed(() => {
    return Object.values(weather.value).length > 0
  })

  const temperatureFormatter = (temperature) => parseInt(temperature - 273.15)

  return {
    getWeather,
    weather,
    error,
    showWeather,
    temperatureFormatter,
    loading,
  }
}
