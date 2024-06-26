// Objetos
const product = {
  name: "Tablet",
  price: 300,
  available: true
}

// console.log(producto.name)
// console.log(producto.price)

// Destructuring
const { name, price, available } = product
// console.log(name)
// console.log(available)


// Object literal enhacement
const isAuthenticated = true
const user = "Juan"

const newObject = {
  isAuthenticated,
  user
}

console.log(newObject)
