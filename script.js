function infoDisplay() {
    let checked_language = document.querySelectorAll('.meteo__language-item');
    let my_select = document.querySelectorAll('.meteo__language-label');

    for (let i = 0; i < checked_language.length; i++) {
        if (checked_language[i].type == "radio" && checked_language[i].checked) {

            my_select[i].classList.add('language_underline');
            langFetch = checked_language[i].value;

            linkFetch = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${langFetch}&appid=${appid}`;

        }
        else {
            my_select[i].classList.remove('language_underline');
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
    let item_list = document.getElementById("cities").selectedOptions;

    for (let i = 0; i < item_list.length; i++) {
        lat = item_list[i].getAttribute("lat");
        lon = item_list[i].getAttribute("lon");
    };

    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lon;

    infoDisplay();
}


function showPosition() {

    let item_list = document.getElementById("cities").selectedOptions;

    for (let i = 0; i < item_list.length; i++) {
        lat = item_list[i].getAttribute("lat");
        lon = item_list[i].getAttribute("lon");
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
    let x_err = document.getElementById("error_lat");
    let y_err = document.getElementById("error_lon");
    let x = document.getElementById("latitude").value;
    let y = document.getElementById("longitude").value;

    if ((x >= -90) && (x <= 90)) {
        x_err.style.display = 'none';
        document.getElementById("latitude").style.color = 'blue';
        document.getElementById("latitude").style.background = 'white';
        lat = x;
    }
    else {
        /*alert('out of range -90 ... 90');*/
        x_err.style.display = 'block';
        x_err.textContent = 'latitude out of range -90 ... 90';
        x_err.style.color = 'red';

        document.getElementById("latitude").style.color = 'red';
        document.getElementById("latitude").style.background = 'pink';
    };

    if ((y >= -180) && (y <= 180)) {
        y_err.style.display = 'none';
        document.getElementById("longitude").style.color = 'blue';
        document.getElementById("longitude").style.background = 'white';
        lon = y;
    }
    else {
        /*alert('out of range -180 ... 180');*/
        y_err.style.display = 'block';
        y_err.textContent = 'longitude out of range -180 ... 180';
        y_err.style.color = 'red';

        document.getElementById("longitude").style.color = 'red';
        document.getElementById("longitude").style.background = 'pink';
    };

    infoDisplay();

}

// let lat = 0;
// let lon = 0;

let lat = 46.992739043710586;
let lon = 28.819256154301822;

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
