// Namespace
var pascal = pascal || {};

// Global variables

var hands = [];
var mainCanvas;
var mainContext;


// Controls variabelen
var showAllHands = true;
var timeIndicators = true;
var minutesIndicators = true;
var romanNumerals = 0;
var romanIII = false
var romanVI = false;
var romanIX = false;
var romanXII = false;
var addLogo = false;
var automaatSimulation = false;
var fancyMinuteIndicators = false;
var complicationType;

//constructor
pascal.Widget = function(width, height, canvasId, controls) {
	this._width = width;
	this._height = height;
	this._canvasId = canvasId;
	this._controls = controls;
}

pascal.Widget.prototype.getHtml = function() {
	if (this._controls) {
		var controlsOffset = 200;
	} else {
		var controlsOffset = 0;
	}

	var widgetStyling = 'position: relative; left: 50%; top: 50%; margin-left: -' + ((this._width / 2) + controlsOffset) + 'px; margin-top: -' + this._height / 2 + 'px;';

	return "<canvas style='" + widgetStyling + "' id='" + this._canvasId + "' width='" + this._width + "' height='" + this._height + "' class='widget'></canvas>";
}


// constructor
pascal.Clock = function(width, height, canvasId, controls) {
	pascal.Widget.call(this, width, height, canvasId, controls);
	
}

//overervings relatie 
pascal.Clock.prototype = Object.create(pascal.Widget.prototype);
pascal.Clock.prototype.constructor = pascal.Clock;

function drawRomanNumeral() {
	mainContext.font = 'normal 34px Calibri';
	mainContext.fillStyle = '#c1c1c1';

	if (romanIII === true) {
		mainContext.fillText('III', (mainCanvas.width * 0.96) - 22, (mainCanvas.height / 2) + 11);
	}

	if (romanVI === true) {
		mainContext.fillText('VI', (mainCanvas.width / 2) - 13, mainCanvas.height * 0.96);
	}

	if (romanIX === true) {
		mainContext.fillText('IX', (mainCanvas.width * 0.025), (mainCanvas.height / 2) + 11);
	}

	if (romanXII === true) {
		mainContext.fillText('XII', (mainCanvas.width / 2) - 17, mainCanvas.height * 0.1);
	}

}

function drawTimeIndicators(indicatorAmount) {
	var centerPointOffset = mainCanvas.width / 2;
	var innerLineLength = mainCanvas.width / 2 * 0.85;
	var outerLineLength = mainCanvas.width / 2 * 0.99;
	var smallInnerLineLength = mainCanvas.width / 2 * 0.9;
	var smallOuterLineLength = mainCanvas.width / 2 * 0.99;
	var reservedIndicators = [15,30,45,60]

	if (romanNumerals === 1) {
		var skipTimeIndicator = [12];

	} else if (romanNumerals === 2) {
		var skipTimeIndicator = [6, 12];

	} else if (romanNumerals === 4) {
		var skipTimeIndicator = [3, 6, 9, 12];
	} else {
		var skipTimeIndicator = [];		
	}

	if (timeIndicators == true) {
		for (var i = 1; i <= indicatorAmount; i++) {

			if (skipTimeIndicator.includes(i)) {
				continue;
			}

			var degreesOnCircle = convertToRadians((i * 30) - 90);

			var innerX = (Math.cos(degreesOnCircle) * innerLineLength) + centerPointOffset;
			var innerY = (Math.sin(degreesOnCircle) * innerLineLength) + centerPointOffset;
			var outerX = (Math.cos(degreesOnCircle) * outerLineLength) + centerPointOffset;
			var outerY = (Math.sin(degreesOnCircle) * outerLineLength) + centerPointOffset;

			mainContext.beginPath();
			mainContext.moveTo(innerX, innerY);
			mainContext.lineTo(outerX, outerY);	
			mainContext.lineWidth = 2;
			mainContext.strokeStyle = '#dedede';
			mainContext.stroke();
			mainContext.closePath();

		}
	}

	if (minutesIndicators == true) {
		for (var i = 1; i <= 60; i++) {

			var lineWidth = 1;

			if (reservedIndicators.includes(i)) {
				continue;
			}

			if (fancyMinuteIndicators == true) {
				var smallInnerLineLength = mainCanvas.width / 2 * 0.92;
				var smallOuterLineLength = mainCanvas.width / 2 * 0.94;
				var lineWidth = 1.5;
			}

			var degreesOnCircle = convertToRadians((i * 6) - 90);

			var innerX = (Math.cos(degreesOnCircle) * smallInnerLineLength) + centerPointOffset;
			var innerY = (Math.sin(degreesOnCircle) * smallInnerLineLength) + centerPointOffset;
			var outerX = (Math.cos(degreesOnCircle) * smallOuterLineLength) + centerPointOffset;
			var outerY = (Math.sin(degreesOnCircle) * smallOuterLineLength) + centerPointOffset;

			mainContext.beginPath();
			mainContext.moveTo(innerX, innerY);
			mainContext.lineTo(outerX, outerY);	
			mainContext.lineWidth = lineWidth;
			mainContext.strokeStyle = '#dedede';
			mainContext.stroke();
			mainContext.closePath();
		}
	}

	drawRomanNumeral();
}

