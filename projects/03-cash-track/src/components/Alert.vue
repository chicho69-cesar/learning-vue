<template>
  <div class="alert">
    <!-- Cuando queremos agregar en un componente que el componente pueda
    tener elementos hijos, como si fuera el elemento children de React, debemos 
    de utilizar el elemento especial slot. -->
    <slot></slot>
  </div>
</template>

<style scoped>
  .alert {
    padding: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 1.6rem;
    text-align: center;
    background-color: var(--blanco);
    border-left: 0.5rem solid #b91c1c;
    color: #b91c1c;
    margin-bottom: 2rem;
  }
</style>
