const technologiesList = ['Vue.js', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'Git']
const numbers = [10, 20, 30]

// Includes
let result = technologiesList.includes('Git')

// FindIndex
result = technologiesList.findIndex(tech => tech === 'Git')

// Some 
result = numbers.some(numero => numero > 35)

// Find
result = numbers.find(numero => numero === 5)

// Every
result = numbers.every(numero => numero > 1)

// Reduce
result = numbers.reduce( (total, numero) => numero + total, 0)

result = technologiesList.filter( tech => tech === 'Vue.js')


console.log(result)
