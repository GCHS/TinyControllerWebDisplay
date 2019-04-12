//by Giancarlo Saraceni
var canvas = document.getElementById("controllerCanvas");
var context = canvas.getContext("2d");
canvas.onload = () => context.imageSmoothingEnabled = false;

var pad;
var padIndex = parseInt((new URL(window.location.href)).hash.substring(1), 10);//URL.hash includes hash character
if(!Number.isSafeInteger(padIndex)){
	padIndex = NaN;
}

var padName = "xb1_elite";
var padAccentColor = [0xD3/255,0xD3/255,0xD3/255,0xFF/255];//default guide button light intensity on elite art
var usesPadAccent = true;
{
	let urlParams = new URLSearchParams(window.location.search);
	let requestedPad = urlParams.get("type");
	if(requestedPad){
		requestedPad = requestedPad.toLocaleLowerCase();
		switch(requestedPad){
			case "ps4":
			case "ds4":
			case "ds4_v2":
			case "ds4_rev2":
				padName = "ds4_rev2";
				padAccentColor = [0/255, 55/255, 145/255, 255/255];//default DS4 lightbar color
				break;
			default:
				//leave it on xb1_elite
		}
	}
	if(usesPadAccent){
		let requestedColor = urlParams.get("color");
		if(requestedColor){//parse hexcode color argument 
			let r,g,b,a;
			let shortcodeCorrectionCoefficient = 1;
			if(requestedColor.length < 6){//RGB(|A) shortcode
				shortcodeCorrectionCoefficient = 0x11;
				r = parseInt(requestedColor.substr(0,1),16);
				g = parseInt(requestedColor.substr(1,1),16);
				b = parseInt(requestedColor.substr(2,1),16);
				a = parseInt(requestedColor.substr(3,1),16);
			}else{//RRGGBB(|AA)
				r = parseInt(requestedColor.substr(0,2),16);
				g = parseInt(requestedColor.substr(2,2),16);
				b = parseInt(requestedColor.substr(4,2),16);
				a = parseInt(requestedColor.substr(6,2),16);
			}
			if(!Number.isSafeInteger(a)){
				a = 255/shortcodeCorrectionCoefficient;
			}
			if(Number.isSafeInteger(r) && Number.isSafeInteger(g) && Number.isSafeInteger(b)){
				padAccentColor[0] = shortcodeCorrectionCoefficient*r/255;
				padAccentColor[1] = shortcodeCorrectionCoefficient*g/255;
				padAccentColor[2] = shortcodeCorrectionCoefficient*b/255;
				padAccentColor[3] = shortcodeCorrectionCoefficient*a/255;
			}	
		}
	}
}

var bottomButton = new Image();
bottomButton.src = "sprites/" + padName + "/bottom_button.gif";

var controllerAccent = new Image();

var dpad = new Image();
dpad.src = "sprites/" + padName + "/dpad.gif";

var faceplate = new Image();
faceplate.src = "sprites/" + padName + "/faceplate.gif";

var leftBumper = new Image();
leftBumper.src = "sprites/" + padName + "/left_bumper.gif";

var leftButton = new Image();
leftButton.src = "sprites/" + padName + "/left_button.gif";

var leftSticktop = new Image();
leftSticktop.src = "sprites/" + padName + "/left_sticktop.gif";

var leftSticktopPressed = new Image();
leftSticktopPressed.src = "sprites/" + padName + "/left_sticktop_pressed.gif";

var leftStickwellPressed = new Image();
leftStickwellPressed.src = "sprites/" + padName + "/left_stickwell_pressed.gif";

var leftTrigger = new Image();
leftTrigger.src = "sprites/" + padName + "/left_trigger.gif";

var rightTrigger = new Image();
rightTrigger.src = "sprites/" + padName + "/right_trigger.gif";

var rightBumper = new Image();
rightBumper.src = "sprites/" + padName + "/right_bumper.gif";

