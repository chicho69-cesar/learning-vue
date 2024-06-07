<script setup>
  import { onMounted, reactive } from "vue"
  import { FormKit } from "@formkit/vue"
  import { useRouter, useRoute } from "vue-router"
  import clientsService from "../services/clients-service"
  import RouterLink from "../components/ui/RouterLink.vue"
  import Title from "../components/ui/Title.vue"

  const router = useRouter()
  const route = useRoute()

  const { id } = route.params
  const formData = reactive({})

  onMounted(() => {
    clientsService.getClient(id)
      .then(({ data }) => {
        Object.assign(formData, data)
      })
      .catch((error) => console.log(error))
  })

  defineProps({
    titleProp: {
      type: String,
    },
  })

  const handleSubmit = (data) => {
    clientsService.updateClient(id, data)
      .then(() => router.push({ name: "home" }))
      .catch((error) => console.log(error))
  }
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="home">Volver</RouterLink>
    </div>

    <Title>{{ titleProp }}</Title>

    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Guardar cambios"
          incomplete-message="Por favor corrija los errores y vuelva a intentarlo"
          @submit="handleSubmit"
          :value="formData"
        >
          <FormKit
            type="text"
            label="Nombre*"
            name="name"
            placeholder="Nombre del cliente"
            validation="required"
            :validation-messages="{ required: 'El nombre del cliente es obligatorio' }"
            v-model="formData.name"
          />

          <FormKit
            type="text"
            label="Apellido*"
            name="lastName"
            placeholder="Apellido del cliente"
            validation="required"
            :validation-messages="{ required: 'El apellido del cliente es obligatorio' }"
            v-model="formData.lastName"
          />

          <FormKit
            type="email"
            label="Email*"
            name="email"
            placeholder="Email del cliente"
            validation="required|email"
            :validation-messages="{
              required: 'El email del cliente es obligatorio',
              email: 'Ingrese un email válido',
            }"
            v-model="formData.email"
          />

          <FormKit
            type="text"
            label="Teléfono"
            name="phone"
            placeholder="Teléfono: XXX-XXX-XXXX"
            validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{ matches: 'El formato no es válido' }"
            v-model="formData.phone"
          />

          <FormKit
            type="text"
            label="Empresa"
            name="business"
            placeholder="Empresa del cliente"
            v-model="formData.business"
          />

          <FormKit
            type="text"
            label="Puesto"
            name="position"
            placeholder="Puesto del cliente"
            v-model="formData.position"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style>
  .formkit-wrapper {
    max-width: 100%;
  }
</style>
