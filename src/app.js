showNotes()
let addNoteBtn = document.getElementById('addNoteBtn')

// to add a new note
addNoteBtn.addEventListener('click', function (e) {
    let inputText = document.getElementById('inputText')
    let notes = localStorage.getItem('notes')
    if (inputText.value != '') {
        if (notes == null) {
            notesObj = []
        }
        else {
            notesObj = JSON.parse(notes)
        }
        notesObj.push(inputText.value)
        localStorage.setItem('notes', JSON.stringify(notesObj))
        inputText.value = ''
        showNotes()
    }
})

// function to show the notes
function showNotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = ''
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-2 bg-dark" style="width: 18rem; border-radius: 20px; border: 5px solid #1dc3a4;">
        <div class="card-body">
          <h5 class="card-title" style="color: #1dc3a4;">Note ${index + 1}</h5>
          <p class="card-text" style="color: white;">${element}</p>
          <button onClick="deleteNote(this.id)" id="${index}" class="btn btn-secondary">Delete Note</button>
        </div>
      </div>
         `
    })
    let notesElement = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElement.innerHTML = html
    }
    else {
        notesElement.innerHTML = `Nothing to see here! Add a note using the box above`
    }
}

// function to delete a note
function deleteNote(index) {
    console.log('I am deleting', index)
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes()
}

// searching the text
let searchText = document.getElementById('searchText')
searchText.addEventListener('input', function() {
    let inputValue = searchText.value.toLowerCase()
    // console.log(inputValue)
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function(element) {
        let cardText = element.getElementsByTagName('p')[0]
        if(cardText.innerText.includes(inputValue)) {
            element.style.display = 'block'
        }
        else{
            element.style.display = 'none'
        }
        
    })
})
