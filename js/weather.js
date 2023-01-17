const app = document.querySelector('.weatherApp');
const temp = document.querySelector('.temp');
const name = document.querySelector('.cityName');
const high = document.querySelector('.high');
const low = document.querySelector('.low');
const icon = document.querySelector('.icon');
const condition = document.querySelector('.condition');
const form = document.querySelector('.locationInput');
const search = document.querySelector('.search');
const submit = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const cloud = document.querySelector('.cloud');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const visibility = document.querySelector('.visibility');
const feelsLike = document.querySelector('.feelsLike');
const pressure = document.querySelector('.pressure');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const timezone = document.querySelector('.timezone');
const apiKey = "694775f6f729d68419dd9d5b58609b5f"

let cityInput = "San Jose";


cities.forEach((city) => {
	city.addEventListener('click', (e) => {
		cityInput = e.target.innerHTML;
		geoEncoding(cityInput);
		// app.style.opacity = "0";
	});
})

locationInput.addEventListener('submit', (e) => {
	if(search.value.length == 0){
		alert('City name could not be empty.');
	} else {
		console.log(search)
		cityInput = search.value;
		geoEncoding(cityInput);
		search.value = "";
		// app.style.opacity = "0";
	}
	e.preventDefault();
});

function convertime(unix){
	let date = new Date(unix * 1000);
    return date.toLocaleString();
}

function getLocalTime(timezoneUnix){
	let currentTime = new Date()
	UTC = currentTime - currentTime.getTimezoneOffset()
	time = UTC / 1000 + timezoneUnix
	console.log(currentTime.getTimezoneOffset(),UTC, time)
	return convertime(time)
}

function fetchWeatherData(lat, lon){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
		.then((response) => response.json())
		.then((d) => {
			console.log(d);
			temp.innerHTML = Math.round((d['main']['temp'] - 273.15 + Number.EPSILON) * 100) / 100 + "&#176;";
			high.innerHTML = "High:&nbsp;" + Math.round((d['main']['temp_max'] - 273.15 + Number.EPSILON) * 100) / 100 + "&#176;";
			low.innerHTML = "Low:&nbsp;" + Math.round((d['main']['temp_min'] - 273.15 + Number.EPSILON) * 100) / 100 + "&#176;";
			name.innerHTML = d['name'];
			icon.src = `http://openweathermap.org/img/wn/${d['weather'][0]['icon']}@2x.png`;
			condition.innerHTML = d['weather'][0]['description'][0].toUpperCase() + d['weather'][0]['description'].substring(1);
			cloud.innerHTML = d["clouds"]["all"] + "%";
			humidity.innerHTML = d["main"]["humidity"] + "%";
			wind.innerHTML = d["wind"]["speed"] + "&nbsp;km/h";
			visibility.innerHTML = d["visibility"] + "&nbsp;m";
			feelsLike.innerHTML = d["main"]["feels_like"] + "&#176;";
			pressure.innerHTML = d["main"]["pressure"] + "&nbsp;millibars";
			sunrise.innerHTML = convertime(d["sys"]["sunrise"]);
			sunset.innerHTML = convertime(d["sys"]["sunset"]);
			timezone.innerHTML = getLocalTime(d["timezone"])
			});
  			
}

function geoEncoding(cityInput){
	console.log(cityInput)
	fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=0&appid=${apiKey}`)
		.then((response) => response.json())
  		.then((data) => {
  			lat = data[0]['lat'];
  			lon = data[0]['lon'];
  			fetchWeatherData(lat, lon)
  		});
}

function getUserLocation() {
	const successCallback = (position) => {
		console.log(position);
		fetchWeatherData(position["coords"]["latitude"], position["coords"]["longitude"]);
	};

	navigator.geolocation.getCurrentPosition(successCallback);
}

getUserLocation()