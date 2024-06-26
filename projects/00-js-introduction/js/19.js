// Operador || (OR) y && (AND)

const availableAmount = 1000
const total = 500
const creditCard = true

if (creditCard && availableAmount > total) {
  console.log('Si puedes pagar')
} else {
  console.log('No puedes pagar, ponte a lavar los platos')
}
