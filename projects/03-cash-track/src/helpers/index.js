export const quantityFormatter = (cantidad) => {
  return Number(cantidad).toLocaleString("es-US", {
    style: "currency",
    currency: "USD",
  })
}

export const generateId = () => {
  const date = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2)
  return random + date
}

export const dateFormatter = (fecha) => {
  const newDate = new Date(fecha)

  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }

  return newDate.toLocaleDateString("es-ES", options)
}
