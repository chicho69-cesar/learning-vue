// Optional chaining o encadenamiento opcional

const studentInformation = {
  name: 'Juan',
  class: 'Programación 1',
  isApproved: true
}

setTimeout(() => {
  studentInformation.exams = {
    exam1: 100,
    exam2: 90,
    exam3: 100,
  }

  console.log(studentInformation.exams?.exam1)
}, 3000);

console.log(studentInformation.exams?.exam1)
console.log('Hola Mundo')