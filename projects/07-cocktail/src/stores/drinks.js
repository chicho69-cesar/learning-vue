import { onMounted, ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../services/api-service'
import { useModalStore } from './modal'

export const useDrinksStore = defineStore('drinks', () => {
  const modalStore = useModalStore()

  const categories = ref([])
  const search = reactive({
    name: '',
    category: '',
  })
  const recipes = ref([])
  const recipe = ref({})

  onMounted(async function () {
    const {
      data: { drinks },
    } = await APIService.getCategories()

    categories.value = drinks
  })

  async function getRecipes() {
    const {
      data: { drinks },
    } = await APIService.searchRecipes(search)

    recipes.value = drinks
  }

  async function selectDrink(id) {
    const {
      data: { drinks },
    } = await APIService.searchRecipe(id)

    recipe.value = drinks[0]
    modalStore.handleClickModal()
  }

  const noRecipes = computed(() => recipes.value.length === 0)

  return {
    categories,
    search,
    recipes,
    recipe,
    getRecipes,
    selectDrink,
    noRecipes,
  }
})
