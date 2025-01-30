const myForm = document.getElementById('myForm')
const nameInput = document.getElementById('nameInput')
const commentInput = document.getElementById('commentInput')
const commentContainer = document.getElementById('commentContainer')

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

async function fetchCommentData() {
  const response = await fetch('https://week-3-project-server.onrender.com/guestbook')
  const data = await response.json()
  generateCommentBox(data)
}

fetchShopData()

function generateCommentBox(dataToRender) {
  for (let i = 0; i < dataToRender.length; i++) {
    const eachCommentElem = document.createElement('div');
    containerElem.setAttribute('class', 'shopItem')
    const nameElem = document.createElement('p')
    const commentElem = document.createElement('p')
    

    nameElem.innerText = dataToRender[i].name
    commentElem.innerText = dataToRender[i].comment
    

    
    eachCommentElem.appendChild(nameElem)
    eachCommentElem.appendChild(commentElem)
    
    commentContainer.appendChild(eachCommentElemElem)
  }
}