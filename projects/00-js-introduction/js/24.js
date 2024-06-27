const heading = document.querySelector('.heading')

// heading.textContent = 'Un Nuevo Heading'
// heading.classList.remove('text-4xl')

const nameInput = document.querySelector('#nombre')
nameInput.value = 'Valor por default'

const links = document.querySelectorAll('.navegacion a')

links.forEach(enlace => enlace.textContent = 'Nuevo Texto')
