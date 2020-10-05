const clockContainer = document.querySelector(".clock-container")
const clockTitle = clockContainer.querySelector("h1")
const form = document.querySelector(".js-form")
const formInput = form.querySelector("input")
const greeting = document.querySelector(".js-greetings")



function setTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}` }`
    clockTitle.innerHTML = time
}
// const date = new Date();
// const time = date.toTimeString().split(' ')[0].split(':');
// timee.innerHTML = time[0] + ':' + time[1]

const USER_LS = "currentUser"
SHOWING_ON = "showing"

function saveName(text) {
   localStorage.setItem("currentUser", text)
}

function handleSubmit(e) {
    e.preventDefault();
    const currentValue = formInput.value
    paintGreeting(currentValue)
    saveName(currentValue)
}

function paintGreeting(text) {
   form.classList.remove(SHOWING_ON)
   greeting.classList.add(SHOWING_ON)
   greeting.innerText = `Hello ${text}`
}

function askForName(){
    form.classList.add(SHOWING_ON),
    form.addEventListener("submit", handleSubmit)
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS)
    if(currentUser === null){
       askForName();
    } else {
       paintGreeting(currentUser)
    }
}

function init() {
    loadName()
}

    init()

setInterval(setTime, 1000)