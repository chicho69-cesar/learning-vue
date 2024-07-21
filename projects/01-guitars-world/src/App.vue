<!-- Los archivos de componentes en Vue son SFC (Single File Component)
es decir un solo archivo donde ponemos la sección de lógica con la 
sección de script, la arquitectura o definición de los elementos html
del componente dentro del template y por ultimo los estilos para el
componente dentro del bloque de css. -->
<script setup>
  import { ref, onMounted, watch } from "vue"
  import { db } from "./data/guitars"
  import Guitar from "./components/Guitar.vue"
  import Header from "./components/Header.vue"
  import Footer from "./components/Footer.vue"

  /* Los elementos ref son como los estados en React, es decir, variables
  reactivas mediante las cuales podemos crear componentes con estados. */
  const guitars = ref([])
  const cart = ref([])
  const headerGuitar = ref({})

  /* La función watch es similar a useEffect en React, es decir, se ejecuta
  cada vez que cambia el valor de la variable que se está observando.
  La unica diferencia con useEffect es que esta solo se ejecuta cuando la 
  variable cambia. */
  watch(
    cart,
    () => {
      saveInLocalStorage()
    },
    {
      deep: true,
    }
  )

  /* La función onMounted es similar a useEffect en React, es decir, se ejecuta
  una sola vez cuando el componente se monta en el DOM.
  La diferencia con useEffect es que como watch observa los cambios en
  las variables onMounted solo se ejecuta cuando se monta el componente. */
  onMounted(() => {
    /* Para acceder a los valores de las variables reactivas que se 
    definen para el estado debemos de acceder a traves del atributo value */
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
      /* Cambiamos el valor del estado */
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
  <!-- Utilizamos nuestro componente Header, donde para pasar valores 
  a los atributos se usa la sintaxis de dos puntos (:) y para pasar 
  funciones para los eventos utilizamos el símbolo de arroba (@) -->
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
      <!-- En Vue para poder crear ciclos que permitan renderizar listas
      de valores en iteradores utilizamos la directiva v-for -->
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
