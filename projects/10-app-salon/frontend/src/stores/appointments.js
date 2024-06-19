import { defineStore } from 'pinia'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import AppointmentAPI from '../api/AppointmentAPI'
import { convertToDDMMYY, convertToISO } from '../helpers/date'
import { useUserStore } from '../stores/user'

export const useAppointmentStore = defineStore('appointments', () => {
  const appointmentId = ref('')
  const services = ref([])
  const date = ref('')
  const time = ref('')
  const appointmentsByDate = ref([])
  const hours = ref([])

  const toast = inject('toast')
  const router = useRouter()
  const user = useUserStore()

  onMounted(() => {
    const startHour = 10
    const endHour = 19

    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ':00')
    }
  })

  watch(date, async () => {
    time.value = ''

    if (date.value === '') return

    const { data } = await AppointmentAPI.getByDate(date.value)

    if (appointmentId.value) {
      appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value)
      time.value = data.filter(appointment => appointment._id === appointmentId.value)[0].time
    } else {
      appointmentsByDate.value = data
    }
  })

  function setSelectedAppointment(appointment) {
    services.value = appointment.services
    date.value = convertToDDMMYY(appointment.date)
    time.value = appointment.time
    appointmentId.value = appointment._id
  }

  function onServiceSelected(service) {
    if (services.value.some(selectedService => selectedService._id === service._id)) {
      services.value = services.value.filter(selectedService => selectedService._id !== service._id)
    } else {
      if (services.value.length === 2) {
        alert('Máximo 2 servicios')
        return
      }

      services.value.push(service)
    }

  }

  async function saveAppointment() {
    const appointment = {
      services: services.value.map(service => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value
    }

    if (appointmentId.value) {
      try {
        const { data } = await AppointmentAPI.update(appointmentId.value, appointment)

        toast.open({
          message: data.msg,
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      }

    } else {
      try {
        const { data } = await AppointmentAPI.create(appointment)
        toast.open({
          message: data.msg,
          type: 'success'
        })

      } catch (error) {
        console.log(error)
      }
    }

    clearAppointmentData()
    user.getUserAppointments()

    router.push({
      name: 'my_appointments'
    })
  }

  function clearAppointmentData() {
    appointmentId.value = ''
    services.value = [],
      date.value = '',
      time.value = ''
  }

  async function cancelAppointment(id) {
    if (confirm('¿Deseas cancelar esta cita?')) {
      try {
        const { data } = await AppointmentAPI.delete(id)
        
        toast.open({
          message: data.msg,
          type: 'success'
        })
        
        user.getUserAppointments()
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type: 'error'
        })
      }
    }
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some(service => service._id === id)
  })

  const noServiceSelected = computed(() => {
    return services.value.length === 0
  })

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  const isValidReservation = computed(() => {
    return services.value.length && date.value.length && time.value.length
  })

  const isDateSelected = computed(() => {
    return date.value ? true : false
  })

  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(appointment => appointment.time === hour)
    }
  })

  return {
    services,
    date,
    hours,
    time,
    setSelectedAppointment,
    onServiceSelected,
    saveAppointment,
    clearAppointmentData,
    cancelAppointment,
    isServiceSelected,
    noServiceSelected,
    totalAmount,
    isValidReservation,
    isDateSelected,
    disableTime
  }
})
