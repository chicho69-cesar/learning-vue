<script setup>
  import Recipe from '../components/Recipe.vue';
  import { useFavoritesStore } from '../stores/favorites';

  /* Accedemos al valor que nos provee nuestro composable de estado global
  de pinia, lo que hará que este componente se suscriba a los cambios
  de este estado, así cada que cambie el estado este componente se volverá
  a renderizar con el nuevo valor del estado. */
  const favorites = useFavoritesStore();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Favorites</h1>
  <p v-if="favorites.noFavorites" class="my-10 text-center text-2xl">No hay favorites</p>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-2">
    <Recipe v-for="recipe in favorites.favorites" :key="recipe.idDrink" :recipe="recipe" />
  </div>
</template>
