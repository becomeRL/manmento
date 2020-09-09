const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList'),
    finishedToDoList = document.querySelector('.js-finishedToDoList');


const TODOS_LS ='toDos',
    FINISHEDTODOS_LS ='finishedToDos';

let toDos = [],
    finishedToDos = [];

function deleteToDo(){
    let btn = event.target,
        li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}
    
function deleteFin(){
    let btn = event.target,
        li = btn.parentNode;
    finishedToDoList.removeChild(li);
    const cleanFins = finishedToDos.filter(function(fin){
        return fin.id !== parseInt(li.id);
    });
    finishedToDos = cleanFins;
    saveToDos();
}
    
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(FINISHEDTODOS_LS, JSON.stringify(finishedToDos));
}
    
function backToDos(){
    let btn = event.target,
        li = btn.parentNode;
    toDoList.appendChild(li);
    btn.innerText = "🏆";
    btn.removeEventListener("click", backToDos);
    btn.addEventListener("click", finishedToDo);
    const delBtn = btn.nextSibling;
    delBtn.removeEventListener("click", deleteFin);
    delBtn.addEventListener("click", deleteToDo);    
    let text = li.querySelector("span").innerHTML,
        id = parseInt(li.id);
    const toDoObj = {
        text: text,
        id: id
    }
    toDos.push(toDoObj);    
    const delFins = finishedToDos.filter(function(fin){
        return fin.id !== parseInt(li.id);
    });
    finishedToDos = delFins;
    saveToDos();
}
    
function finishedToDo(){
    let btn = event.target,
        li = btn.parentNode;
    finishedToDoList.appendChild(li);
    btn.innerText = "🔙";
    btn.addEventListener("click", backToDos);
    const delBtn = btn.nextSibling;
    delBtn.removeEventListener("click", deleteToDo);
    delBtn.addEventListener("click", deleteFin);    
    let text = li.querySelector("span").innerHTML,
        id = parseInt(li.id);
    const finObj = {
        text: text,
        id: id
    }
    finishedToDos.push(finObj);    
    const delToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = delToDos;
    saveToDos();
}
    
function paintToDo(text){
    const li = document.createElement("li"),
        delBtn = document.createElement("button"),
        finBtn = document.createElement("button"),
        span = document.createElement("span"),
        newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);    
    finBtn.innerText = "🏆"
    finBtn.addEventListener("click", finishedToDo);    
    span.innerHTML = text;
    li.appendChild(span);
    li.id = newId;
    li.appendChild(finBtn);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}
    
function paintFin(text){
    const li = document.createElement("li"),
        delBtn = document.createElement("button"),
        btn = document.createElement("button"),
        span = document.createElement("span"),
        newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);    
    btn.innerText = "🔙";
    btn.addEventListener("click", backToDos);    
    span.innerText = text;
    li.appendChild(span);
    li.id = newId;
    li.appendChild(btn);
    li.appendChild(delBtn);
    finishedToDoList.appendChild(li);
    const finObj = {
        text: text,
        id: newId
    };
    finishedToDos.push(finObj);
    saveToDos();
}
    
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS),
        loadedFins = localStorage.getItem(FINISHEDTODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
    if (loadedFins !== null){
        const parsedFins = JSON.parse(loadedFins);
        parsedFins.forEach(function(fin){
            paintFin(fin.text);
        });
    }
}
    
function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}
    
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();