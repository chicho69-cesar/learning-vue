const product = {
  name: "Tablet",
  price: 300,
  available: true
}

const client = {
  name: 'Juan',
  premium: true
}

// const nuevoObjeto = Object.assign(cliente, producto)

// console.log(nuevoObjeto)

const newObject = {
  product,
  client
}

console.log(newObject)