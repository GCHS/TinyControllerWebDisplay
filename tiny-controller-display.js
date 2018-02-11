var canvas = document.getElementById("controllerCanvas");
var context = canvas.getContext("2d");

var pad;

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

window.addEventListener("gamepadconnected", function(e){
	pad = navigator.getGamepads()[e.gamepad.index];
	updatePad();
});

function updatePad() {
	window.requestAnimationFrame(updatePad);
	context.clearRect(0,0,57,37);
	context.drawImage(leftBumper,0,0);
	context.drawImage(rightBumper,0,0);
	context.drawImage(faceplate,0,0);
	context.drawImage(dpad,0,0);
	context.drawImage(leftSticktop,0,0);
	context.drawImage(rightSticktop,0,0);
	context.drawImage(startButton,0,0);
	context.drawImage(selectButton,0,0);
	context.drawImage(bottomButton,0,0);
	context.drawImage(leftButton,0,0);
	context.drawImage(rightButton,0,0);
	context.drawImage(topButton,0,0);
	context.drawImage(leftTrigger,0,0);
	context.drawImage(rightTrigger,0,0);
}