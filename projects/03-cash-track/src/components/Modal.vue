<script setup>
  import { ref, computed } from "vue"

  import closeModal from "../assets/img/cerrar.svg"
  import Alert from "./Alert.vue"

  const error = ref("")

  const emit = defineEmits([
    "close-modal",
    "save-expense",
    "delete-expense",
    "update:name",
    "update:quantity",
    "update:category",
  ])

  const props = defineProps({
    modal: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: [String, Number],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
    id: {
      type: [String, null],
      required: true,
    },
  })

  const old = props.cantidad

  const addExpense = () => {
    const { name, quantity, category, available, id } = props
  
    if ([name, quantity, category].includes("")) {
      error.value = "Todos los campos son obligatorios"

      setTimeout(() => {
        error.value = ""
      }, 3000)

      return
    }

    if (quantity <= 0) {
      error.value = "Cantidad no válida"

      setTimeout(() => {
        error.value = ""
      }, 3000)

      return
    }

    if (id) {
      if (quantity > old + available) {
        error.value = "Has excedido el saldo disponible"

        setTimeout(() => {
          error.value = ""
        }, 3000)

        return
      }
    } else {
      if (quantity > available) {
        error.value = "Has excedido el saldo disponible"

        setTimeout(() => {
          error.value = ""
        }, 3000)

        return
      }
    }

    emit("save-expense")
  }

  const isEditing = computed(() => {
    return props.id
  })
</script>

<template>
  <div class="modal">
    <div class="close-modal">
      <img :src="closeModal" alt="ico close modal" @click="$emit('close-modal')" />
    </div>

    <div class="container form-container" :class="[modal.animate ? 'animate' : 'close']">
      <form class="new-expense" @submit.prevent="addExpense">
        <legend>{{ isEditing ? "Guardar Cambios" : "Añadir Gasto" }}</legend>

        <Alert v-if="error">{{ error }}</Alert>

        <div class="field">
          <label for="name">Nombre gasto:</label>

          <input
            type="text"
            id="name"
            placeholder="Añade el nombre del gasto"
            :value="name"
            @input="$emit('update:name', $event.target.value)"
          />
        </div>

        <div class="field">
          <label for="quantity">Cantidad:</label>

          <input
            type="number"
            id="quantity"
            placeholder="Añade la cantidad del gasto"
            :value="quantity"
            @input="$emit('update:quantity', +$event.target.value)"
          />
        </div>

        <div class="field">
          <label for="category">Categoría:</label>

          <select
            id="category"
            :value="category"
            @input="$emit('update:category', $event.target.value)"
          >
            <option value="">-- Seleccione --</option>
            <option value="savings">Ahorro</option>
            <option value="food">Comida</option>
            <option value="home">Casa</option>
            <option value="expenses">Gastos varios</option>
            <option value="leisure">Ocio</option>
            <option value="health">Salud</option>
            <option value="subscriptions">Suscripciones</option>
          </select>
        </div>

        <input type="submit" :value="[isEditing ? 'Guardar Cambios' : 'Añadir Gasto']" />
        
        <button
          type="button"
          class="btn-delete"
          v-if="isEditing"
          @click="$emit('delete-expense')"
        >
          Eliminar Gasto
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .modal {
    position: absolute;
    background-color: rgb(0 0 0/0.9);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .close-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
  }

  .close-modal img {
    width: 3rem;
    cursor: pointer;
  }

  .form-container {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    opacity: 0;
  }

  .animate {
    opacity: 1;
  }

  .close {
    opacity: 0;
  }

  .new-expense {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
  }

  .new-expense legend {
    text-align: center;
    color: var(--blanco);
    font-size: 3rem;
    font-weight: 700;
  }

  .field {
    display: grid;
    gap: 2rem;
  }

  .new-expense input,
  .new-expense select {
    background-color: var(--gris-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
  }

  .new-expense label {
    color: var(--blanco);
    font-size: 3rem;
  }

  .new-expense input[type="submit"] {
    background-color: var(--azul);
    color: var(--blanco);
    font-weight: 700;
    cursor: pointer;
  }

  .new-expense input[type="submit"]:hover {
    background-color: #3475dd;
  }

  .btn-delete {
    padding: 1rem;
    width: 100%;
    border: none;
    background-color: #ef4444;
    font-weight: 700;
    font-size: 2.2rem;
    color: var(--blanco);
    cursor: pointer;
    border-radius: 1rem;
  }
</style>
