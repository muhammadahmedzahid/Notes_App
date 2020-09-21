const addBtn = document.getElementById("add");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNotes(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNotes();
});

function addNewNotes(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
     <div class="notes">
      <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="main ${text ? "" : "hidden"}></div>
      <div class="main ${text ? "hidden" : ""}></div>
      <textarea></textarea>
    </div> 
    `;
  //   const notesEl = document.querySelector(".notes");
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);
  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    //   the above bracket in the {} is due to the text area as we have tp represent that.

    main.innerHTML = marked(value);

    // update local storage
    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  //   local storage store data in String form
  const notes = [];
  notesText.forEach((note) => {
    notes.push(note);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
