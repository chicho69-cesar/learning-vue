<script setup>
  import { ref, onMounted, watch } from "vue"
  import { db } from "./data/guitars"
  import Guitar from "./components/Guitar.vue"
  import Header from "./components/Header.vue"
  import Footer from "./components/Footer.vue"

  const guitarras = ref([])
  const carrito = ref([])
  const guitarraHeader = ref({})

  watch(
    carrito,
    () => {
      guardarLocalStorage()
    },
    {
      deep: true,
    }
  )

  onMounted(() => {
    guitarras.value = db
    guitarraHeader.value = db[3]

    const carritoStorage = localStorage.getItem("carrito")
    
    if (carritoStorage) {
      carrito.value = JSON.parse(carritoStorage)
    }
  })

  const guardarLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito.value))
  }

  const agregarCarrito = (guitarra) => {
    const existeCarrito = carrito.value.findIndex((producto) => producto.id === guitarra.id)
    
    if (existeCarrito >= 0) {
      carrito.value[existeCarrito].cantidad++
    } else {
      alert("Se ha añadido la guitarra al carrito")
      guitarra.cantidad = 1
      carrito.value.push(guitarra)
    }
  }

  const decrementarCantidad = (id) => {
    const index = carrito.value.findIndex((producto) => producto.id === id)
    if (carrito.value[index].cantidad <= 1) return
    carrito.value[index].cantidad--
  }

  const incrementarCantidad = (id) => {
    const index = carrito.value.findIndex((producto) => producto.id === id)
    if (carrito.value[index].cantidad >= 5) return
    carrito.value[index].cantidad++
  }

  const eliminarProducto = (id) => {
    carrito.value = carrito.value.filter((producto) => producto.id !== id)
  }

  const vaciarCarrito = () => {
    carrito.value = []
  }
</script>

<template>
  <Header
    :carrito="carrito"
    :guitarraHeader="guitarraHeader"
    @decrementar-cantidad="decrementarCantidad"
    @incrementar-cantidad="incrementarCantidad"
    @agregar-carrito="agregarCarrito"
    @eliminar-producto="eliminarProducto"
    @vaciar-carrito="vaciarCarrito"
  />

  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>
    <div class="row mt-5">
      <Guitar
        v-for="guitarra in guitarras"
        :key="guitarra.id"
        :guitarra="guitarra"
        @agregar-carrito="agregarCarrito"
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
