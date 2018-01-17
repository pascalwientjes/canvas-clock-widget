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
	this.radius = 70;

	context.beginPath();
	context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
	context.fillStyle = '#d3d6db'; 
	context.fill();
	context.lineWidth = 4;
	context.strokeStyle = '#484848';
	context.stroke();

}


pascal.Clock.prototype._drawAndUpdate = function(dials) {
	var context = this._context;

	// canvas opschonen en daarna nieuwe klok tekenen
	context.clearRect(0, 0, 500, 500);
	this._drawClock();

	for (var i = 0; i < dials.length; i++) {

		var dial = dials[i];
		dial._update();
	}

	requestAnimationFrame(drawAndUpdate);
}


pascal.Clock.prototype.init = function(allDials) {
	document.write(this.getHtml());
	this._canvas = document.getElementById(this._canvasId);
	this._context = this._canvas.getContext('2d');

	var dials = [];

	var hourDial = new pascal.Dials(4, 'black', 0.75);
	dials.push(hourDial);

	var minutesDial = new pascal.Dials(2, 'grey', 0.9);
	dials.push(minutesDial);

	if (allDials == 'all') {
		var secondsDial = new pascal.Dials(1, 'blue', 1);
		dials.push(secondsDial);
	}

	
	this._drawAndUpdate(dials);

}




// constructor
pascal.Dials = function(strokeWidth, color, length) {
	this.strokeWidth = strokeWidth;
	this.length = length;
	this.color = color;

}

pascal.Dials.prototype._update = function(strokeWidth, color, length) {
	
}