// clock methods
function drawClock() {	

	centerX = mainCanvas.width / 2;
	centerY = mainCanvas.height / 2;

	if ( mainCanvas.width > mainCanvas.height ) {
		radius = width / 2 - 2;	
	} else {
		radius = mainCanvas.height / 2 - 2;
	}

	var gradient = mainContext.createLinearGradient(0, mainCanvas.height , 0, 0);
	gradient.addColorStop(0,"#f9f9f9");
	gradient.addColorStop(1,"#fff");
	
	mainContext.beginPath();
	mainContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	mainContext.fillStyle = gradient; 
	mainContext.fill();
	mainContext.lineWidth = 2;
	mainContext.strokeStyle = '#dedede';
	mainContext.stroke();

	drawTimeIndicators(12, 4);

	mainContext.beginPath();
	mainContext.arc(centerX, centerY, 4, 0, 2 * Math.PI, false);
	mainContext.fillStyle = '#c1c1c1'; 
	mainContext.fill();

}

function drawYear() {
	var date = new Date();
	var currentYear = date.getFullYear();

	mainContext.fillStyle = '#fff';
	mainContext.strokeStyle = '#dedede';
	mainContext.lineWidth = 1.5;
	mainContext.fillRect(mainCanvas.width * 0.18, mainCanvas.height * 0.7, 46, 24);
	mainContext.strokeRect(mainCanvas.width * 0.18, mainCanvas.height * 0.7, 46, 24);
	mainContext.font = 'normal 16px Calibri';
	mainContext.fillStyle = '#c1c1c1';
	mainContext.fillText(currentYear, mainCanvas.width * 0.18 + 12 - 6, mainCanvas.height * 0.7 + 17);
}

function drawMiniHand(centerX, centerY, degrees) {
	var lineLength = mainCanvas.width / 7 * 0.6;

	var degrees = degrees ;
	var circleDegree = degrees;

	circleDegree = convertToRadians(circleDegree - 90);

	var xAxis = (Math.cos(circleDegree) * lineLength) + centerX;
	var Yaxis = (Math.sin(circleDegree) * lineLength) + centerY;

	mainContext.beginPath();
	mainContext.moveTo(centerX, centerY);
	mainContext.lineTo(xAxis, Yaxis);	
	mainContext.lineWidth = 1.5;
	mainContext.strokeStyle = '#c1c1c1';
	mainContext.stroke();
	mainContext.closePath();

	mainContext.beginPath();
	mainContext.arc(centerX, centerY, 3, 0, 2 * Math.PI, false);
	mainContext.fillStyle = '#c1c1c1';
	mainContext.fill();
}



