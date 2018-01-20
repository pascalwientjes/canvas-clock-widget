// Namespace
var pascal = pascal || {};

// Global variables

var dials = [];
var mainCanvas;
var mainContext;

//constructor
pascal.Widget = function(width, height, canvasId) {
	this._width = width;
	this._height = height;
	this._canvasId = canvasId;
}

pascal.Widget.prototype.getHtml = function() {
	return "<canvas id='" + this._canvasId + "' width='" + this._width + "' height='" + this._height + "' class='widget'></canvas>";
}



// constructor
pascal.Clock = function(width, height, canvasId) {
	pascal.Widget.call(this, width, height, canvasId);
}

//overervings relatie 
pascal.Clock.prototype = Object.create(pascal.Widget.prototype);
pascal.Clock.prototype.constructor = pascal.Clock;

function drawRomanNumeral(iii, vi, ix, xii) {
	mainContext.font = 'normal 34px Calibri';
	mainContext.fillStyle = '#c1c1c1';


	if (iii = true) {
		mainContext.fillText('III', (mainCanvas.width * 0.96) - 22, (mainCanvas.height / 2) + 11);
	}

	if (vi = true) {
		mainContext.fillText('VI', (mainCanvas.width / 2) - 13, mainCanvas.height * 0.96);
	}

	if (ix = true) {
		mainContext.fillText('IX', (mainCanvas.width * 0.04), (mainCanvas.height / 2) + 11);
	}

	if (xii = true) {
		mainContext.fillText('XII', (mainCanvas.width / 2) - 17, mainCanvas.height * 0.1);
	}

}

function drawTimeIndicators(indicatorAmount, romanNumerals) {
	var centerPointOffset = mainCanvas.width / 2;
	var innerLineLength = mainCanvas.width / 2 * 0.85;
	var outerLineLength = mainCanvas.width / 2 * 0.99;

	if (romanNumerals === 1) {
		var skipTimeIndicator = [12];
		drawRomanNumeral(false, false, false, true);

	} else if (romanNumerals === 2) {
		var skipTimeIndicator = [6, 12];
		drawRomanNumeral(false, true, false, true);

	} else if (romanNumerals === 4) {
		var skipTimeIndicator = [3, 6, 9, 12];
		drawRomanNumeral(true, true, false, true);
	} else {
		var skipTimeIndicator = [];
		drawRomanNumeral(false, false, false, false);		
	}

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

// clock methods
function drawClock() {	

	centerX = mainCanvas.width / 2;
	centerY = mainCanvas.height / 2;

	if ( mainCanvas.width > mainCanvas.height ) {
		radius = width / 2 - 2;	
	} else {
		radius = mainCanvas.height / 2 - 2;
	}
	
	mainContext.beginPath();
	mainContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	mainContext.fillStyle = '#f3f3f3'; 
	mainContext.fill();
	mainContext.lineWidth = 2;
	mainContext.strokeStyle = '#dedede';
	mainContext.stroke();

	drawTimeIndicators(12, 4)

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
	
	for (var i = 0; i < dials.length; i++) {

		var dial = dials[i];
		dial._update();
	}

	requestAnimationFrame(drawAndUpdate)
}


pascal.Clock.prototype.init = function(allDials) {
	document.write(this.getHtml());
	mainCanvas = document.getElementById(this._canvasId);
	mainContext = mainCanvas.getContext('2d');

	var hourDial = new pascal.Dials(3, '#c1c1c1', 0.75, 'hours');
	dials.push(hourDial);

	var minutesDial = new pascal.Dials(2, '#c1c1c1', 0.9, 'minutes');
	dials.push(minutesDial);

	if (allDials == 'all') {
		var secondsDial = new pascal.Dials(1, '#c1c1c1', 0.96, 'seconds');
		dials.push(secondsDial);
	}
	
	drawAndUpdate();

}

// constructor
pascal.Dials = function(strokeWidth, color, length, dialtype) {
	this._strokeWidth = strokeWidth;
	this._length = length;
	this._color = color;
	this._dialtype = dialtype;

}

pascal.Dials.prototype._update = function() {
	var canvasWidth = mainCanvas.width;
	var canvasHeight = mainCanvas.height;
	var lineLength = canvasWidth / 2 * this._length;
	var dialType = this._dialtype;
	var centerPointOffset = canvasWidth / 2;

	var date = new Date();

	if (dialType == 'hours') {
		var hours = date.getHours() % 12 || 12;
		var hourDegrees = 0.5 * (60 * hours + date.getMinutes());
		var circleDegree = hourDegrees - 90;

	} else if (dialType == 'minutes') {
		var minutesDegrees = date.getMinutes() * 6;
		var circleDegree = minutesDegrees - 90;
	
	} else if (dialType == 'seconds') {
		var secondsDegrees = date.getSeconds() * 6;
		var circleDegree = secondsDegrees - 90;
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
}