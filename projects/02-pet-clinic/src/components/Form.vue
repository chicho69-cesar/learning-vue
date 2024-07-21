<script setup>
  import { reactive, computed } from "vue"
  import Alert from "./Alert.vue"

  const alertState = reactive({
    type: "",
    message: "",
  })

  const emit = defineEmits([
    "update:name",
    "update:property",
    "update:email",
    "update:date",
    "update:symptoms",
    "save-patient",
  ])

  const props = defineProps({
    id: {
      type: [String, null],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    property: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
  })

  const validate = () => {
    if (Object.values(props).includes("")) {
      alertState.message = "Todos los campos son obligatorios"
      alertState.type = "error"
      
      return
    }

    emit("save-patient")

    alertState.message = "Paciente almacenado correctamente"
    alertState.type = "success"

    setTimeout(() => {
      Object.assign(alertState, {
        type: "",
        message: "",
      })
    }, 3000)
  }

  const editing = computed(() => {
    return props.id
  })
</script>

<template>
  <div class="md:w-1/2">
    <h2 class="font-black text-2xl text-center">Seguimiento pacientes</h2>
    
    <p class="text-lg mt-5 text-center mb-10">
      Añade pacientes y <span class="text-violet-600 font-bold">Adminístralos</span>
    </p>

    <Alert v-if="alertState.message" :alert="alertState" />
    
    <form
      @submit.prevent="validate"
      class="bg-gray-200 rounded-lg py-10 px-5 mb-10 mx-5 border shadow-md"
    >
      <div class="mb-5">
        <label for="mascota" class="block uppercase font-bold"> Nombre mascota </label>
        <!-- Para manejar cuando cambia el valor de un campo de un formulario
        utilizamos la función @input el cual manda un $event con un campo
        target que apunta al objeto input y el value es el que contiene el valor
        del campo del formulario. -->
        <input
          id="mascota"
          type="text"
          placeholder="Nombre de la mascota"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black"
          :value="name"
          @input="$emit('update:name', $event.target.value)"
        />
      </div>

      <div class="mb-5">
        <label for="propietario" class="block uppercase font-bold"> Nombre propietario </label>
        <input
          id="propietario"
          type="text"
          placeholder="Nombre del propietario"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black"
          :value="property"
          @input="$emit('update:property', $event.target.value)"
        />
      </div>

      <div class="mb-5">
        <label for="email" class="block uppercase font-bold"> Email </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black"
          :value="email"
          @input="$emit('update:email', $event.target.value)"
        />
      </div>

      <div class="mb-5">
        <label for="alta" class="block uppercase font-bold"> Alta </label>
        <input
          id="alta"
          type="date"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black"
          :value="date"
          @input="$emit('update:date', $event.target.value)"
        />
      </div>

      <div class="mb-5">
        <label for="symptoms" class="block uppercase font-bold"> Síntomas </label>
        <textarea
          id="symptoms"
          placeholder="Describe los síntomas"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black h-40"
          :value="symptoms"
          @input="$emit('update:symptoms', $event.target.value)"
        />
      </div>

      <input
        type="submit"
        class="bg-violet-600 rounded-md w-full p-3 text-white uppercase font-bold hover:bg-violet-700 cursor-pointer transition-colors"
        :value="[editing ? 'Guardar cambios' : 'Registrar paciente']"
      />
    </form>
  </div>
</template>