function drawCalendarAreas() {
	var xLocation = [mainCanvas.width / 2 * 0.5, mainCanvas.width  * 0.75, mainCanvas.width / 2];
	var yLocation = [mainCanvas.height / 2, mainCanvas.height / 2, mainCanvas.height * 0.75];

	for (var i = 0; i < 3; i++) {
		mainContext.beginPath();
		mainContext.arc(xLocation[i], yLocation[i], mainCanvas.width / 7, 0, 2 * Math.PI, false);
		mainContext.fillStyle = '#fff';
		mainContext.fill();
		mainContext.lineWidth = 1.5;
		mainContext.strokeStyle = '#dedede';
		mainContext.stroke();

	}
	mainContext.font = 'normal 14px Calibri';
	drawTextAlongArc('- OCT - DEC - FEB', mainCanvas.width / 2, mainCanvas.height * 0.75, mainCanvas.width / 10.5, Math.PI / 24, 'months', 1);
	drawTextAlongArc('AUG - JUN  - APR -', mainCanvas.width / 2, mainCanvas.height * 0.75, mainCanvas.width / 10.5, Math.PI / 24, 'months');

	drawTextAlongArc(' SAT SUN MON', mainCanvas.width / 2 * 0.5, mainCanvas.height / 2, mainCanvas.width / 10.5, Math.PI / 50, 'months', 1);
	drawTextAlongArc('FRI THU WED TUE', mainCanvas.width / 2 * 0.5, mainCanvas.height / 2, mainCanvas.width / 10.5, Math.PI / 40, 'dayNames');

	drawTextAlongArc('25 27 29 31 1 3 5 7',mainCanvas.width  * 0.75, mainCanvas.height / 2, mainCanvas.width / 10.5, Math.PI / 20, 'days', 1);
	drawTextAlongArc('23 21 19 17 15 13 11 9', mainCanvas.width  * 0.75, mainCanvas.height / 2, mainCanvas.width / 10.5, Math.PI / 60, 'daysBottom');

	var date = new Date();
	drawMiniHand(mainCanvas.width / 2, mainCanvas.height * 0.75, (date.getMonth() + 1) * 30);
	drawMiniHand(mainCanvas.width / 2 * 0.5, mainCanvas.height / 2, date.getDay() * 51.42857142857143);
	drawMiniHand(mainCanvas.width  * 0.75, mainCanvas.height / 2, date.getDate() * 11.61290322580645);

	drawYear();
}

// cool function found at http://jsfiddle.net/Brfp3/3/
function drawTextAlongArc(text, x, y, radius, space, calendarType, top){
   space = space || 0;
   var numRadsPerLetter = (Math.PI - space * 2) / text.length;

   mainContext.save();
   mainContext.translate(x,y);

   if (calendarType == 'months') {
   	var offset = 0.19;
   } else if(calendarType == 'days') {
   	var offset = 0.11;
   } else if(calendarType == 'daysBottom') {
   	var offset = 0.09;
   } else {
   	var offset = 0;
   }

   var k = (top) ? 1 : -1; 
   mainContext.rotate(-k * ((Math.PI - numRadsPerLetter) / 2 - space));

	for(var i=0;i<text.length;i++){
		mainContext.save();
		mainContext.rotate((k*i*(numRadsPerLetter)) - offset);
		mainContext.textAlign = "center";
		mainContext.textBaseline = (!top) ? "top" : "bottom";
		mainContext.fillStyle = '#c1c1c1';
		mainContext.fillText(text[i],0,-k*(radius));
		
		mainContext.restore();
	}

   mainContext.restore();
}

function drawAnnualCalendar() {
	drawCalendarAreas();
}


function drawDate() {
	var date = new Date();
	var today = date.getDate();

	mainContext.fillStyle = '#fff';
	mainContext.strokeStyle = '#dedede';
	mainContext.lineWidth = 2;
	mainContext.fillRect(mainCanvas.width * 0.2, mainCanvas.height / 2 - 15, 45, 30);
	mainContext.strokeRect(mainCanvas.width * 0.2, mainCanvas.height / 2 - 15, 45, 30);
	mainContext.font = 'bold 18px Calibri';
	mainContext.fillStyle = '#c1c1c1';
	mainContext.fillText(today, mainCanvas.width * 0.2 + 12, mainCanvas.height / 2 + 4.5);

}

function drawComplications() {
	if (complicationType === 'date') {
		drawDate();
	} else if (complicationType === 'moonphase') {
		// TODO
		// Need to think of a way to actually calculate the phase of the moon
	} else if (complicationType === 'annual calendar') {
		drawAnnualCalendar();
	} 
}

