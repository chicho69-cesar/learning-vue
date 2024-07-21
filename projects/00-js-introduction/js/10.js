const technologyList = ['Vue.js', 'JavaScript', 'Node.js', 'HTML', 'CSS']

// technologyList.push('Git') // añade elemento al final del arreglo
// technologyList.unshift('Git') // añade elemento al inicio del arreglo

// technologyList.pop() // elimina elemento del final del arreglo
// technologyList.shift() // Elimina del inicio del arreglo

// technologyList.splice(0,1) 

const filteredTechnologies = technologyList.filter(function (tech) {
  return tech !== 'HTML'
})

console.log(filteredTechnologies)
