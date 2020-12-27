//by Giancarlo Saraceni
let canvas = document.getElementById("controllerCanvas");
let recoloredCanvas = document.getElementById("recoloredCanvas");
let uncoloredCtx = canvas.getContext("2d");
let recoloredCtx = recoloredCanvas.getContext("2d");
canvas.onload = () => uncoloredCtx.imageSmoothingEnabled = false;
recoloredCanvas.onload = () => recoloredCtx.imageSmoothingEnabled = false;

let pad;
let padIndex = parseInt((new URL(window.location.href)).hash.substring(1), 10);//URL.hash includes hash character
if(!Number.isSafeInteger(padIndex)){
	padIndex = NaN;
}

let padName = "xb1_elite";
let padAccentColor = [0xD3/255,0xD3/255,0xD3/255,0xFF/255];//default guide button light intensity on elite art
let usesPadAccent = true;
let isPad = true, bumpersUp = false, isHitbox = false;
{
	let urlParams = new URLSearchParams(window.location.search);
	let requestedPad = urlParams.get("type");
	if(requestedPad){
		requestedPad = requestedPad.toLocaleLowerCase();
		switch(requestedPad){
			case "ds5":
			case "dualsense":
			case "ps5":
				padName="dualsense";
				padAccentColor = [0/255, 89/255, 238/255, 255/255];//default Dualsense accent light color
				break;
			case "ps4":
			case "ds4":
			case "ds4_v2":
			case "ds4_rev2":
				padName = "ds4_rev2";
				padAccentColor = [0/255, 55/255, 145/255, 255/255];//default DS4 lightbar color
				break;
			case "fightstick":
			case "fight_stick":
			case "arcadestick":
			case "arcade_stick":
				padName = "fightstick";
				padAccentColor=[1,1,1,1];//white
				isPad = false;
				if(urlParams.get("bumpers_up")=="true"){
					bumpersUp = true;
				}
				break;
			case "cheatbox":
			case "hitbox":
				padName = "hitbox";
				padAccentColor=[1,1,1,1];//white
				isPad = false;
				bumpersUp = true;
				isHitbox = true;
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
		setRecoloredCanvasColor(padAccentColor);
	}
}

let bottomButton = new Image();
let controllerAccent = new Image();
let dpad = new Image();
let dpadDown = new Image();
let dpadLeft = new Image();
let dpadRight = new Image();
let dpadUp = new Image();
let faceplate = new Image();
let leftBumper = new Image();
let leftButton = new Image();
let leftSticktop = new Image();
let leftSticktopPressed = new Image();
let leftStickwellPressed = new Image();
let leftTrigger = new Image();
let rightBumper = new Image();
let rightButton = new Image();
let rightSticktop = new Image();
let rightSticktopPressed = new Image();
let rightStickwellPressed = new Image();
let rightTrigger = new Image();
let selectButton = new Image();
let startButton = new Image();
let topButton = new Image();

if(isPad){
	bottomButton.src = "sprites/" + padName + "/bottom_button.gif";
	controllerAccent.src = "sprites/" + padName + "/controller_accent.gif";
	dpad.src = "sprites/" + padName + "/dpad.gif";
	faceplate.src = "sprites/" + padName + "/faceplate.gif";
	leftBumper.src = "sprites/" + padName + "/left_bumper.gif";
	leftButton.src = "sprites/" + padName + "/left_button.gif";
	leftSticktop.src = "sprites/" + padName + "/left_sticktop.gif";
	leftSticktopPressed.src = "sprites/" + padName + "/left_sticktop_pressed.gif";
	leftStickwellPressed.src = "sprites/" + padName + "/left_stickwell_pressed.gif";
	leftTrigger.src = "sprites/" + padName + "/left_trigger.gif";
	rightBumper.src = "sprites/" + padName + "/right_bumper.gif";
	rightButton.src = "sprites/" + padName + "/right_button.gif";
	rightSticktop.src = "sprites/" + padName + "/right_sticktop.gif";
	rightSticktopPressed.src = "sprites/" + padName + "/right_sticktop_pressed.gif";
	rightStickwellPressed.src = "sprites/" + padName + "/right_stickwell_pressed.gif";
	rightTrigger.src = "sprites/" + padName + "/right_trigger.gif";
	selectButton.src = "sprites/" + padName + "/select_button.gif";
	startButton.src = "sprites/" + padName + "/start_button.gif";
	topButton.src = "sprites/" + padName + "/top_button.gif";
}else{//is fightstick or hitbox
	bottomButton.src = "sprites/" + padName + "/k1.gif";
	dpad.src = "sprites/" + padName + "/stick.gif";
	faceplate.src = "sprites/" + padName + "/faceplate.gif";
	leftButton.src = "sprites/" + padName + "/p1.gif";
	rightButton.src = "sprites/" + padName + "/k2.gif";
	selectButton.src = "sprites/" + padName + "/select_button.gif";
	startButton.src = "sprites/" + padName + "/start_button.gif";
	topButton.src = "sprites/" + padName + "/p2.gif";
	if(bumpersUp){
		leftBumper.src = "sprites/" + padName + "/p4.gif";
		leftTrigger.src = "sprites/" + padName + "/k4.gif";
		rightBumper.src = "sprites/" + padName + "/p3.gif";
		rightTrigger.src = "sprites/" + padName + "/k3.gif";
	}else{
		leftBumper.src = "sprites/" + padName + "/p3.gif";
		leftTrigger.src = "sprites/" + padName + "/p4.gif";
		rightBumper.src = "sprites/" + padName + "/k3.gif";
		rightTrigger.src = "sprites/" + padName + "/k4.gif";
	}
	if(isHitbox){
		dpadDown.src  = "sprites/" + padName + "/dpad_down.gif";
		dpadLeft.src  = "sprites/" + padName + "/dpad_left.gif";
		dpadRight.src = "sprites/" + padName + "/dpad_right.gif";
		dpadUp.src    = "sprites/" + padName + "/dpad_up.gif";
	}
}

let isBlink = (navigator.userAgent.toLowerCase().indexOf("chrom") != -1);

const width = 57, height = 37, triggerArcHeight = 15;

function getLastTouchedPad(){
	return [...navigator.getGamepads()].filter(pad=>pad != null).reduce((lastTouched, i)=>lastTouched.timestamp < i.timestamp ? i : lastTouched);
}

function boot(e){
	if(isNaN(padIndex)){
		pad = getLastTouchedPad();
		padIndex = pad.index;
	}else{
		pad = navigator.getGamepads()[padIndex];
	}
	console.log("Displaying pad #"+padIndex);
	updatePad();
	window.removeEventListener("gamepadconnected", boot);
}

window.addEventListener("gamepadconnected", boot);

let buttonCtx = isPad?uncoloredCtx:recoloredCtx;

function updatePad(){
	if(isBlink){//Blink forces polling I guess
		pad = navigator.getGamepads()[padIndex];
	}

	window.requestAnimationFrame(updatePad);
	uncoloredCtx.clearRect(0, 0, width, height);
	recoloredCtx.clearRect(0, 0, width, height);
	
	//pad bumpers (drawn under body)
	if(isPad){
		uncoloredCtx.drawImage(leftBumper, pad.buttons[4].value, pad.buttons[4].value);
		uncoloredCtx.drawImage(rightBumper, -pad.buttons[5].value, pad.buttons[5].value);
	}
	
	//controller body
	uncoloredCtx.drawImage(faceplate, 0, 0);
	if(usesPadAccent){
		recoloredCtx.drawImage(controllerAccent, 0, 0);
	}

	//nonpad bumpers (drawn on top of body)
	if(!isPad){
		if(pad.buttons[4].pressed)
			buttonCtx.drawImage(leftBumper, 0, 0);
		if(pad.buttons[5].pressed)
			buttonCtx.drawImage(rightBumper, 0, 0);
	}
	
	//dpad
	{
		let x = pad.buttons[15].value-pad.buttons[14].value;
		let y = pad.buttons[13].value-pad.buttons[12].value;
		if(!isPad){
			x+=pad.axes[0]+pad.axes[2];
			y+=pad.axes[1]+pad.axes[3];
		}
		if(isHitbox){
			if(x<0)
				buttonCtx.drawImage(dpadLeft, 0, 0);
			if(x>0)
				buttonCtx.drawImage(dpadRight, 0, 0);
			if(y>0)
				buttonCtx.drawImage(dpadDown, 0, 0);
			if(y<0)
				buttonCtx.drawImage(dpadUp, 0, 0);
		}else{
			let coeff = isPad?1:2;
			// if(x!=0 && y!=0){//octagonal gate
			// 	coeff = 1;
			// }
			buttonCtx.drawImage(dpad, coeff*x, coeff*y);
		}
	}

	//left stick
	if(isPad){
		if(pad.buttons[10].pressed)
			uncoloredCtx.drawImage(leftStickwellPressed, 0, 0);
		uncoloredCtx.drawImage(pad.buttons[10].pressed?leftSticktopPressed:leftSticktop, 2*pad.axes[0], 2*pad.axes[1]);
	}

	//right stick
	if(isPad){
		if(pad.buttons[11].pressed)
			uncoloredCtx.drawImage(rightStickwellPressed, 0, 0);
		uncoloredCtx.drawImage(pad.buttons[11].pressed?rightSticktopPressed:rightSticktop, 2*pad.axes[2], 2*pad.axes[3]);
	}

	//start/select
	if(pad.buttons[9].pressed)
		buttonCtx.drawImage(startButton, 0, 0);
	if(pad.buttons[8].pressed)
		buttonCtx.drawImage(selectButton, 0, 0);

	//face buttons
	if(pad.buttons[0].pressed)
		buttonCtx.drawImage(bottomButton, 0, 0);
	if(pad.buttons[1].pressed)
		buttonCtx.drawImage(rightButton, 0, 0);
	if(pad.buttons[2].pressed)
		buttonCtx.drawImage(leftButton, 0, 0);
	if(pad.buttons[3].pressed)
		buttonCtx.drawImage(topButton, 0, 0);
	
	//trigger arcs
	if(isPad){
		uncoloredCtx.drawImage(leftTrigger, 
			0, triggerArcHeight*pad.buttons[6].value, width, height-triggerArcHeight*pad.buttons[6].value, //clip rectangle
			0, triggerArcHeight*pad.buttons[6].value, width, height-triggerArcHeight*pad.buttons[6].value);//display rectangle
		uncoloredCtx.drawImage(rightTrigger, 
			0, triggerArcHeight*pad.buttons[7].value, width, height-triggerArcHeight*pad.buttons[7].value, //clip rectangle
			0, triggerArcHeight*pad.buttons[7].value, width, height-triggerArcHeight*pad.buttons[7].value);//display rectangle
	}else{
		if(pad.buttons[6].pressed)
			buttonCtx.drawImage(leftTrigger, 0, 0);
		if(pad.buttons[7].pressed)
			buttonCtx.drawImage(rightTrigger, 0, 0);
	}
}

function setRecoloredCanvasColor(color){
	let multiplicand = document.getElementById("multiplyMatrix");
	let multiplyColorMatrix = color[0]+" 0 0 0 0 0 "+color[1]+" 0 0 0 0 0 "+color[2]+" 0 0 0 0 0 "+color[3]+" 0";//multiply filter. Not gamma correct.
	multiplicand.setAttribute("values", multiplyColorMatrix);

	recoloredCanvas.className = "multiplicand";
}