function drawLogo() {
	image = new Image();
	image.src = 'images/jaeger.png';
	mainContext.drawImage(image, mainCanvas.width / 2 - image.width / 4, mainCanvas.height * 0.15, image.width / 2, image.height / 2);
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function convertToRadians(degrees) {
	var radians = degrees * Math.PI / 180;

	return radians;
}


function drawAndUpdate() {

	var clock = clock;

	// canvas opschonen en daarna nieuwe klok tekenen
	mainContext.clearRect(0, 0, 500, 500);
	drawClock();

	drawComplications();

	if (addLogo) {
		drawLogo();
	}
	
	for (var i = 0; i < hands.length; i++) {

		var hand = hands[i];
		hand._update();
	}

	requestAnimationFrame(drawAndUpdate);
}


pascal.Clock.prototype.init = function() {
	document.getElementsByTagName("BODY")[0].style.height = "100%";
	document.getElementsByTagName("BODY")[0].style.margin = "0";
	document.getElementsByTagName("HTML")[0].style.height = "100%";

	document.write(this.getHtml());

	if (this._controls) {
		document.write(this.getControlsHtml());
		this.addControlEvents();
	}

	mainCanvas = document.getElementById(this._canvasId);
	mainContext = mainCanvas.getContext('2d');

	var hourHand = new pascal.Hands(3, '#c1c1c1', 0.75, 'hours');
	hands.push(hourHand);

	var minutesHand = new pascal.Hands(2, '#c1c1c1', 0.9, 'minutes');
	hands.push(minutesHand);

	var secondsHand = new pascal.Hands(1, '#c1c1c1', 0.96, 'seconds');
	hands.push(secondsHand);

	
	drawAndUpdate();

}

pascal.Clock.prototype.getControlsHtml = function() {
	var controlsStyling = 'style="position: absolute; top: 0px; right: 0px; height: 100%" ';

	var html = '<div ' + controlsStyling + 'class="clock-controls" id="clockControls">';
	html += '<h3>Opties</h3>';
	html += '<table class="options-container"><tbody>';
	html += this.addControlOptionHtml('Automaat simulatie', 'switch', 'Met deze optie simuleer je een mechanisch horloge');
	html += this.addControlOptionHtml('Je ne sais quoi', 'switch', 'Voeg iets onbeschrijfbaar moois aan de clock toe');
	html += this.addControlOptionHtml('Verstop secondenwijzer', 'switch', 'Deze optie lijkt me nogal voor zich te spreken ヽ(ヅ)ノ');
	html += this.addControlOptionHtml('Romeinse cijfers', 'dropdown-numerals', 'Kies hier hoeveel roman numerals de klok moet hebben');
	html += this.addControlOptionHtml('Tijds indicatoren', 'dropdown-timestamps', 'Kies hier of je minuten of 5 minuten indicatoren wilt');
	html += this.addControlOptionHtml('Elegante minuut aanduiding', 'switch', 'Als je minuut aanduiding aan hebt staan kun je ze hiermee eleganter maken');
	html += this.addControlOptionHtml('Extra complicatie', 'dropdown-complications', 'Kies hier welke extra complicatie je wilt tonen');
	html += '</table></tbody>';
	html += '</div>';

	return html;
}

pascal.Clock.prototype.addControlOptionHtml = function(optionName, type, tooltipText) {
	var optionCamelCase = camelize(optionName);

	var optionHtml = '<tr>';
	optionHtml += '<td class="left-col"><span class="tooltip" data-tooltip="' + tooltipText + '">' + optionName + '</span></td><td>';

	switch (type) {
		case 'switch':
			optionHtml += '<input type="checkbox" class="switch" name="' + optionCamelCase + '" id="' + optionCamelCase + '"><label for="' + optionCamelCase + '"></label>';
			break;

		case 'dropdown-numerals':
			optionHtml += '<select id="' + optionCamelCase + '">';
			optionHtml += '<option value="0" selected>Geen Romeinse cijfers</option>';
			optionHtml += '<option value="1">Alleen de 12</option>';
			optionHtml += '<option value="2">De 12 en 6</option>';
			optionHtml += '<option value="4">De 3, 6, 9 en 12</option>';
			optionHtml += '</select>';
			break;

		case 'dropdown-timestamps':
			optionHtml += '<select id="' + optionCamelCase + '">';
			optionHtml += '<option value="0">Kale wijzerplaat</option>';
			optionHtml += '<option value="1">5 minuten indicatoren</option>';
			optionHtml += '<option value="2" selected>1 minuut indicatoren</option>';
			optionHtml += '</select>';
			break;

		case 'dropdown-complications':
			optionHtml += '<select id="' + optionCamelCase + '">';
			optionHtml += '<option value="0" selected>Geen extra complicatie</option>';
			optionHtml += '<option value="1">Datum indicatie</option>';
			optionHtml += '<option value="2">Perpetual annual calendar</option>';
			optionHtml += '</select>';
			break;
	} 

	optionHtml += '</td></tr>';

	return optionHtml;
}

pascal.Clock.prototype.addControlEvents = function() {
	document.getElementById('jeNeSaisQuoi').addEventListener('click', function() {
		if (this.checked) {
			addLogo = true;
		} else {
			addLogo = false;
		}
	});

	document.getElementById('eleganteMinuutAanduiding').addEventListener('click', function() {
		if (this.checked) {
			fancyMinuteIndicators = true;
		} else {
			fancyMinuteIndicators = false;
		}
	});


	document.getElementById('verstopSecondenwijzer').addEventListener('click', function() {
		if (this.checked) {
			showAllHands = false;
		} else {
			showAllHands = true;
		}
	});

	document.getElementById('automaatSimulatie').addEventListener('click', function() {
		if (this.checked) {
			automaatSimulation = true;
		} else {
			automaatSimulation = false;
		}
	});

	document.getElementById('romeinseCijfers').addEventListener('change', function() {
		if (this.value == 0) {
			romanNumerals = 0;
			romanIII = false
			romanVI = false;
			romanIX = false;
			romanXII = false;

		} else if (this.value == 1) {
			romanNumerals = 1;
			romanIII = false
			romanVI = false;
			romanIX = false;
			romanXII = true;

		} else if (this.value == 2) {
			romanNumerals = 2;
			romanIII = false
			romanVI = true;
			romanIX = false;
			romanXII = true;

		} else if (this.value == 4) {
			romanNumerals = 4;
			romanIII = true
			romanVI = true;
			romanIX = true;
			romanXII = true;
		}
	});

	document.getElementById('tijdsIndicatoren').addEventListener('change', function() {
		if (this.value == 0) {
			timeIndicators = false;
			minutesIndicators = false;

		} else if (this.value == 1) {
			timeIndicators = true;
			minutesIndicators = false;

		} else if (this.value == 2) {
			timeIndicators = true;
			minutesIndicators = true;

		}
	});

	document.getElementById('extraComplicatie').addEventListener('change', function() {
		if (this.value == 0) {
			complicationType = false;

		} else if (this.value == 1) {
			complicationType = 'date';

		} else if (this.value == 2) {
			complicationType = 'annual calendar';

		}
	});
}

// constructor
pascal.Hands = function(strokeWidth, color, length, handtype) {
	this._strokeWidth = strokeWidth;
	this._length = length;
	this._color = color;
	this._handtype = handtype;

}

pascal.Hands.prototype._update = function() {
	var canvasWidth = mainCanvas.width;
	var canvasHeight = mainCanvas.height;
	var lineLength = canvasWidth / 2 * this._length;
	var handType = this._handtype;
	var centerPointOffset = canvasWidth / 2;

	var date = new Date();

	if (handType == 'hours') {
		var hours = date.getHours() % 12 || 12;
		var hourDegrees = 0.5 * (60 * hours + date.getMinutes());
		var circleDegree = hourDegrees - 90;

	} else if (handType == 'minutes') {
		if (automaatSimulation) {
			var minutesDegrees = 0.1 * (60 * date.getMinutes() + date.getSeconds());
		} else {
			var minutesDegrees = date.getMinutes() * 6;
		}
		
		var circleDegree = minutesDegrees - 90;
	
	} else if (handType == 'seconds') {
		if (!showAllHands) {
			return;
		}
		if (automaatSimulation) {
			var secondsDegrees = 0.006 * (1000 * date.getSeconds() + date.getMilliseconds());
		} else {
			var secondsDegrees = date.getSeconds() * 6;
		}
		
		var circleDegree = secondsDegrees - 90;
		var circleDegreeOpposite = secondsDegrees + 90;
	}

	circleDegree = convertToRadians(circleDegree);

	var xAxis = (Math.cos(circleDegree) * lineLength) + centerPointOffset;
	var Yaxis = (Math.sin(circleDegree) * lineLength) + centerPointOffset;

	mainContext.beginPath();
	mainContext.moveTo(canvasWidth/2, canvasHeight/2);
	mainContext.lineTo(xAxis, Yaxis);	
	mainContext.lineWidth = this._strokeWidth;
	mainContext.strokeStyle = this._color;
	mainContext.stroke();
	mainContext.closePath();

	if (handType == 'seconds') {
		circleDegree = convertToRadians(circleDegreeOpposite);

		var xAxis = (Math.cos(circleDegree) * (lineLength * 0.07)) + centerPointOffset;
		var Yaxis = (Math.sin(circleDegree) * (lineLength * 0.07)) + centerPointOffset;

		mainContext.beginPath();
		mainContext.moveTo(canvasWidth/2, canvasHeight/2);
		mainContext.lineTo(xAxis, Yaxis);	
		mainContext.lineWidth = this._strokeWidth;
		mainContext.strokeStyle = this._color;
		mainContext.stroke();
		mainContext.closePath();
	}
}
