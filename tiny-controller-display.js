var canvas = document.getElementById("controllerCanvas");
var context = canvas.getContext("2d");

var pad;
var padIndex = parseInt((new URL(window.location.href)).hash.substring(1), 10);//URL.hash includes hash character
if(!Number.isSafeInteger(padIndex)){
	console.log(padIndex);
	padIndex = 0;
}

var bottomButton = new Image();
bottomButton.src = "sprites/bottom_button.gif";

var dpad = new Image();
dpad.src = "sprites/dpad.gif";

var faceplate = new Image();
faceplate.src = "sprites/faceplate.gif";

var leftBumper = new Image();
leftBumper.src = "sprites/left_bumper.gif";

var leftButton = new Image();
leftButton.src = "sprites/left_button.gif";

var leftSticktop = new Image();
leftSticktop.src = "sprites/left_sticktop.gif";

var leftSticktopPressed = new Image();
leftSticktopPressed.src = "sprites/left_sticktop_pressed.gif";

var leftStickwellPressed = new Image();
leftStickwellPressed.src = "sprites/left_stickwell_pressed.gif";

var leftTrigger = new Image();
leftTrigger.src = "sprites/left_trigger.gif";

var rightTrigger = new Image();
rightTrigger.src = "sprites/right_trigger.gif";

var rightBumper = new Image();
rightBumper.src = "sprites/right_bumper.gif";

var rightButton = new Image();
rightButton.src = "sprites/right_button.gif";

var rightSticktop = new Image();
rightSticktop.src = "sprites/right_sticktop.gif";

var rightSticktopPressed = new Image();
rightSticktopPressed.src = "sprites/right_sticktop_pressed.gif";

var rightStickwellPressed = new Image();
rightStickwellPressed.src = "sprites/right_stickwell_pressed.gif";

var rightTrigger = new Image();
rightTrigger.src = "sprites/right_trigger.gif";

var selectButton = new Image();
selectButton.src = "sprites/select_button.gif";

var startButton = new Image();
startButton.src = "sprites/start_button.gif";

var topButton = new Image();
topButton.src = "sprites/top_button.gif";

var isBlink = (navigator.userAgent.toLowerCase().indexOf("chrom") != -1);

window.addEventListener("gamepadconnected",  function(e){
	pad = navigator.getGamepads()[padIndex];
	updatePad();
});

function updatePad() {
	if (isBlink){//Blink forces polling I guess
		pad = navigator.getGamepads()[padIndex];
	}

	window.requestAnimationFrame(updatePad);
	context.clearRect(0, 0, 57, 37);
	
	//bumpers
	context.drawImage(leftBumper, pad.buttons[4].value, pad.buttons[4].value);
	context.drawImage(rightBumper, -pad.buttons[5].value, pad.buttons[5].value);
	
	//controller body
	context.drawImage(faceplate, 0, 0);
	
	//dpad
	context.drawImage(dpad, pad.buttons[15].value-pad.buttons[14].value, pad.buttons[13].value-pad.buttons[12].value);

	//left stick
	if(pad.buttons[10].pressed)
		context.drawImage(leftStickwellPressed, 0, 0);
	context.drawImage(pad.buttons[10].pressed?leftSticktopPressed:leftSticktop, 2*pad.axes[0], 2*pad.axes[1]);

	//right stick
	if(pad.buttons[11].pressed)
		context.drawImage(rightStickwellPressed, 0, 0);
	context.drawImage(pad.buttons[11].pressed?rightSticktopPressed:rightSticktop, 2*pad.axes[2], 2*pad.axes[3]);

	//start/select
	if(pad.buttons[9].pressed)
		context.drawImage(startButton, 0, 0);
	if(pad.buttons[8].pressed)
		context.drawImage(selectButton, 0, 0);

	//face buttons
	if(pad.buttons[0].pressed)
		context.drawImage(bottomButton, 0, 0);
	if(pad.buttons[1].pressed)
		context.drawImage(rightButton, 0, 0);
	if(pad.buttons[2].pressed)
		context.drawImage(leftButton, 0, 0);
	if(pad.buttons[3].pressed)
		context.drawImage(topButton, 0, 0);
	
	//trigger arcs
	context.drawImage(leftTrigger, 
		0, 15*pad.buttons[6].value, 57, 37-15*pad.buttons[6].value, //clip rectangle
		0, 15*pad.buttons[6].value, 57, 37-15*pad.buttons[6].value);//display rectangle
	context.drawImage(rightTrigger, 
		0, 15*pad.buttons[7].value, 57, 37-15*pad.buttons[7].value, //clip rectangle
		0, 15*pad.buttons[7].value, 57, 37-15*pad.buttons[7].value);//display rectangle
}