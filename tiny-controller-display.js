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

//js, why do you not have enums (also #using namespaces or something I guess)
const Pad = Symbol("pad");
const Fightstick = Symbol("fightstick");
const Hitbox = Symbol("hitbox");
const Rectangle = Symbol("gram");

let rectanglePointsTable = [];

let padName = "xb1_elite";
let padAccentColor = [0xD3/255,0xD3/255,0xD3/255,0xFF/255];//default guide button light intensity on elite art
let controllerGeo = Pad;
const isPad = () => {
	return controllerGeo === Pad;
};
const hasStick = () => {
	return !(controllerGeo === Hitbox || controllerGeo === Rectangle);
}
const shouldFuseDirectionalInputs = () => {
	return controllerGeo === Fightstick || controllerGeo === Hitbox;
}

let bottomButton = new Image();
let controllerAccent = new Image();
let dirDown = new Image();
let dirLeft = new Image();
let dirRight = new Image();
let dirUp = new Image();
let dpad = new Image();
let dToggle = new Image();
let faceplate = new Image();
let leftBumper = new Image();
let leftButton = new Image();
let leftSticktop = new Image();
let leftSticktopPressed = new Image();
let leftStickwellPressed = new Image();
let leftTrigger = new Image();
let rightBumper = new Image();
let rightButton = new Image();
let rightStickDown = new Image();
let rightStickLeft = new Image();
let rightStickRight = new Image();
let rightSticktop = new Image();
let rightStickUp = new Image();
let rightSticktopPressed = new Image();
let rightStickwellPressed = new Image();
let rightTrigger = new Image();
let rightTriggerLight = new Image();
let rightTriggerMid = new Image();
let selectButton = new Image();
let startButton = new Image();
let topButton = new Image();
let modX = new Image();
let modY = new Image();