var rightButton = new Image();
rightButton.src = "sprites/" + padName + "/right_button.gif";

var rightSticktop = new Image();
rightSticktop.src = "sprites/" + padName + "/right_sticktop.gif";

var rightSticktopPressed = new Image();
rightSticktopPressed.src = "sprites/" + padName + "/right_sticktop_pressed.gif";

var rightStickwellPressed = new Image();
rightStickwellPressed.src = "sprites/" + padName + "/right_stickwell_pressed.gif";

var rightTrigger = new Image();
rightTrigger.src = "sprites/" + padName + "/right_trigger.gif";

var selectButton = new Image();
selectButton.src = "sprites/" + padName + "/select_button.gif";

var startButton = new Image();
startButton.src = "sprites/" + padName + "/start_button.gif";

var topButton = new Image();
topButton.src = "sprites/" + padName + "/top_button.gif";

var isBlink = (navigator.userAgent.toLowerCase().indexOf("chrom") != -1);

const width = 57, height = 37, triggerArcHeight = 15;

window.addEventListener("gamepadconnected",  function(e){
	console.log(e);
	if(isNaN(padIndex)){
		pad = e.gamepad;
		padIndex = e.gamepad.index;
	}else{
		pad = navigator.getGamepads()[padIndex];
	}
	console.log("Displaying pad #"+padIndex);
	if(usesPadAccent){
		recolorImageOnLoad(controllerAccent, padAccentColor);
		controllerAccent.src = "sprites/" + padName + "/controller_accent.gif";
	}
	updatePad();
});

function updatePad(){
	if(isBlink){//Blink forces polling I guess
		pad = navigator.getGamepads()[padIndex];
	}

	window.requestAnimationFrame(updatePad);
	context.clearRect(0, 0, width, height);
	
	//bumpers
	context.drawImage(leftBumper, pad.buttons[4].value, pad.buttons[4].value);
	context.drawImage(rightBumper, -pad.buttons[5].value, pad.buttons[5].value);
	
	//controller body
	context.drawImage(faceplate, 0, 0);
	if(usesPadAccent){
		context.drawImage(controllerAccent, 0, 0);
	}
	
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
		0, triggerArcHeight*pad.buttons[6].value, width, height-triggerArcHeight*pad.buttons[6].value, //clip rectangle
		0, triggerArcHeight*pad.buttons[6].value, width, height-triggerArcHeight*pad.buttons[6].value);//display rectangle
	context.drawImage(rightTrigger, 
		0, triggerArcHeight*pad.buttons[7].value, width, height-triggerArcHeight*pad.buttons[7].value, //clip rectangle
		0, triggerArcHeight*pad.buttons[7].value, width, height-triggerArcHeight*pad.buttons[7].value);//display rectangle
}

function recolorImageOnLoad(image, color){
	image.onload = () => {
		//CPU image manipulation. I love JavaScript. (Would breaking out WebGL just to recolor an image be too much?)
		context.clearRect(0, 0, image.width, image.height);
		context.drawImage(image, 0, 0);
		let drawnImageData = context.getImageData(0, 0, image.width, image.height);
		const r = 0, g = 1, b = 2, a = 3;
		for(pixel = 0; pixel < drawnImageData.data.length; pixel += 4){
			if(drawnImageData.data[pixel+a]){//skip fully transparent pixels
				//multiply filter. Not gamma correct.
				drawnImageData.data[pixel+r] = (drawnImageData.data[pixel+r] * color[r]);
				drawnImageData.data[pixel+g] = (drawnImageData.data[pixel+g] * color[g]);
				drawnImageData.data[pixel+b] = (drawnImageData.data[pixel+b] * color[b]);
				drawnImageData.data[pixel+a] = (drawnImageData.data[pixel+a] * color[a]);
			}
		}
		context.putImageData(drawnImageData, 0, 0);
		image.onload = null;
		image.src = canvas.toDataURL();
	}
}