// Arrow Functions

const addNumbers = (firstNumber = 0, secondNumber = 10) => {
  console.log(firstNumber + secondNumber)
}

const technologies = ['Vue.js', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'Git']

// forEach
technologies.forEach(tech => console.log(tech))

// map
const arrayMap = technologies.map(tech => tech)

const filteredTechnologies = technologies.filter(tech => tech !== 'HTML')

// console.log(arrayMap)
console.log(filteredTechnologies)

// addNumbers(1, 2)
// addNumbers(10, 289)
// addNumbers(24, 49)
