// Scope

let price = 300

function aFunction() {
  let localPrice = 100
  console.log(localPrice)
}

aFunction()
console.log(price)
