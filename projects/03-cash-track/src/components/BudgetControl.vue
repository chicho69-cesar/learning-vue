<script setup>
  import { computed } from "vue"

  import "vue3-circle-progress/dist/circle-progress.css"
  import CircleProgress from "vue3-circle-progress"
  import { quantityFormatter } from "../helpers"

  defineEmits(["reset-app"])

  const props = defineProps({
    budget: {
      type: Number,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
    expense: {
      type: Number,
      required: true,
    },
  })

  const percentage = computed(() => {
    return parseInt(((props.budget - props.available) / props.budget) * 100)
  })
</script>

<template>
  <div>
    <div class="two-columns">
      <div class="graphic-container">
        <p class="percentage">{{ percentage }}%</p>

        <CircleProgress
          :percent="percentage"
          :size="250"
          :border-width="30"
          :border-bg-width="30"
          fill-color="#3b82f6"
          empty-color="#e1e1e1"
        />
      </div>

      <div class="budget-container">
        <button class="reset-app" type="button" @click="$emit('reset-app')">Reiniciar app</button>

        <p>
          <span>Presupuesto:</span>
          {{ quantityFormatter(budget) }}
        </p>

        <p>
          <span>Disponible:</span>
          {{ quantityFormatter(available) }}
        </p>

        <p>
          <span>Gastado:</span>
          {{ quantityFormatter(expense) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .graphic-container {
    position: relative;
  }

  .percentage {
    position: absolute;
    margin: auto;
    top: calc(50% - 1.5rem);
    left: 0;
    right: 0;
    text-align: center;
    z-index: 100;
    font-size: 3rem;
    font-weight: 900;
    color: var(--gris-oscuro);
  }

  .two-columns {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .two-columns {
      flex-direction: row;
      gap: 4rem;
      align-items: center;
    }

    .two-columns> :first-child {
      margin-bottom: 0;
    }
  }

  .reset-app {
    background-color: #db2777;
    border: none;
    padding: 1rem;
    width: 100%;
    color: var(--blanco);
    font-weight: 900;
    text-transform: uppercase;
    border-radius: 1rem;
    transition-property: background-color;
    transition-duration: 300ms;
  }

  .reset-app:hover {
    cursor: pointer;
    background-color: #c11d67;
  }

  .budget-container {
    width: 100%;
  }

  .budget-container p {
    font-size: 2.4rem;
    text-align: center;
    color: var(--gris-oscuro);
  }

  @media (min-width: 768px) {
    .budget-container p {
      text-align: left;
    }
  }

  .budget-container span {
    font-weight: 900;
    color: var(--azul);
  }
</style>
