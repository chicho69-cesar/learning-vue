<!-- En Vue cuando definimos que nuestro va a utilizar la estructura setup,
es porque vamos a utilizar el composition API, mientras que si no lo
establecemos utilizaremos el options API. -->
<script setup>
  /* Definimos las props que va a tener nuestro componente, en donde 
  podemos definir no solo el nombre de la prop, sino también el tipo
  y diferentes opciones para las props. */
  const props = defineProps({
    guitar: {
      type: Object,
      required: true,
    },
  })

  /* Para definir eventos que se pueden ejecutar dentro de un componente
  utilizamos la función defineEmits para definir los eventos del 
  componente. */
  defineEmits(['add-to-cart'])
</script>

<template>
  <div class="col-md-6 col-lg-4 my-4 row align-items-center">
    <div class="col-4">
      <img
        class="img-fluid"
        :src="'/img/' + guitar.image + '.jpg'"
        :alt="'imagen guitar ' + guitar.name"
      />
    </div>

    <div class="col-8">
      <h3 class="text-black fs-4 fw-bold text-uppercase">
        <!-- Utilizamos el valor de una variable del Script -->
        {{ guitar.name }}
      </h3>

      <p>{{ guitar.description }}</p>
      <p class="fw-black text-primary fs-3">${{ guitar.price }}</p>
      
      <!-- Para emitir un evento utilizamos la función emit, la cual recibe
      el nombre del evento y los valores que queremos enviar. -->
      <button type="button" class="btn btn-dark w-100" @click="$emit('add-to-cart', guitar)">
        Agregar al Carrito
      </button>
    </div>
  </div>
</template>
