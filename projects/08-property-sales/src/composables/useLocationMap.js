import { ref } from 'vue'

export default function useLocationMap() {
  const zoom = ref(10)
  const center = ref([19.4675186, -99.1116696])

  function pin(e) {
    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]
  }

  return {
    zoom,
    center,
    pin
  }
}
