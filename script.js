"use strict"

let minutes = 25;
let seconds = 0;



let minutesValue = document.querySelector('.minutes');
let secondsValue = document.querySelector('.seconds')

let startButton = document.querySelector('.start-timer');

let decreaseSeconds;
let decreaseMinutes;

startButton.addEventListener("click", function(){
	changeStartButton();

	

});

function setFavicon(){
	let conditionButton = document.querySelector(".active");

	let favicon = document.querySelector('[rel="shortcut icon"]');

	if(conditionButton.id == "work-mode"){
		favicon.setAttribute('href', 'green.png')
	} else if (conditionButton.id == "break-mode"){
		favicon.setAttribute('href', 'yellow.png')
	}else if (conditionButton.id == "long-break-mode"){
		favicon.setAttribute('href', 'red.png')
	}
}

function setTitleValue(){
	document.querySelector("title").innerHTML = `${minutesValue.textContent}:${secondsValue.textContent}`


} 

// console.log(document.querySelector("title").textContent)

function changeStartButton(){
	if(startButton.textContent == "start"){
		decreaseSeconds = setInterval(countdownSeconds, 1000);
		startButton.textContent = "pause";
	} else {
		clearInterval(decreaseSeconds);
		startButton.textContent = "start";
	}
}

function countdownSeconds(){
	setTitleValue();
	setTimerValues();
	seconds -= 1;
	if(seconds < 0 ){
		seconds = 59;
		minutes -= 1;
	}
	if(minutes <= -1 ){
		clearInterval(decreaseSeconds);
		seconds = 0;
		changeModeAuto();

	}
}

function changeModeAuto(){
	let conditionButton = document.querySelector(".active");

		if(conditionButton.id == "work-mode"){
			document.querySelector("#break-mode").click();
		} else if ( conditionButton.id == "long-break-mode" || conditionButton.id == "break-mode" ){
			document.querySelector("#work-mode").click();
		}
		changeStartButton();
}

function setTimerValues(){
	if(minutes < 10){
		minutesValue.innerHTML =`0${minutes}` ;
	}else{
		minutesValue.innerHTML = minutes  ;
	}
	
	if(seconds < 10){
		secondsValue.innerHTML =`0${seconds}` ;
	}else{
		secondsValue.innerHTML = seconds ;
	}
}

let siteCondition = {
	"work-mode": {
		body: "work-mode",
		"activities" : "WORK",
		minutes : 25,
	},

	"break-mode": {
		body: "break-mode",
		"activities" : "BREAK",
		minutes : 5,
	},

	"long-break-mode": {
		body: "long-break-mode",
		"activities" : "LONG-BREAK",
		minutes : 15,
	},
}


let stages = document.querySelector(".stages");

stages.addEventListener("click", function(event){
	if(event.target.closest('.stages__btn')){
		
		if(seconds != 0){

			let confirmChange = confirm("are you sure?")

			if(confirmChange){
				buttonActivation();
				changeMode();
				// changeStartButton();
				startButton.textContent = "start";
				setFavicon()
			}

		}else{
			buttonActivation();
			changeMode();
			setFavicon()
		}
	}
});

function changeMode(){
	let buttonId = event.target.id;

	document.querySelector('body').className = 
	siteCondition[buttonId].body;

	document.querySelector('.activities').innerHTML = 
	siteCondition[buttonId]["activities"];

	minutes = siteCondition[buttonId].minutes;
	seconds = 0;

	setTimerValues()

	clearInterval(decreaseSeconds);
};


function buttonActivation(){
	let stagesBtns = document.querySelectorAll('.stages__btn');
	stagesBtns.forEach(button => button.classList.remove("active"));

	event.target.classList.add('active');
};