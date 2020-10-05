const toDoForm = document.querySelector(".js-toDoForm"),
toDoinput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODO_LS = 'toDos';
let toDos = []

function handleSubmit(e){
    e.preventDefault();
    const currentValue = toDoinput.value
    if(currentValue !== ""){
        paintTodo(currentValue)
        toDoinput.value = ""
    }
}


function deleteToDo(event) {
const btn = event.target;
const li = btn.parentNode;
toDoList.removeChild(li)
const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id)
 })
toDos = cleanToDos
saveToDos();
}
//localstorage only accepts strings.
function saveToDos(){
     localStorage.setItem(TODO_LS, JSON.stringify(toDos))
 }

function paintTodo(text){
   const li = document.createElement("li")
   const delBtn = document.createElement("button")
   const span = document.createElement("span")
   const newId = toDos.length === 0 ? 1 : parseInt(toDos[toDos.length - 1].id) + 1;
   span.innerText = text
   delBtn.innerText = "✔"
   delBtn.classList.add("delBtn")
   li.appendChild(span);
   li.appendChild(delBtn);
   toDoList.appendChild(li);
   li.id = newId
   delBtn.addEventListener("click", deleteToDo)
  const toDoObj = {
      text: text,
      id: newId
  }
  toDos.push(toDoObj)
  saveToDos(toDos)
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODO_LS)
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos)
        parsedToDos.forEach(function(toDo){
            paintTodo(toDo.text)
        })
    }
}

function init() {
   loadToDos()
   toDoForm.addEventListener("submit", handleSubmit)
}

init();