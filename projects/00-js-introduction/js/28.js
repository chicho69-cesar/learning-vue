// Eventos del DOM - Submit
const form = document.querySelector('#formulario')

form.addEventListener('submit', e => {
  e.preventDefault()

  // Prevenir alertas duplicadas
  const previousAlert = document.querySelector('.alerta')
  previousAlert?.remove()

  // Generar alerta
  const alertContainer = document.createElement('DIV')
  alertContainer.textContent = 'Todos los campos son obligatorios'
  alertContainer.classList.add('alerta', 'bg-red-500', 'text-white', 'uppercase', 'text-sm', 'text-center', 'p-2', 'font-black')

  const name = document.querySelector('#nombre').value
  const password = document.querySelector('#password').value

  if (name === '' || password === '') {
    form.appendChild(alertContainer)

    setTimeout(() => {
      alertContainer.remove()
    }, 3000);
    return
  }
})
