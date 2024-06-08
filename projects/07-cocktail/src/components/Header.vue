<script setup>
  import { computed } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import { useDrinksStore } from '../stores/drinks'
  import { useNotificationStore } from '../stores/notifications'

  const route = useRoute()
  const store = useDrinksStore()
  const notification = useNotificationStore()

  const homePage = computed(() => route.name === 'home')

  const handleSubmit = () => {
    if (Object.values(store.search).includes('')) {
      notification.$patch({
        text: 'Todos los campos son obligatorios',
        show: true,
        error: true,
      })

      return
    }

    store.getRecipes()
  }
</script>

<template>
  <div>
    <header class="bg-slate-800" :class="{ header: homePage }">
      <div class="mx-auto container px-5 py-16">
        <div class="flex justify-between items-center">
          <div>
            <RouterLink :to="{ name: 'home' }">
              <img class="w-32" src="/img/logo.svg" alt="logotipo" />
            </RouterLink>
          </div>

          <nav class="flex gap-4 text-white">
            <RouterLink :to="{ name: 'home' }" class="uppercase font-bold" active-class="text-orange-500">
              Inicio
            </RouterLink>

            <RouterLink
              :to="{ name: 'favorites' }"
              class="uppercase font-bold"
              active-class="text-orange-500"
            >
              Favoritos
            </RouterLink>
          </nav>
        </div>

        <form
          v-if="homePage"
          class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
          @submit.prevent="handleSubmit"
        >
          <div class="space-y-4">
            <label for="ingredient" class="block text-white uppercase font-extrabold text-lg">
              Nombre o Ingredientes
            </label>

            <input
              id="ingredient"
              type="text"
              class="p-3 w-full rounded-lg focus:outline-none"
              placeholder="Nombre o Ingrediente: Ej. Vodka, Tequila, etc"
              v-model="store.search.name"
            />
          </div>

          <div class="space-y-4">
            <label for="category" class="block text-white uppercase font-extrabold text-lg">
              Categoría
            </label>

            <select
              id="category"
              class="p-3 w-full rounded-lg focus:outline-none"
              v-model="store.search.category"
            >
              <option value="">-- Seleccione --</option>

              <option
                v-for="category in store.categories"
                :key="category.strCategory"
                :value="category.strCategory"
              >
                {{ category.strCategory }}
              </option>
            </select>
          </div>

          <input
            type="submit"
            class="bg-orange-800 hover:bg-orange-900 text-white cursor-pointer font-extrabold w-full p-2 rounded-lg uppercase"
            value="Buscar recetas"
          />
        </form>
      </div>
    </header>
  </div>
</template>

<style scoped>
  .header {
    background-image: url('/img/bg.webp');
    background-size: cover;
    background-position: center;
  }
</style>
