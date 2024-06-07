<script setup>
  import { computed } from "vue"
  import { RouterLink } from "vue-router"

  const props = defineProps({
    client: {
      type: Object,
    },
  })

  defineEmits(["update-state", "delete-client"])

  const clientName = computed(() => {
    return props.client.name + " " + props.client.lastName
  })

  const clientState = computed(() => {
    return props.client.state
  })
</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900 capitalize">{{ clientName }}</p>
      <p class="text-gray-500">{{ client.email }}</p>
    </td>

    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-900 font-bold capitalize">{{ client.business }}</p>
      <p class="text-gray-600 capitalize">{{ client.position }}</p>
    </td>

    <td class="whitespace-nowrap px-3 py-4 text-sm">
      <button
        class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
        :class="[clientState ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
        @click="$emit('update-state', { id: client.id, state: client.state })"
      >
        {{ clientState ? "Activo" : "Inactivo" }}
      </button>
    </td>

    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <RouterLink
        :to="{ name: 'edit-client', params: { id: client.id } }"
        class="text-indigo-600 hover:text-indigo-500 mr-5"
      >
        Editar
      </RouterLink>

      <RouterLink
        to="/"
        class="text-red-600 hover:text-red-500"
        @click="$emit('delete-client', client.id)"
      >
        Eliminar
      </RouterLink>
    </td>
  </tr>
</template>
