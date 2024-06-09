import { onMounted, ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const router = useRouter()
  const errorMsg = ref('')
  const authUser = ref(null)

  const errorCodes = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'El password es incorrecto'
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user
      }
    })
  })

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        authUser.value = user
        router.push({ name: 'admin-propiedades' })
      })
      .catch((error) => {
        errorMsg.value = errorCodes[error.code]
      })
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null
        router.push({ name: 'login' })
      })
      .catch((error) => console.log(error))
  }

  const hasError = computed(() => {
    return errorMsg.value
  })

  const isAuth = computed(() => {
    return authUser.value
  })

  return {
    login,
    logOut,
    hasError,
    errorMsg,
    isAuth
  }
})
