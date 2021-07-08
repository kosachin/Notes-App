// Add note to local storage
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function (e) {

    let addTitle = document.getElementById("note-title");
    let addText = document.getElementById("note-text");

    if (addTitle.value == "" || addText.value == "") {
        return alert("Please add Note Title and Details")
    }

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    // To clear the fields of content
    // addText.value = "";
    // addTitle.value = "";
    // showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="note">
        <p class="note-counter">Note ${index + 1}</p>
        <h3 class="note-title"> ${element.title} </h3>
        <p class="note-text"> ${element.text}</p>
        <button id="${index}"onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
        <button id="${index}"onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
        </div>
        `;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
    }
}


// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);
    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
    }
    showNotes();
}

// Function to Edit the Note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    
    // To edit the fields of content 
    let addTitle = document.getElementById("note-title");
    let addText = document.getElementById("note-text");

    // To make sure that form is clear before editing existing form
    if (addTitle.value !== "" || addText.value !== "") {
        return alert("Please clear the form before editing a note")
    }

    if (notes == null) {
        notesObj = [];
    } else { 
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    // To see the content of note which is being edited
    notesObj.findIndex((element, index) => {
        addTitle.value = element.title;
        addText.value = element.text;    
    })
    
    // To delete the note which is being edited 
    notesObj.splice(index, 1);

    // Update the localStorage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


showNotes();