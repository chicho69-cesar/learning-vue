const url = "https://jsonplaceholder.typicode.com/comments"

const fetchData = () => {
  fetch(url)
    .then((response) => response.json())
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      console.log('Todo Listo')
    })
}

fetchData()
