import api from '../lib/axios'

export default {
  getCategories() {
    return api('/list.php?c=list')
  },
  searchRecipes({ category, name }) {
    return api(`/filter.php?c=${category}&i=${name}`)
  },
  searchRecipe(id) {
    return api(`/lookup.php?i=${id}`)
  },
}
