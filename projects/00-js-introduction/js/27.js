// Eventos del DOM - Submit
const form = document.querySelector('#formulario')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = document.querySelector('#nombre').value
  const password = document.querySelector('#password').value

  if (name === '' || password === '') {
    console.log('Todos los campos son obligatorios')
    return
  }

  console.log('Todo bien, enviando...')
})
