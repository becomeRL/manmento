const clockContainer = document.querySelector('.js-clock'),
    clockTitle = clockContainer.querySelector('.js-title'),
    dateTitle = document.querySelector('.js-date');
function getTime(){
    const DATE = new Date(),
        hours = DATE.getHours(),
        minutes = DATE.getMinutes(),
        seconds = DATE.getSeconds(),
        years = DATE.getFullYear(),
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        date = DATE.getDate(),
        days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thur', 'Fri', 'Sat'];

    clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;
    dateTitle.innerHTML = `${days[DATE.getDay()]}, ${months[DATE.getMonth()]} ${date}, ${years}`;
}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();