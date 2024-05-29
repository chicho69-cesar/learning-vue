<script setup>
  import { ref, onMounted, watch } from "vue"
  import { db } from "./data/guitars"
  import Guitar from "./components/Guitar.vue"
  import Header from "./components/Header.vue"
  import Footer from "./components/Footer.vue"

  const guitars = ref([])
  const cart = ref([])
  const headerGuitar = ref({})

  watch(
    cart,
    () => {
      saveInLocalStorage()
    },
    {
      deep: true,
    }
  )

  onMounted(() => {
    guitars.value = db
    headerGuitar.value = db[3]

    const cartStorage = localStorage.getItem("cart")
    
    if (cartStorage) {
      cart.value = JSON.parse(cartStorage)
    }
  })

  const saveInLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart.value))
  }

  const addToCart = (guitar) => {
    const existsInCart = cart.value.findIndex((product) => product.id === guitar.id)
    
    if (existsInCart >= 0) {
      cart.value[existsInCart].quantity++
    } else {
      alert("Se ha añadido la guitar al cart")
      guitar.quantity = 1
      cart.value.push(guitar)
    }
  }

  const decreaseQuantity = (id) => {
    const index = cart.value.findIndex((product) => product.id === id)
    if (cart.value[index].quantity <= 1) return
    cart.value[index].quantity--
  }

  const increaseQuantity = (id) => {
    const index = cart.value.findIndex((product) => product.id === id)
    if (cart.value[index].quantity >= 5) return
    cart.value[index].quantity++
  }

  const removeFromCart = (id) => {
    cart.value = cart.value.filter((product) => product.id !== id)
  }

  const emptyCart = () => {
    cart.value = []
  }
</script>

<template>
  <Header
    :cart="cart"
    :headerGuitar="headerGuitar"
    @decrease-quantity="decreaseQuantity"
    @increase-quantity="increaseQuantity"
    @add-to-cart="addToCart"
    @remove-from-cart="removeFromCart"
    @empty-cart="emptyCart"
  />

  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>

    <div class="row mt-5">
      <Guitar
        v-for="guitar in guitars"
        :key="guitar.id"
        :guitar="guitar"
        @add-to-cart="addToCart"
      />
    </div>
  </main>

  <Footer />
</template>

<style lang="css">
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #fff;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: orange;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
