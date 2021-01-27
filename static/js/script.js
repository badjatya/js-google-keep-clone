const addButton = document.querySelector("#addNote");

const updateData = () => {
    const textAreaAll = document.querySelectorAll("textarea");
    const notes = [];
    console.log(textAreaAll);

    textAreaAll.forEach(note => {
        return notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    let note = document.createElement("div");
    note.classList.add("note");

    const htmlData = `
        <div class="buttonContainer">

            <button class="edit" id="editBtn"><i class="fas fa-edit" aria-hidden="true"></i></button>
            <button class="delete" id="deleteBtn"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></"></div>
        <textarea class=" ${text ? "hidden" : ""}"></textarea>
    `;

    note.insertAdjacentHTML("afterbegin",htmlData);
    
    //Refrence
    const editButton = note.querySelector("#editBtn");
    const deleteButton = note.querySelector("#deleteBtn");
    const mainDiv = note.querySelector(".main");
    const textarea = note.querySelector("textarea");
    
    
    deleteButton.addEventListener("click" , () => {
        note.remove();
        updateData();
    } );

    textarea.value = text;
    mainDiv.innerHTML = text;


    editButton.addEventListener("click", () => {
        mainDiv.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    })

    textarea.addEventListener("change" , (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;
        updateData();
    })
    
    document.getElementById("noteContainer").appendChild(note);
    
    
}

const notes = JSON.parse(localStorage.getItem("notes"));

if(notes) {
    notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => addNewNote())