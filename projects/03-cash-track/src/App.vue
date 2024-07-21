<script setup>
  import { ref, reactive, watch, computed, onMounted } from "vue"

  import Budget from "./components/Budget.vue"
  import BudgetControl from "./components/BudgetControl.vue"
  import Modal from "./components/Modal.vue"
  import Expense from "./components/Expense.vue"
  import Filters from "./components/Filters.vue"

  import { generateId } from "./helpers"

  import newExpenseIcon from "./assets/img/nuevo-gasto.svg"

  const modal = reactive({
    show: false,
    animate: false,
  })

  const budget = ref(0)
  const available = ref(0)
  const expensed = ref(0)
  const filter = ref("")

  const expense = reactive({
    name: "",
    quantity: "",
    category: "",
    id: null,
    date: Date.now(),
  })

  const expenses = ref([])

  watch(
    expenses,
    () => {
      const totalExpensed = expenses.value.reduce((total, expense) => expense.quantity + total, 0)
      expensed.value = totalExpensed
      available.value = budget.value - totalExpensed

      localStorage.setItem("expenses", JSON.stringify(expenses.value))
    },
    {
      deep: true,
    }
  )

  watch(
    modal,
    () => {
      if (!modal.show) {
        resetExpenseState()
      }
    },
    {
      deep: true,
    }
  )

  watch(budget, () => {
    localStorage.setItem("budget", budget.value)
  })

  onMounted(() => {
    const budgetStorage = localStorage.getItem("budget")

    if (budgetStorage) {
      budget.value = Number(budgetStorage)
      available.value = Number(budgetStorage)
    }

    const expensesStorage = localStorage.getItem("expenses")

    if (expensesStorage) {
      expenses.value = JSON.parse(expensesStorage)
    }
  })

  const resetExpenseState = () => {
    Object.assign(expense, {
      name: "",
      quantity: "",
      category: "",
      id: null,
      date: Date.now(),
    })
  }

  const defineBudget = (quantity) => {
    budget.value = quantity
    available.value = quantity
  }

  const showModal = () => {
    modal.show = true

    setTimeout(() => {
      modal.animate = true
    }, 300)
  }

  const notShowModal = () => {
    modal.animate = false

    setTimeout(() => {
      modal.show = false
    }, 300)
  }

  const saveExpense = () => {
    if (expense.id) {
      const { id } = expense
      const i = expenses.value.findIndex((expense) => expense.id === id)
      expenses.value[i] = { ...expense }
    } else {
      expenses.value.push({
        ...expense,
        id: generateId(),
      })
    }

    notShowModal()
    resetExpenseState()
  }

  const selectExpense = (id) => {
    const editExpense = expenses.value.filter((expense) => expense.id === id)[0]
    Object.assign(expense, editExpense)
    showModal()
  }

  const deleteExpense = () => {
    if (confirm("¿Está seguro que desea eliminar el gasto?")) {
      expenses.value = expenses.value.filter((expenseState) => expenseState.id !== expense.id)
      notShowModal()
    }
  }

  const expensesFiltered = computed(() => {
    if (filter.value) {
      return expenses.value.filter((expense) => expense.category === filter.value)
    }

    return expenses.value
  })

  const resetApp = () => {
    if (confirm("¿Deseas reiniciar la App?")) {
      expenses.value = []
      budget.value = 0
    }
  }
</script>

<template>
  <!-- Si queremos agregar clases condicionadas a un elemento en Vue
  debemos de poner :class para utilizar un valor del Script, y en este caso
  si modal.show es true se agrega la clase fix, sino no se agrega nada. -->
  <div :class="{ fix: modal.show }">
    <header>
      <h1>Planificador de Gastos</h1>

      <div class="header-container container shadow">
        <Budget v-if="budget === 0" @define-budget="defineBudget" />

        <BudgetControl
          v-else
          :budget="budget"
          :available="available"
          :expense="expensed"
          @reset-app="resetApp"
        />
      </div>
    </header>

    <main v-if="budget > 0">
      <Filters v-model:filter="filter" />

      <div class="expenses-list container">
        <h2>{{ expensesFiltered.length > 0 ? "Gastos" : "No hay gastos" }}</h2>

        <Expense
          v-for="expense in expensesFiltered"
          :key="expense.id"
          :expense="expense"
          @select-expense="selectExpense"
        />
      </div>

      <div class="create-expense">
        <img :src="newExpenseIcon" alt="icono nuevo gasto" @click="showModal" />
      </div>

      <Modal
        v-if="modal.show"
        @close-modal="notShowModal"
        @save-expense="saveExpense"
        @delete-expense="deleteExpense"
        :modal="modal"
        :available="available"
        :id="expense.id"
        v-model:name="expense.name"
        v-model:quantity="expense.quantity"
        v-model:category="expense.category"
      />
    </main>
  </div>
</template>

<style>
  :root {
    --azul: #3b82f6;
    --blanco: #fff;
    --gris-claro: #f5f5f5;
    --gris: #94a3b8;
    --gris-oscuro: #64748b;
    --negro: #000;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-size: 1.6rem;
    font-family: "Lato", sans-serif;
    background-color: var(--gris-claro);
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

  .fix {
    overflow: hidden;
    height: 100vh;
  }

  header {
    background-color: var(--azul);
  }

  header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }

  .container {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }

  .header-container {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }

  .shadow {
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: var(--blanco);
    border-radius: 1.2rem;
    padding: 5rem;
  }

  .create-expense {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }

  .create-expense img {
    width: 5rem;
    cursor: pointer;
  }

  .expenses-list {
    margin-top: 5rem;
  }

  .expenses-list h2 {
    font-weight: 900;
    color: var(--gris-oscuro);
  }

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
    background: var(--azul);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #2667ce;
  }
</style>
