<script setup>
  import { ref, reactive } from "vue"

  import Alert from "./components/Alert.vue"
  import Spinner from "./components/Spinner.vue"
  import Quote from "./components/Quote.vue"
  import useCrypto from "./composables/useCrypto"

  /* Aquí utilizamos nuestro composable useCrypto, el cual nos permite 
  separar la lógica del manejo de las criptomonedas en un archivo independiente
  y de esta forma poder reutilizarlo en otros componentes. */
  const { currencies, cryptoCurrencies, quote, loading, showResult, getQuote } = useCrypto()

  const error = ref("")

  const quoting = reactive({
    currency: "",
    cryptoCurrency: "",
  })

  const quotingCrypto = () => {
    if (Object.values(quoting).includes("")) {
      error.value = "Todos los fields son obligatorios"
      return
    }

    error.value = ""
    getQuote(quoting)
  }
</script>

<template>
  <div>
    <div class="container">
      <h1 class="title">Cotizador de <span>Criptomonedas</span></h1>
      
      <div class="content">
        <Alert v-if="error">
          {{ error }}
        </Alert>

        <form class="form" @submit.prevent="quotingCrypto">
          <div class="field">
            <label for="currency">Moneda:</label>

            <select id="currency" v-model="quoting.currency">
              <option value="">-- Seleccione --</option>
              <option v-for="currency in currencies" :value="currency.code" :key="currency.code">
                {{ currency.text }}
              </option>
            </select>
          </div>

          <div class="field">
            <label for="crypto">Criptomoneda:</label>

            <select id="crypto" v-model="quoting.cryptoCurrency">
              <option value="">-- Seleccione --</option>
              <option v-for="cryptoCurrency in cryptoCurrencies" :value="cryptoCurrency.CoinInfo.Name" :key="cryptoCurrency.CoinInfo.Name">
                {{ cryptoCurrency.CoinInfo.FullName }}
              </option>
            </select>
          </div>

          <input type="submit" value="Cotizar" />
        </form>

        <Spinner v-if="loading" />
        <Quote v-if="showResult" :quote="quote" />
      </div>
    </div>
  </div>
</template>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #18223d;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #87caf3;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #6ca2c4;
  }
</style>
