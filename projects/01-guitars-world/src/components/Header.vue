<script setup>
  import { computed } from "vue"

  const props = defineProps({
    cart: {
      type: Array,
      required: true,
    },
    headerGuitar: {
      type: Object,
      required: true,
    },
  })

  defineEmits([
    "decrease-quantity",
    "increase-quantity",
    "add-to-cart",
    "remove-from-cart",
    "empty-cart",
  ])

  /* La función computed nos permite realizar cálculos reactivos, es decir,
  que si alguna de las variables que se utilizan en el cálculo cambia,
  el valor de la variable calculada también cambia. */
  const totalToPay = computed(() => {
    return props.cart.reduce((total, product) => total + product.quantity * product.price, 0)
  })
</script>

<template>
  <header class="py-5 header">
    <div class="container-xl">
      <div class="row justify-content-center justify-content-md-between">
        <div class="col-8 col-md-3">
          <a href="index.html">
            <img class="img-fluid" src="/img/logo.svg" alt="imagen logo" />
          </a>
        </div>

        <nav class="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
          <div class="carrito">
            <img class="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

            <div id="carrito" class="bg-white p-3">
              <!-- Para utilizar condicionales en Vue utilizamos la 
              directiva v-if, v-else-if y v-else. -->
              <p v-if="cart.length === 0" class="text-center m-0">
                El carrito esta vació
              </p>

              <div v-else>
                <table class="w-100 table">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="product in cart" :key="product.id">
                      <td>
                        <img
                          class="img-fluid"
                          :src="'/img/' + product.image + '.jpg'"
                          :alt="'imagen guitarra ' + product.name"
                        />
                      </td>

                      <td>{{ product.name }}</td>
                      <td class="fw-bold">${{ product.price }}</td>
                      
                      <td class="flex align-items-start gap-4">
                        <button
                          type="button"
                          class="btn btn-dark"
                          @click="$emit('decrease-quantity', product.id)"
                        >
                          -
                        </button>

                        {{ product.quantity }}
                        
                        <button
                          type="button"
                          class="btn btn-dark"
                          @click="$emit('increase-quantity', product.id)"
                        >
                          +
                        </button>
                      </td>

                      <td>
                        <button
                          class="btn btn-danger"
                          type="button"
                          @click="$emit('remove-from-cart', product.id)"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p class="text-end">
                  Total pagar: <span class="fw-bold">${{ totalToPay }}</span>
                </p>

                <button class="btn btn-dark w-100 mt-3 p-2" @click="$emit('empty-cart')">
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="row mt-5">
        <div class="col-md-6 text-center text-md-start pt-5">
          <h1 class="display-2 fw-bold">Modelo {{ headerGuitar.name }}</h1>
          
          <p class="mt-5 fs-5 text-white">
            {{ headerGuitar.description }}
          </p>

          <p class="text-primary fs-1 fw-black">${{ headerGuitar.price }}</p>
          
          <button
            type="button"
            class="btn fs-4 bg-primary text-white py-2 px-5"
            @click="$emit('add-to-cart', headerGuitar)"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>

    <img class="header-guitarra" src="/img/header_guitarra.png" alt="imagen header" />
  </header>
</template>
