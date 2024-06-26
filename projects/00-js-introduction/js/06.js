// Destructuring de 2 o más objetos

const product = {
  name: "Tablet",
  price: 300,
  available: true
}

const client = {
  name: 'Juan',
  premium: true
}

const { name: nameProduct } = product
const { name: nameClient } = client

console.log(nameProduct)
console.log(nameClient)
