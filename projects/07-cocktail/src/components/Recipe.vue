<script setup>
  import { useDrinksStore } from '../stores/drinks'

  const drinks = useDrinksStore()

  defineProps({
    recipe: {
      type: Object,
    },
  })
</script>

<template>
  <div class="border shadow-lg rounded">
    <div class="overflow-hidden">
      <img
        class="hover:scale-125 transition-transform hover:rotate-2"
        :src="recipe.strDrinkThumb"
        :alt="'imagen de ' + recipe.strDrink"
      />
    </div>

    <div class="p-5">
      <h2 class="text-2xl truncate font-extrabold">{{ recipe.strDrink }}</h2>
      
      <button
        type="button"
        class="bg-orange-400 rounded hover:bg-orange-500 mt-5 w-full font-bold text-white text-lg"
        @click="drinks.selectDrink(recipe.idDrink)"
      >
        Ver recipe
      </button>
    </div>
  </div>
</template>
