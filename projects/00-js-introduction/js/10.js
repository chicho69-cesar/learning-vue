const technologyList = ['Vue.js', 'JavaScript', 'Node.js', 'HTML', 'CSS']

// tecnologias.push('Git') // añade elemento al final del arreglo
// tecnologias.unshift('Git') // añade elemento al inicio del arreglo

// tecnologias.pop() // elimina elemento del final del arreglo
// tecnologias.shift() // Elimina del inicio del arreglo

// tecnologias.splice(0,1) 

const filteredTechnologies = technologyList.filter(function (tech) {
  return tech !== 'HTML'
})

console.log(filteredTechnologies)
