const form = document.querySelector('.js-form'),
input = form.querySelector('input'),
greeting = document.querySelector('.js-greetings'),
editBtn = document.querySelector('.fa-eraser');

const USER_LS = "currentUser",
SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function enterName(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function toDisplay(element, boolean) {
  if (boolean) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

function askForName() {
  toDisplay(editBtn, false);
  greeting.classList.remove(SHOWING_CN);
  form.classList.add(SHOWING_CN);
  form.addEventListener('submit', enterName);
}


function genRandom(){
  const greetingsCollection = ['Hello', 'Hi', 'How are you today?', 'Have a nice day', 'Nice to see you again', 'Good morning'],
  randomGreetings = greetingsCollection[Math.floor(Math.random() * greetingsCollection.length)];
  return randomGreetings;   
}

function editName(event) {
  event.preventDefault();
  localStorage.removeItem(USER_LS);
  loadName();
  alert('After rename, press refresh button')
}

function paintGreeting(text) {
  toDisplay(editBtn, true);
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  let chosenGreetings = genRandom();
    const DATE = new Date(),
        hours = DATE.getHours();        
    if(hours >= 12 && hours < 18 && chosenGreetings == 'Good morning' ){
        chosenGreetings = 'Good afternoon'
    }else if(hours >= 18 && hours <21 && chosenGreetings == 'Good morning'){
        chosenGreetings = 'Good evening'
    }else if(hours >= 21 && chosenGreetings == 'Good morning' || hours < 5 && chosenGreetings == 'Good morning'){
        chosenGreetings = 'Good night'
    };
  greeting.innerText = `${chosenGreetings}, ${text}`;
  editBtn.addEventListener('click', editName);
  //after change user name, there is an error that chosengreetings dosen't string.
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if(!currentUser) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();