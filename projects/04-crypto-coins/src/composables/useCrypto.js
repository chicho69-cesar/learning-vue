import { ref, onMounted, computed } from 'vue'

/* Los composables en Vue son funciones similares a los Hooks en React,
debido a que estos permiten reutilizar la lógica de un componente en otro
sin la necesidad de duplicar código.
Para esto se utilizan las funciones reactivas de vue, mediante las cuales
podemos crear comportamientos personalizados para los componentes. */
export default function useCrypto() {
  const currencies = ref([
    { code: 'USD', text: 'Dolar de Estados Unidos' },
    { code: 'MXN', text: 'Peso Mexicano' },
    { code: 'EUR', text: 'Euro' },
    { code: 'GBP', text: 'Libra Esterlina' },
  ])

  const cryptoCurrencies = ref([])

  const quote = ref({})
  const loading = ref(false)

  onMounted(() => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    
    fetch(url)
      .then((response) => response.json())
      .then(({ Data }) => (cryptoCurrencies.value = Data))
  })

  const getQuote = async (quoting) => {
    loading.value = true
    quote.value = {}

    try {
      const { currency, cryptoCurrency } = quoting
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`

      const response = await fetch(url)
      const data = await response.json()

      quote.value = data.DISPLAY[cryptoCurrency][currency]
    } catch (error) {
      alert('Seleccione los datos correctos')
    } finally {
      loading.value = false
    }
  }

  const showResult = computed(() => {
    return Object.values(quote.value).length > 0
  })

  return {
    currencies,
    cryptoCurrencies,
    loading,
    quote,
    getQuote,
    showResult,
  }
}
