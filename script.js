// Task 1
// Напишите функцию t1, которая при нажатии кнопки выводит в out - 1 переменную a1.
// Task 1. Создайте переменную a = 4. Используя конструкцию if проверьте то a == 4. Выведите сообщение в консоль.

let a1 = 4;
function t1() {
    if (a1 == 4) {
        console.log(a1);
    };
}

document.querySelector('.task-1').onclick = t1;

// Task 2
function infoDisplay() {
    let checked_language = document.querySelectorAll('.meteo__language-item');
    let mySelect = document.querySelectorAll('.meteo__language-label');

    for (let i = 0; i < checked_language.length; i++) {
        if (checked_language[i].type == "radio" && checked_language[i].checked) {

            mySelect[i].classList.add('language_underline');
            langFetch = checked_language[i].value;

            linkFetch = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${langFetch}&appid=${appid}`;

        }
        else {
            mySelect[i].classList.remove('language_underline');
        };

    };


    fetch(linkFetch)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);

            document.querySelector('.place-name').textContent = data.name + ', ' + data.sys['country'];;
            document.querySelector('.temperature-value').innerHTML = Math.round(data.main.temp - 273) + ' &deg;' + 'C';
            document.querySelector('.disclaimer').textContent = data.weather[0]['description'];
            document.querySelector('.humidity-value').innerHTML = data.main.humidity + ' %';
            document.querySelector('.pressure-value').innerHTML = data.main.pressure + ' mmHg';
            document.querySelector('.features').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        })
        .catch(function () {
            // catch any errors
        });

};

function citySelect() {
    let itemList = document.getElementById("cities").selectedOptions;

    for (let i = 0; i < itemList.length; i++) {
        lat = itemList[i].getAttribute("lat");
        lon = itemList[i].getAttribute("lon");
    };

    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lon;

    infoDisplay();
}


function showPosition() {

    let itemList = document.getElementById("cities").selectedOptions;

    for (let i = 0; i < itemList.length; i++) {
        lat = itemList[i].getAttribute("lat");
        lon = itemList[i].getAttribute("lon");
    };

    if (lat == 'null') {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                lon = position.coords.longitude;

                document.getElementById("latitude").value = lat;
                document.getElementById("longitude").value = lon;
                infoDisplay();
            });
        } else {
            alert("Sorry, your browser does not support HTML5 geolocation.");
        };
    }
    else {
        document.getElementById("latitude").value = lat;
        document.getElementById("longitude").value = lon;
        infoDisplay();
    };

}





function insertCoordonates() {
    let x = document.getElementById("latitude").value;
    let y = document.getElementById("longitude").value;

    if ((x >= -90) && (x <= 90)) {
        lat = x;
    }
    else {
        alert('out of range -90 ... 90');
    };

    if ((y >= -180) && (y <= 180)) {
        lon = y;
    }
    else {
        alert('out of range -180 ... 180');
    };

    infoDisplay();
}




//47.003836,28.803185
// let lat = 46.992739043710586;
// let lon = 28.819256154301822;
// let lat = 0;
// let lon = 0;

let lat = 46.992739043710586;
let lon = 28.819256154301822;

showPosition();

document.getElementById("latitude").value = lat;
document.getElementById("longitude").value = lon;

let langFetch = 'RO';
let appid = '055e11165d7ab18f1b6513d979330487';

let linkFetch = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${langFetch}&appid=${appid}`;

fetch(linkFetch)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        console.log(data);

        document.querySelector('.place-name').textContent = data.name + ', ' + data.sys['country'];
        document.querySelector('.temperature-value').innerHTML = Math.round(data.main.temp - 273) + ' &deg;' + 'C';
        document.querySelector('.disclaimer').textContent = data.weather[0]['description'];
        document.querySelector('.humidity-value').innerHTML = data.main.humidity + ' %';
        document.querySelector('.pressure-value').innerHTML = data.main.pressure + ' mmHg';
        document.querySelector('.features').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    })
    .catch(function () {
        // catch any errors
    });
