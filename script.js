"use strict"


let minutes = 1;
let seconds = 0;

let minutesValue = document.querySelector('.minutes');
let secondsValue = document.querySelector('.seconds')

let startButton = document.querySelector('.start-timer');

let decreaseSeconds;
let decreaseMinutes;

//Event - click on the button "Start/Pause"
startButton.addEventListener("click", function(){
	changeStartButton();
	offDarkMode();
	runIndicator();
	startSound();
});

function startSound(){
	if(seconds == 0){
		document.querySelector(".audio-start").volume = 1.0;
		document.querySelector(".audio-start").play();
	}
}

let audioFinish = document.querySelector(".audio-finish");
let stopAudioPopup = document.querySelector(".finish-popup")

function finishSound(){
	document.querySelector(".audio-finish").volume = 1.0;
	audioFinish.play();
	stopAudioPopup.classList.add("active");

	document.querySelector(".finish-popup__btn").addEventListener("click", function(){
		audioFinish.pause();
		stopAudioPopup.classList.remove("active");
	})
}

//Running/Stopping the circle indicator of time.
let timerElements = document.querySelector('.timer-block').children;

function runIndicator(){

	document.querySelector(".timer-block").classList.add('active');

	if(startButton.textContent == "pause"){
		Array.from(timerElements).forEach(function(item){
			item.style.animationPlayState = "running"
		});
	}else if(startButton.textContent == "start"){
		Array.from(timerElements).forEach(function(item){
			item.style.animationPlayState = "paused"
		});
	}	
};

//Swither the dark mode of body's background.
function offDarkMode(){
	document.querySelector(".dark-mode").classList.toggle("unactive")
};

//Setting favicon.
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

//Setting the values for title of the site.
function setTitleValue(){
	document.querySelector("title").innerHTML = `${minutesValue.textContent}:${secondsValue.textContent}`
} 

// console.log(document.querySelector("title").textContent)

//Switcher of "Start/Pause" button.
function changeStartButton(){
	if(startButton.textContent == "start"){
		decreaseSeconds = setInterval(countdownSeconds, 1000);
		startButton.textContent = "pause";
	} else {
		clearInterval(decreaseSeconds);
		startButton.textContent = "start";
	}
}

//Decreasing of seconds.
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

//Auto-changing of timer mode after the end of time.
function changeModeAuto(){
	
	let conditionButton = document.querySelector(".active");

		if(conditionButton.id == "work-mode"){
			document.querySelector("#break-mode").click();
		} else if ( conditionButton.id == "long-break-mode" || conditionButton.id == "break-mode" ){
			document.querySelector("#work-mode").click();
		}
		changeStartButton();
		finishSound();
}

//Setting the values of clock face.
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

//Object of condition mode parameters.
let siteCondition = {
	"work-mode": {
		body: "work-mode",
		"activities" : "TO WORK",
		minutes : 25,
		"indicatorColor": "green",
	},

	"break-mode": {
		body: "break-mode",
		"activities" : "FOR A BREAK",
		minutes : 5,
		"indicatorColor": "orange",
	},

	"long-break-mode": {
		body: "long-break-mode",
		"activities" : "FOR A LONG BREAK",
		minutes : 15,
		"indicatorColor": "red",
	},
}


let stages = document.querySelector(".stages");

//Listener of timer mode changes. If timer is not over - call Confirm form.
stages.addEventListener("click", function(event){
	if(event.target.closest('.stages__btn')){
		
		if(seconds != 0){

			let confirmChange = confirm("are you sure?")

			if(confirmChange == true){
				buttonActivation();
				changeMode();
				startButton.textContent = "start";
				setFavicon();
				runIndicator();
				offIndicator();
				changeIndicatorTime();
			}

		}else{
			buttonActivation();
			changeMode();
			setFavicon();
			runIndicator();
			offIndicator();
			changeIndicatorTime();
		}
	}
});

//Settings for changing of timer mode.
function changeMode(){
	let buttonId = event.target.id;

	//Set the body's background color.
	document.querySelector('body').className = 
	siteCondition[buttonId].body;

	//Set the value for tagline. 
	document.querySelector('.activities').innerHTML = 
	siteCondition[buttonId]["activities"];

	minutes = siteCondition[buttonId].minutes;
	seconds = 0;

	setTimerValues()
	clearInterval(decreaseSeconds);
};

//Changing the time of indicator rotation, when the mode is changed.
function changeIndicatorTime() {
	let buttonId = event.target.id;
	Array.from(timerElements).forEach(function(item){
		item.style.animationDuration = `${siteCondition[buttonId].minutes * 60}s`;
		document.querySelector(".green-right").style.background = siteCondition[buttonId]["indicatorColor"];
		document.querySelector(".timer-line").style.background = `linear-gradient(to right, ${siteCondition[buttonId]["indicatorColor"]} 50%, white 50%`;

	});
};



//Shutting down the indicator when the mode is changed.
function offIndicator(){
	document.querySelector(".timer-block").classList.remove('active');
};

//Changing the color of active mode button.
function buttonActivation(){
	let stagesBtns = document.querySelectorAll('.stages__btn');
	stagesBtns.forEach(button => button.classList.remove("active"));

	event.target.classList.add('active');
};