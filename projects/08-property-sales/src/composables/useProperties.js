import { ref, computed } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

export default function useProperties() {
  const swimmingPool = ref(false)

  const storage = useFirebaseStorage()
  const db = useFirestore()
  const propertiesCollection = useCollection(collection(db, 'properties'))

  async function deleteItem(id, urlImage) {
    if (confirm('¿Está seguro de eliminar esta propiedad?')) {
      const docRef = doc(db, 'properties', id)
      const imageRef = storageRef(storage, urlImage)

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
    }
  }

  const filteredItems = computed(() => {
    return swimmingPool.value
      ? propertiesCollection.value.filter((property) => property.swimmingPool)
      : propertiesCollection.value
  })

  return {
    swimmingPool,
    propertiesCollection,
    filteredItems,
    deleteItem
  }
}