{//configure controller
	let urlParams = new URLSearchParams(window.location.search);
	{//parse controller type
		let requestedPad = urlParams.get("type");
		if(requestedPad){
			requestedPad = requestedPad.toLocaleLowerCase();
			switch(requestedPad){
				case "ds5":
				case "dualsense":
				case "ps5":
					padName="dualsense";
					padAccentColor = [0/255, 89/255, 238/255, 255/255];//default Dualsense accent light color
					controllerGeo = Pad;
					break;
				case "ps4":
				case "ds4":
				case "ds4_v2":
				case "ds4_rev2":
					padName = "ds4_rev2";
					padAccentColor = [0/255, 55/255, 145/255, 255/255];//default DS4 lightbar color
					controllerGeo = Pad;
					break;
				case "fightstick":
				case "fight_stick":
				case "arcadestick":
				case "arcade_stick":
					padName = "fightstick";
					padAccentColor = [1,1,1,1];//white
					controllerGeo = Fightstick;
					break;
				case "cheatbox":
				case "hitbox":
				case "leverless":
				case "stickless":
				case "slab":
					padName = "hitbox";
					padAccentColor = [1,1,1,1];//white
					controllerGeo = Hitbox;
					break;
				case "rectangle":
				case "boxx":
				case "b0xx":
				case "frame1":
				case "gram":
				case "smashbox":
					padName = "rectangle";
					padAccentColor = [1,1,1,1];//white
					controllerGeo = Rectangle;
					let getRectPoints = document.createElement("script");
					getRectPoints.src = "Melee20Button.js";
					document.body.appendChild(getRectPoints);
					break;
				default:
					//leave it on xb1_elite
			}
		}
	}

	{//parse accent color
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

	{//configure sprites
		const spritePath = (btnName) => `sprites/${padName}/${btnName}.gif`;

		if(controllerGeo === Pad){
			bottomButton.src          = spritePath("bottom_button");
			controllerAccent.src      = spritePath("controller_accent");
			dpad.src                  = spritePath("dpad");
			faceplate.src             = spritePath("faceplate");
			leftBumper.src            = spritePath("left_bumper");
			leftButton.src            = spritePath("left_button");
			leftSticktop.src          = spritePath("left_sticktop");
			leftSticktopPressed.src   = spritePath("left_sticktop_pressed");
			leftStickwellPressed.src  = spritePath("left_stickwell_pressed");
			leftTrigger.src           = spritePath("left_trigger");
			rightBumper.src           = spritePath("right_bumper");
			rightButton.src           = spritePath("right_button");
			rightSticktop.src         = spritePath("right_sticktop");
			rightSticktopPressed.src  = spritePath("right_sticktop_pressed");
			rightStickwellPressed.src = spritePath("right_stickwell_pressed");
			rightTrigger.src          = spritePath("right_trigger");
			selectButton.src          = spritePath("select_button");
			startButton.src           = spritePath("start_button");
			topButton.src             = spritePath("top_button");
		}else if(controllerGeo === Rectangle){
			faceplate.src    = urlParams.get("transparent") == "true"? spritePath("faceplate_transparent") : spritePath("faceplate");
			
			bottomButton.src = spritePath("a");
			rightButton.src  = spritePath("b");
			leftButton.src   = spritePath("x");
			topButton.src    = spritePath("y");

			rightStickDown.src   = spritePath("c_down");
			rightStickLeft.src   = spritePath("c_left");
			rightStickRight.src  = spritePath("c_right");
			rightStickUp.src     = spritePath("c_up");

			leftTrigger.src = spritePath("lt");

			rightBumper.src = spritePath("z");

			rightTrigger.src = spritePath("rt");
			rightTriggerLight.src = spritePath("light_shield");
			rightTriggerMid.src = spritePath("mid_shield");

			startButton.src = spritePath("start");

			
			dirDown.src  = spritePath("down");
			dirLeft.src  = spritePath("left");
			dirRight.src = spritePath("right");

			if(urlParams.get("wasd_mode") == "true" || urlParams.get("wasdmode") == "true"){
				dirUp.src   = spritePath("d_toggle");
				dToggle.src = spritePath("up");
			}else{
				dirUp.src   = spritePath("up");
				dToggle.src = spritePath("d_toggle");
			}
			modX.src = spritePath("mod_x");
			modY.src = spritePath("mod_y");
		}else{//is fightstick or hitbox
			bottomButton.src = spritePath("k1");
			faceplate.src    = urlParams.get("transparent") == "true"? spritePath("faceplate_transparent") : spritePath("faceplate");
			leftButton.src   = spritePath("p1");
			rightButton.src  = spritePath("k2");
			selectButton.src = spritePath("select_button");
			startButton.src  = spritePath("start_button");
			topButton.src    = spritePath("p2");
			if(controllerGeo === Hitbox || urlParams.get("bumpers_up") == "true"){
				leftBumper.src   = spritePath("p4");
				leftTrigger.src  = spritePath("k4");
				rightBumper.src  = spritePath("p3");
				rightTrigger.src = spritePath("k3");
			}else{
				leftBumper.src   = spritePath("p3");
				leftTrigger.src  = spritePath("p4");
				rightBumper.src  = spritePath("k3");
				rightTrigger.src = spritePath("k4");
			}
			if(controllerGeo === Hitbox){
				dirDown.src  = spritePath("dpad_down");
				dirLeft.src  = spritePath("dpad_left");
				dirRight.src = spritePath("dpad_right");
				dirUp.src    = spritePath("dpad_up");
			}else{
				dpad.src = spritePath("stick");
			}
		}
	}
}

let isBlink = (navigator.userAgent.toLowerCase().indexOf("chrom") != -1);

const width = 57, height = 37, triggerArcHeight = 15;
const axisDeadzone = 0.25, buttonDeadzone = 0.125;

function getNonNeutralPads(){
	return [...navigator.getGamepads()].filter(p => p != null && (p.axes.filter(a => Math.abs(a) > axisDeadzone).length || p.buttons.filter(b => b.value >= buttonDeadzone).length));
}

let lastRectangleInput = 0;


function boot(e){
	if(isNaN(padIndex)){
		/* Pad autoselection is designed this way because of Chrome.
		 * For reasons I cannot fathom, Chrome's GamepadConnected event
		 * passes in P1's pad (XInput UserID 0 on Windows),
		 * instead of the pad that spawned the event.

		 * The previous version of this feature
		 * relied on the Gamepad.timestamp field.
		 * However, when it spawns Gamepads,
		 * Chrome sets every Gamepad's .timestamp to the same value,
		 * the same .timestamp present
		 * in the event passed into this function.

		 * This renders it impossible to actually know which gamepad was connected.

		 * Hence, a guess must be made.

		 * Firefox's behavior in connecting gamepads is completely different,
		 * and much kinder to this feature. Alas, OBS's Browser Source is Chrome.
		*/
		pad = getNonNeutralPads()[0];
		padIndex = pad.index;
	}else{
		pad = navigator.getGamepads()[padIndex];
	}
	console.log("Displaying pad #"+padIndex);
	updatePad();
	window.removeEventListener("gamepadconnected", boot);
}

window.addEventListener("gamepadconnected", boot);

let buttonCtx = isPad()?uncoloredCtx:recoloredCtx;

function updatePad(){
	if(isBlink){//Blink forces polling I guess
		pad = navigator.getGamepads()[padIndex];
	}

	window.requestAnimationFrame(updatePad);
	uncoloredCtx.clearRect(0, 0, width, height);
	recoloredCtx.clearRect(0, 0, width, height);
	
	//pad bumpers (drawn under body)
	if(isPad()){
		uncoloredCtx.drawImage(leftBumper, pad.buttons[4].value, pad.buttons[4].value);
		uncoloredCtx.drawImage(rightBumper, -pad.buttons[5].value, pad.buttons[5].value);
	}
	
	//controller body
	uncoloredCtx.drawImage(faceplate, 0, 0);
	recoloredCtx.drawImage(controllerAccent, 0, 0);

	//nonpad bumpers (drawn on top of body)
	if(!isPad()){
		if(pad.buttons[4].pressed) buttonCtx.drawImage(leftBumper, 0, 0);
		if(pad.buttons[5].pressed) buttonCtx.drawImage(rightBumper, 0, 0);
	}
	
	function applyAxisDeadzone(axis){return Math.abs(axis) >= axisDeadzone? axis : 0;}
	//dpad
	if(controllerGeo !== Rectangle){
		let lx = applyAxisDeadzone(pad.axes[0]);
		let ly = applyAxisDeadzone(pad.axes[1]);
		let rx = applyAxisDeadzone(pad.axes[2]);
		let ry = applyAxisDeadzone(pad.axes[3]);

		if(!hasStick()){//test and display all directional values separately for socd purposes
			if(lx<0 || rx<0 || pad.buttons[14].pressed) buttonCtx.drawImage(dirLeft, 0, 0);
			if(lx>0 || rx>0 || pad.buttons[15].pressed) buttonCtx.drawImage(dirRight, 0, 0);
			if(ly>0 || ry>0 || pad.buttons[13].pressed) buttonCtx.drawImage(dirDown, 0, 0);
			if(ly<0 || ry<0 || pad.buttons[12].pressed) buttonCtx.drawImage(dirUp, 0, 0);
			console.log(lx);
		}else{
			let coeff = isPad()?1:2;
			// if(x!=0 && y!=0){//octagonal gate
			// 	coeff = 1;
			// }
			let x = pad.buttons[15].value-pad.buttons[14].value;
			let y = pad.buttons[13].value-pad.buttons[12].value;
			buttonCtx.drawImage(dpad, coeff*x, coeff*y);
		}
	}

	//left stick
	if(isPad()){
		if(pad.buttons[10].pressed)
			uncoloredCtx.drawImage(leftStickwellPressed, 0, 0);
		uncoloredCtx.drawImage(pad.buttons[10].pressed?leftSticktopPressed:leftSticktop, 2*pad.axes[0], 2*pad.axes[1]);
	}

	//right stick
	if(isPad()){
		if(pad.buttons[11].pressed)
			uncoloredCtx.drawImage(rightStickwellPressed, 0, 0);
		uncoloredCtx.drawImage(pad.buttons[11].pressed?rightSticktopPressed:rightSticktop, 2*pad.axes[2], 2*pad.axes[3]);
	}

	//rectangle directional inputs
	if(controllerGeo === Rectangle){
		function findXInputValue(axisValue){//the closest to being an integer is the farthest from being a half-integer
			//this function works in Firefox but is usually off by one in Chrome
			//I don't really know why and maybe I'll figure it out some day
			//but that day is not today.
			var shortside = Math.abs((Math.abs(axisValue) * 32767)%1.0 - 0.5);
			var longside = Math.abs((Math.abs(axisValue) * 32768)%1.0 - 0.5);
			if(shortside > longside){
				return Math.round(axisValue * 32767);
			}
			return Math.round(axisValue * 32768);
		}

		function popcount(a){
			let count = 0;
			for(let i = 0; i<32; i++){
				if((1<<i)&a)
					count++;
			}
			return count;
		}

		function hayboxXInputToGCN(axis){
			if(axis === 0) return 128; //untouched axes report 0 in Firefox...
			return Math.round((axis - 128)/257) + 128;
			//this^ extra rounding is here b/c of a difference in behavior
			//between Firefox and Chrome causing findXInputValue to usually be
			//off by one in Chrome. Augh.
		}
		let lx = hayboxXInputToGCN(findXInputValue( pad.axes[0]));
		let ly = hayboxXInputToGCN(findXInputValue(-pad.axes[1]));
		let rx = hayboxXInputToGCN(findXInputValue( pad.axes[2]));
		let ry = hayboxXInputToGCN(findXInputValue(-pad.axes[3]));
		
		let comboIdx = (((lx * 256 + ly) * 256 + rx) * 256) + ry; //we need positive indices in here
		let inputs = rectanglePointsTable[comboIdx];

		if(typeof inputs !== 'undefined'){//catches both an input not being in the table and the table itself not being loaded
			let length = inputs.length;
			let input = inputs[0];
			let diffPop = popcount(input^lastRectangleInput);
			for(let i = 1; i<length; i++){
				let testPop = popcount(inputs[i]^lastRectangleInput);
				if(testPop < diffPop){
					input = inputs[i];
					diffPop = testPop;
				}
			}

			{//dpad layer
				let dpadPressed = false;
				if(pad.buttons[14].pressed) {dpadPressed = true; buttonCtx.drawImage(rightStickLeft , 0, 0);}
				if(pad.buttons[15].pressed) {dpadPressed = true; buttonCtx.drawImage(rightStickRight, 0, 0);}
				if(pad.buttons[13].pressed) {dpadPressed = true; buttonCtx.drawImage(rightStickDown , 0, 0);}
				if(pad.buttons[12].pressed) {dpadPressed = true; buttonCtx.drawImage(rightStickUp   , 0, 0);}
				if(dpadPressed) {input |= (InputModX | InputModY);}
			}

			if((input & InputLeft  ) === InputLeft  ) buttonCtx.drawImage(dirLeft,         0, 0);
			if((input & InputRight ) === InputRight ) buttonCtx.drawImage(dirRight,        0, 0);
			if((input & InputUp    ) === InputUp    ) buttonCtx.drawImage(dirUp,           0, 0)
			if((input & InputDown  ) === InputDown  ) buttonCtx.drawImage(dirDown,         0, 0);
			if((input & InputCLeft ) === InputCLeft ) buttonCtx.drawImage(rightStickLeft,  0, 0);
			if((input & InputCRight) === InputCRight) buttonCtx.drawImage(rightStickRight, 0, 0);
			if((input & InputCUp   ) === InputCUp   ) buttonCtx.drawImage(rightStickUp,    0, 0);
			if((input & InputCDown ) === InputCDown ) buttonCtx.drawImage(rightStickDown,  0, 0);
			if((input & InputModX  ) === InputModX  ) buttonCtx.drawImage(modX,            0, 0);
			if((input & InputModY  ) === InputModY  ) buttonCtx.drawImage(modY,            0, 0);
			if((input & InputShield) === InputShield) console.log("coordinate-based shield input...");
			if((input & InputB     ) === InputB     ) console.log("coordinate-based b input...");

			lastRectangleInput = input;
		}else{
			let lx = applyAxisDeadzone(pad.axes[0]);
			let ly = applyAxisDeadzone(pad.axes[1]);
			let rx = applyAxisDeadzone(pad.axes[2]);
			let ry = applyAxisDeadzone(pad.axes[3]);

			if(lx > 0) buttonCtx.drawImage(dirLeft, 0, 0);
			if(lx < 0) buttonCtx.drawImage(dirRight, 0, 0);
			if(ly > 0) buttonCtx.drawImage(dirDown, 0, 0);
			if(ly < 0) buttonCtx.drawImage(dirUp, 0, 0);

			if(rx > 0) buttonCtx.drawImage(rightStickLeft, 0, 0);
			if(rx < 0) buttonCtx.drawImage(rightStickRight, 0, 0);
			if(ry > 0) buttonCtx.drawImage(rightStickDown, 0, 0);
			if(ry < 0) buttonCtx.drawImage(rightStickUp, 0, 0);
		}
	}

	//start/select
	if(pad.buttons[9].pressed) buttonCtx.drawImage(startButton, 0, 0);
	if(pad.buttons[8].pressed) buttonCtx.drawImage(selectButton, 0, 0);

	//face buttons
	if(pad.buttons[0].pressed) buttonCtx.drawImage(bottomButton, 0, 0);
	if(pad.buttons[1].pressed) buttonCtx.drawImage(rightButton, 0, 0);
	if(pad.buttons[2].pressed) buttonCtx.drawImage(leftButton, 0, 0);
	if(pad.buttons[3].pressed) buttonCtx.drawImage(topButton, 0, 0);
	
	//trigger arcs
	if(isPad()){
		uncoloredCtx.drawImage(leftTrigger, 
			0, triggerArcHeight*pad.buttons[6].value, width, height-triggerArcHeight*pad.buttons[6].value, //clip rectangle
			0, triggerArcHeight*pad.buttons[6].value, width, height-triggerArcHeight*pad.buttons[6].value);//display rectangle
		uncoloredCtx.drawImage(rightTrigger, 
			0, triggerArcHeight*pad.buttons[7].value, width, height-triggerArcHeight*pad.buttons[7].value, //clip rectangle
			0, triggerArcHeight*pad.buttons[7].value, width, height-triggerArcHeight*pad.buttons[7].value);//display rectangle
	}else{
		if(pad.buttons[6].pressed)
			buttonCtx.drawImage(leftTrigger, 0, 0);
		
		if(controllerGeo === Rectangle){
			if(pad.buttons[7].value >= 140/255){
				buttonCtx.drawImage(rightTrigger, 0, 0);
			}else if(pad.buttons[7].value >= 94/255){
				buttonCtx.drawImage(rightTriggerMid, 0, 0);
			}else if(pad.buttons[7].value >= 49/255){
				buttonCtx.drawImage(rightTriggerLight, 0, 0);
			}
		}else if(pad.buttons[7].pressed){
			buttonCtx.drawImage(rightTrigger, 0, 0);
		}
	}
}

function setRecoloredCanvasColor(color){
	let multiplicand = document.getElementById("multiplyMatrix");
	let multiplyColorMatrix = color[0]+" 0 0 0 0 0 "+color[1]+" 0 0 0 0 0 "+color[2]+" 0 0 0 0 0 "+color[3]+" 0";//multiply filter. Not gamma correct.
	multiplicand.setAttribute("values", multiplyColorMatrix);

	recoloredCanvas.className = "multiplicand";
}