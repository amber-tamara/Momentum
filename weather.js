const weather = document.querySelector(".js-weather")
const weatherArea = document.querySelector(".js-weatherArea")

const API_KEY = "0ffc1202718617c78ddbd4198f0575bd";
const COORDS = "coords"

function getWeather(lat, lon){
   fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}&lat=${lat}&lon=${lon}&units=metric`)
   .then(function(response){
       return response.json()
   }).then(function(json){
       const temperature = (json.main.temp > .5) ? (Math.ceil(json.main.temp)) : (Math.floor(json.main.temp))
       const place = json.name;
       const icon = json.weather[0].icon;
    //    const weatherIcon = document.createElement("img");
    //    weatherIcon.setAttribute("src", `http://openweathermap.org/img/w/${icon}.png`)
    //    console.log(weatherIcon)

       const imgs = `<img class="weatherIcon" src="http://openweathermap.org/img/w/${icon}.png"/>`;
       console.log(imgs)
       weatherArea.innerHTML += place;
       weather.innerHTML = `${imgs} ${temperature}°`
   })
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj)
    getWeather(latitude, longitude)
}

function handleGeoError(){
console.log("Can't access geo location")
}

function askforCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCords(){
    const loadedCords = localStorage.getItem(COORDS)
    if(loadedCords === null) {
        askforCoords();
    } else {
      const parsedCoords = JSON.parse(loadedCords)
      console.log(parsedCoords)
      getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

function init() {
  loadCords();
}

init()