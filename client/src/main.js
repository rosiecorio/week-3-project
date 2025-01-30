const myForm = document.getElementById('myForm')

myForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(myForm)
  const data = Object.fromEntries(formData)
  console.log(data)
})