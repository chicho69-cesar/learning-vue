// Template Strings o Concatenación

const client = "Juan"
const accountBalance = 400

console.log('El Cliente : ' + client + ' tiene un saldo de : ' + accountBalance)
console.log('El Cliente : ', client, ' tiene un saldo de : ', accountBalance)
console.log(`El Cliente : ${client} tiene un saldo de: ${accountBalance}`)

const product = {
  name: "Tablet",
  price: 300,
  available: true
}

console.log(`El Producto: ${product.name}, tiene un precio de: ${product.price}`)
