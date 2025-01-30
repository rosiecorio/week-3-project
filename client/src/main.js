const myForm = document.getElementById('myForm')
const nameInput = document.getElementById('nameInput')
const commentInput = document.getElementById('commentInput')

myForm.addEventListener('submit', handleSubmit)

function handleSubmit (event) {
  event.preventDefault()
  const formData = new FormData(myForm)
  const commentData = Object.fromEntries(formData)
  console.log(commentData)

  fetch('http://localhost:6060/guestbook',{
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(commentData)
  })
}


/*async function getMessages() {
  const data = await fetch('https://week-3-project-server.onrender.com');
  const response = await data.json
}*/