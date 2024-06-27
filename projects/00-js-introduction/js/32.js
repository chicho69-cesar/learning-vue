const url = "https://jsonplaceholder.typicode.com/comments"
const url2 = "https://jsonplaceholder.typicode.com/photos"

const fetchDataFromAPI = async () => {
  const startTime = performance.now()

  const response = await fetch(url)
  const result = await response.json()

  const response2 = await fetch(url2)
  const result2 = await response2.json()

  const endTime = performance.now()

  console.log(`Resultado Primer Función: ${endTime - startTime} ms `)
}

const fetchDataFromMultipleUrls = async () => {
  const startTime = performance.now()

  const [response, response2] = await Promise.all([
    fetch(url),
    fetch(url2)
  ])

  const result = await response.json()
  const result2 = await response2.json()

  const endTime = performance.now()

  console.log(`Resultado Segunda Función: ${endTime - startTime} ms `)
}

fetchDataFromAPI()
fetchDataFromMultipleUrls()
