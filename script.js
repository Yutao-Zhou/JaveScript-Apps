const yearsHTML = document.getElementById('years');
const daysHTML = document.getElementById('days');
const hoursHTML = document.getElementById('hours');
const minutesHTML = document.getElementById('minutes');
const secondsHTML = document.getElementById('seconds');
const newYear = new Date('01/01/2024');
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
function count(){
	let currentTime = Date.now();
	let difference = newYear.getTime() - currentTime;
	let years = Math.floor(difference / year);
	let days = Math.floor((difference - years * year) / day);
	let hours = Math.floor((difference - years * year - days * day)/ hour);
	let minutes = Math.floor((difference - years * year - days * day - hours * hour) / minute);
	let seconds = Math.floor((difference - years * year - days * day - hours * hour - minutes * minute) / 1000);
	let milliseconds = ((difference - years * year - days * day - hours * hour - minutes * minute) % 1000);
	yearsHTML.innerHTML = years;
	daysHTML.innerHTML = days;
	hoursHTML.innerHTML = hours;
	minutesHTML.innerHTML = minutes;
	secondsHTML.innerHTML = seconds;
}
count();
setInterval(count, 1);