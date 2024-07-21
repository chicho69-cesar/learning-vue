const product = {
  name: "Tablet",
  price: 300,
  available: true
}

// Object.freeze(producto)
// Object.seal(producto)

// Reescribir un valor
product.name = "Monitor Curvo"
// Añadir un valor
product.image = "image.jpg"

delete product.available

const { available, price, ...product2 } = product

console.log(product2)
