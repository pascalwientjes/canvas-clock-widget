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

	console.log('test');

	requestAnimationFrame(drawAndUpdate)
}


pascal.Clock.prototype.init = function(allDials) {
	document.write(this.getHtml());
	mainCanvas = document.getElementById(this._canvasId);
	mainContext = mainCanvas.getContext('2d');

	var date = new Date();
	var hours = date.getHours() % 12 || 12;
	var hourDegrees = 0.5 * (60 * hours + date.getMinutes());
	console.log(hourDegrees);
	var minutesDegrees = date.getMinutes() * 6;
	var secondsDegrees = date.getSeconds() * 6;

	

	var hourDial = new pascal.Dials(3, '#c1c1c1', 0.75, hourDegrees - 90);
	dials.push(hourDial);

	var minutesDial = new pascal.Dials(2, '#c1c1c1', 0.9, minutesDegrees - 90);
	dials.push(minutesDial);

	if (allDials == 'all') {
		var secondsDial = new pascal.Dials(1, '#c1c1c1', 0.96, secondsDegrees - 90);
		dials.push(secondsDial);
	}

	// console.log(this);

	
	drawAndUpdate();

}

// constructor
pascal.Dials = function(strokeWidth, color, length, circleDegree) {
	this._strokeWidth = strokeWidth;
	this._length = length;
	this._color = color;
	this._circleDegree = circleDegree;

}

pascal.Dials.prototype._update = function() {
	var canvasWidth = mainCanvas.width;
	var canvasHeight = mainCanvas.height;
	var lineLength = canvasWidth / 2 * this._length;
	var circleDegree = this._circleDegree;
	var centerPointOffset = canvasWidth / 2;

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