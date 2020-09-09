const COORDS = 'coords',
    API_KEY ='75bed867bb618b8e4668b43b4836955f',
    howWeather = document.querySelector('.js-howWeather'),
    weatherDetails = document.querySelector('.js-weatherDetails');



function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
    .then(function(response){
        return response.json();        
    })
    .then(function(json){
        const temperature = json.main.temp,
            place = json.name,
            icon = json.weather[0].icon;
        img_tag = document.createElement('img');
        img_tag.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        img_tag.className = 'js-icon';
        howWeather.appendChild(img_tag);
        weatherDetails.innerText = `${temperature}°C In ${place}`;
    });
}

function saveCoords(coordObj){
    localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude,
        longitude = position.coords.longitude,
        coordObj ={
            latitude, //valueName same to keyName
            longitude
        };
    saveCoords(coordObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Where are you?')
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseedCoords = JSON.parse(loadedCoords);
        getWeather(parseedCoords.latitude, parseedCoords.longitude);
    }
}

function init(){
    loadCoords();
} 

init();