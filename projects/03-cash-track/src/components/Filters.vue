<script setup>
  defineProps(["filter"])
  defineEmits(["update:filter"])
</script>

<template>
  <div class="filters shadow container">
    <form>
      <div class="field">
        <label for="filter">Filtrar Gastos</label>

        <select
          id="filter"
          :value="filter"
          @input="$emit('update:filter', $event.target.value)"
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
    </form>
  </div>
</template>

<style scoped>
  .filters {
    margin-top: 10rem;
  }

  .filters .field {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .filters label {
    font-size: 3rem;
    font-weight: 900;
    color: var(--gris-oscuro);
  }

  .filters select {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    background-color: var(--gris-claro);
    text-align: center;
    cursor: pointer;
  }
</style>
