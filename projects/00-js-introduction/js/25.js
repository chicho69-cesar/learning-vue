const heading = document.querySelector('.heading')
const navLinks = document.querySelectorAll('.navegacion a')

heading.addEventListener('dblclick', () => {
  // const numero = 2
  // if(numero === 10) {
  //     heading.textContent = 'Mi numero es 10'
  // } else {
  //     heading.textContent = 'El numero es diferente'
  // }

  heading.textContent = 'Nuevo heading al dar click'
})

navLinks.forEach(enlace => {
  enlace.addEventListener('click', (e) => {
    e.preventDefault()
    enlace.textContent = 'Nuevo Nombre'
  })
})
