const myForm = document.getElementById('myForm')
const nameInput = document.getElementById('nameInput')
const commentInput = document.getElementById('commentInput')
const commentContainer = document.getElementById('commentContainer')
const likesContainer = document.getElementById('likesContainer')

myForm.addEventListener('submit', handleSubmit)

function handleSubmit (event) {
  event.preventDefault()
  const formData = new FormData(myForm)
  const commentData = Object.fromEntries(formData)
  console.log(commentData)

  fetch('https://week-3-project-server.onrender.com/guestbook',{
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(commentData)
  })

  fetchCommentData()
  
}

async function fetchCommentData() {
  const response = await fetch('https://week-3-project-server.onrender.com/guestbook')
  const data = await response.json()
  generateCommentBox(data)
}

fetchCommentData()

function generateCommentBox(dataToRender) {
  commentContainer.innerHTML = ''
  for (let i = 0; i < dataToRender.length; i++) {
    
    const eachCommentElem = document.createElement('div');
    eachCommentElem.setAttribute('class', 'commentItem')

    const nameElem = document.createElement('p')
    const commentElem = document.createElement('p')
    const deleteButton = document.createElement('button')
    
    nameElem.innerText = dataToRender[i].name
    commentElem.innerText = dataToRender[i].comment
    deleteButton.innerText = 'x'

    nameElem.setAttribute('class', 'commentName')
    deleteButton.setAttribute('class', 'deleteButton')
        
    eachCommentElem.appendChild(deleteButton)
    
    eachCommentElem.appendChild(nameElem)
    eachCommentElem.appendChild(commentElem)
    
    commentContainer.appendChild(eachCommentElem)

    deleteButton.addEventListener('click', () => {
      handleDelete(dataToRender[i].id)
    })

    async function handleDelete(id) {
      const response = await fetch(`https://week-3-project-server.onrender.com/guestbook/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        fetchCommentData()
      }
    }
  }
}

/* TODAYS GOALS:
- Put methods to work

- Add like button and edit button. */

