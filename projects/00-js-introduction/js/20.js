// Operador ternario - condición ? si se cumple : si no se cumple

const availableQuantity = 100
const total = 500
const creditCard = true

availableQuantity > total && creditCard ?
  console.log('Si puedes pagar con saldo o tarjeta') :
  console.log('No puedes pagar')
