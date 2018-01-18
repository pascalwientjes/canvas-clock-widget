// Namespace
var pascal = pascal || {};

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
pascal.Clock.prototype._drawClock = function() {
	var context = this._context;
	
	this.centerX = this._width / 2;
	this.centerY = this._height / 2;

	if ( this._width > this._height ) {
		this.radius = this._width / 2 - 2;	
	} else {
		this.radius = this._height / 2 - 2;
	}
	

	context.beginPath();
	context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
	context.fillStyle = '#d3d6db'; 
	context.fill();
	context.lineWidth = 4;
	context.strokeStyle = '#484848';
	context.stroke();

}


function drawAndUpdate(dials, clock) {
	context = clock._context;

	// canvas opschonen en daarna nieuwe klok tekenen
	context.clearRect(0, 0, 500, 500);
	clock._drawClock();
	
	for (var i = 0; i < dials.length; i++) {

		var dial = dials[i];
		dial._update();
	}

	var self = this;

	// requestAnimationFrame(drawAndUpdate(dials, clock));
}


pascal.Clock.prototype.init = function(allDials) {
	document.write(this.getHtml());
	this._canvas = document.getElementById(this._canvasId);
	this._context = this._canvas.getContext('2d');

	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	var dials = [];

	var hourDial = new pascal.Dials(this._canvas, 4, 'black', 0.75, hours * 15);
	dials.push(hourDial);

	var minutesDial = new pascal.Dials(this._canvas, 2, 'grey', 0.9, minutes * 6);
	dials.push(minutesDial);

	if (allDials == 'all') {
		var secondsDial = new pascal.Dials(this._canvas, 1, 'blue', 1, seconds * 6);
		dials.push(secondsDial);
	}

	
	drawAndUpdate(dials, this);

}




// constructor
pascal.Dials = function(canvas, strokeWidth, color, length, circleDegree) {
	this._canvas = canvas;
	this._strokeWidth = strokeWidth;
	this._length = length;
	this._color = color;
	this._circleDegree = circleDegree;

}

pascal.Dials.prototype._update = function() {
	var canvas = this._canvas;
	var context = canvas.getContext('2d');

	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var lineLength = canvasWidth / 2 * this._length;
	var circleDegree = this._circleDegree;

	// OK DIT GAAT NOG VOLLEDIG FOUT xD

	var xAxis = Math.cos(lineLength) * circleDegree + canvasWidth;
	var Yaxis = Math.sin(lineLength) * circleDegree + canvasHeight;

	console.log(xAxis);

	console.log(Yaxis);

	context.beginPath();
	context.moveTo(canvasWidth/2, canvasHeight/2);
	context.lineTo(xAxis, Yaxis);	
	context.lineWidth = this._strokeWidth;
	context.strokeStyle = this._color;
	context.stroke();
	context.closePath();
}