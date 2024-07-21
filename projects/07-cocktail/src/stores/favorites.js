import { ref, watch, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useDrinksStore } from './drinks'
import { useModalStore } from './modal'
import { useNotificationStore } from './notifications'

export const useFavoritesStore = defineStore('favorites', () => {
  const drinks = useDrinksStore()
  const modal = useModalStore()
  const notification = useNotificationStore()
  
  const favorites = ref([])

  onMounted(() => {
    favorites.value = JSON.parse(localStorage.getItem('favorites')) ?? []
  })

  watch(
    favorites,
    () => {
      syncLocalStorage()
    },
    {
      deep: true,
    }
  )

  function syncLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  function existFavorite() {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favorites')) ?? []
    return favoritesLocalStorage.some((favorite) => favorite.idDrink === drinks.recipe.idDrink)
  }

  function deleteFavorite() {
    favorites.value = favorites.value.filter((favorite) => favorite.idDrink !== drinks.recipe.idDrink)
    notification.show = true
    notification.text = 'Se eliminó de favorites'
  }

  function addFavorite() {
    favorites.value.push(drinks.recipe)
    notification.show = true
    notification.text = 'Se agregó a favorites'
  }

  function handleClickFavorite() {
    if (existFavorite()) {
      deleteFavorite()
    } else {
      addFavorite()
    }

    modal.modal = false
  }

  const noFavorites = computed(() => favorites.value.length === 0)

  return {
    favorites,
    existFavorite,
    handleClickFavorite,
    noFavorites,
  }
})
