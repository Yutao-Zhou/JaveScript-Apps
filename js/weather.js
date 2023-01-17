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
	}
	e.preventDefault();
});

function convertime(unix){
	let date = new Date(unix * 1000);
    return date.toLocaleString();
}

function fetchWeatherData(lat, lon){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
		.then((response) => response.json())
		.then((d) => {
			console.log(d);
			tempreture = Math.round((d['main']['temp'] - 273.15 + Number.EPSILON) * 100) / 100
			feelTempreture = Math.round((d["main"]["feels_like"] - 273.15 + Number.EPSILON) * 100) / 100
			lowTempreture = Math.round((d['main']['temp_min'] - 273.15 + Number.EPSILON) * 100) / 100
			highTempreture = Math.round((d['main']['temp_max'] - 273.15 + Number.EPSILON) * 100) / 100
			unit = 0
			temp.innerHTML = Math.round((d['main']['temp'] - 273.15 + Number.EPSILON) * 100) / 100 + "&#8451;";
			high.innerHTML = "High:&nbsp;" + Math.round((d['main']['temp_max'] - 273.15 + Number.EPSILON) * 100) / 100 + "&#8451;";
			low.innerHTML = "Low:&nbsp;" + Math.round((d['main']['temp_min'] - 273.15 + Number.EPSILON) * 100) / 100 + "&#8451;";
			name.innerHTML = d['name'];
			icon.src = `http://openweathermap.org/img/wn/${d['weather'][0]['icon']}@2x.png`;
			condition.innerHTML = d['weather'][0]['description'][0].toUpperCase() + d['weather'][0]['description'].substring(1);
			cloud.innerHTML = d["clouds"]["all"] + "%";
			humidity.innerHTML = d["main"]["humidity"] + "%";
			wind.innerHTML = d["wind"]["speed"] + "&nbsp;km/h";
			visibility.innerHTML = d["visibility"] + "&nbsp;m";
			feelsLike.innerHTML = Math.round((d["main"]["feels_like"] - 273.15 + Number.EPSILON) * 100) / 100 + "&#8451;";
			pressure.innerHTML = d["main"]["pressure"] + "&nbsp;millibars";
			sunrise.innerHTML = convertime(d["sys"]["sunrise"]);
			sunset.innerHTML = convertime(d["sys"]["sunset"]);
			if (Math.round(d["timezone"] / (60 * 60)) >= 0){
				timezone.innerHTML = "+" + Math.round(d["timezone"] / (60 * 60)) + "&nbsp;Hours"
			} else{
				timezone.innerHTML = Math.round(d["timezone"] / (60 * 60)) + "&nbsp;Hours"
			}
			switch(d['weather'][0]['icon']){
				case "01d":
					app.style.backgroundImage = 'url(../images/weather/clear-day.jpg)';
					break;
				case "02d":
					app.style.backgroundImage = 'url(../images/weather/few-clouds-day.jpg)';
					break;
				case "03d":
					app.style.backgroundImage = 'url(../images/weather/scattered-clouds-day.jpg)';
					break;
				case "04d":
					app.style.backgroundImage = 'url(../images/weather/broken-clouds-day.jpg)';
					break;
				case "09d":
					app.style.backgroundImage = 'url(../images/weather/shower-rain-day.jpg)';
					break;
				case "10d":
					app.style.backgroundImage = 'url(../images/weather/rain-day.jpg)';
					break;
				case "11d":
					app.style.backgroundImage = 'url(../images/weather/thunderstorm-day.jpg)';
					break;
				case "13d":
					app.style.backgroundImage = 'url(../images/weather/snow-day.jpg)';
					break;
				case "50d":
					app.style.backgroundImage = 'url(../images/weather/mist-day.jpg)';
					break;
				case "01n":
					app.style.backgroundImage = 'url(../images/weather/clear-night.jpg)';
					break;
				case "02n":
					app.style.backgroundImage = 'url(../images/weather/few-clouds-night.jpg)';
					break;
				case "03n":
					app.style.backgroundImage = 'url(../images/weather/scattered-clouds-night.jpg)';
					break;
				case "04n":
					app.style.backgroundImage = 'url(../images/weather/broken-clouds-night.jpg)';
					break;
				case "09n":
					app.style.backgroundImage = 'url(../images/weather/shower-rain-night.jpg)';
					break;
				case "10n":
					app.style.backgroundImage = 'url(../images/weather/rain-night.jpg)';
					break;
				case "11n":
					app.style.backgroundImage = 'url(../images/weather/thunderstorm-night.jpg)';
					break;
				case "13n":
					app.style.backgroundImage = 'url(../images/weather/snow-night.jpg)';
					break;
				case "50n":
					app.style.backgroundImage = 'url(../images/weather/mist-night.jpg)';
					break;		
			}
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

geoEncoding(cityInput)
getUserLocation()

temp.onclick = function(){
	if (unit % 2 === 0){
		temp.innerHTML = Math.round((((tempreture + Number.EPSILON) * 9 / 5) + 32)* 100) / 100 + "&#8457;";
		tempreture = Math.round((((tempreture + Number.EPSILON) * 9 / 5) + 32)* 100) / 100;
		feelsLike.innerHTML = Math.round((((feelTempreture + Number.EPSILON) * 9 / 5) + 32)* 100) / 100 + "&#8457;";
		feelTempreture = Math.round((((feelTempreture + Number.EPSILON) * 9 / 5) + 32)* 100) / 100;
		low.innerHTML = "Low:&nbsp;" + Math.round((((lowTempreture + Number.EPSILON) * 9 / 5) + 32)* 100) / 100 + "&#8457;";
		lowTempreture = Math.round((((lowTempreture + Number.EPSILON) * 9 / 5) + 32)* 100) / 100;
		high.innerHTML = "High:&nbsp;" + Math.round((((highTempreture + Number.EPSILON) * 9 / 5) + 32)* 100) / 100 + "&#8457;";
		highTempreture = Math.round((((highTempreture + Number.EPSILON) * 9 / 5) + 32)* 100) / 100;
	} else {
		temp.innerHTML = Math.round(((tempreture + Number.EPSILON - 32) * 5 / 9)* 100) / 100 + "&#8451;";
		tempreture = Math.round(((tempreture + Number.EPSILON - 32) * 5 / 9)* 100) / 100;
		feelsLike.innerHTML = Math.round(((feelTempreture + Number.EPSILON - 32) * 5 / 9)* 100) / 100 + "&#8451;";
		feelTempreture = Math.round(((feelTempreture + Number.EPSILON - 32) * 5 / 9)* 100) / 100;
		low.innerHTML = "Low:&nbsp;" + Math.round(((lowTempreture + Number.EPSILON - 32) * 5 / 9)* 100) / 100 + "&#8451;";
		lowTempreture = Math.round(((lowTempreture + Number.EPSILON - 32) * 5 / 9)* 100) / 100;
		high.innerHTML = "High:&nbsp;" + Math.round(((highTempreture + Number.EPSILON - 32) * 5 / 9)* 100) / 100 + "&#8451;";
		highTempreture = Math.round(((highTempreture + Number.EPSILON - 32) * 5 / 9)* 100) / 100;
	}
	unit += 1;
};