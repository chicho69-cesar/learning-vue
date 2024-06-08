<script setup>
  import Recipe from '../components/Recipe.vue';
  import { useDrinksStore } from '../stores/drinks';

  const drinks = useDrinksStore();
</script>

<template>
  <div>
    <h1 class="text-6xl font-extrabold">Recetas</h1>
    <p v-if="drinks.noRecipes" class="my-10 text-center text-2xl">Realice una búsqueda</p>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-2">
      <Recipe v-for="recipe in drinks.recipes" :key="recipe.idDrink" :recipe="recipe" />
    </div>
  </div>
</template>
