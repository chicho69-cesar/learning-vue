import { onMounted, ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../services/api-service'
import { useModalStore } from './modal'

/* Creamos nuestra store de pinia, la cual sera llamada como 'drinks', y el valor
que esta store estará dada por lo que regrese el callback que recibe el defineStore */
export const useDrinksStore = defineStore('drinks', () => {
  /* Nos suscribimos a un estado global desde la definición de otra store, asi
  cuando dicho estado cambie hará que esta store también se actualice. */
  const modalStore = useModalStore()

  /* Podemos utilizar los elementos reactivos de vue para crear una store */
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

  /* Regresamos un objeto con los elementos que formaran parte de este 
  estado. */
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
