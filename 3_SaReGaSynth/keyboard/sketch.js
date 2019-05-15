var note;
var note_name;
let off_img, on_img ;
let status = [];
var test;

var blackKeys = [1, 3, 6, 8, 10];
var whiteKeys = [0, 2, 4, 5, 7, 9, 11];
var blackKeyOffsets = [0.5, 1.5, 3.5, 4.5, 5.5];

var xAxisScale;
var image_closed_scaling = 3;
var image_open_scaling = 2;

var Sa_img, Re_img, Re_k_img, Ga_k_img, Ga_img, Ma_img, Ma_t_img, Pa_img, Dha_k_img, Dha_img, Ni_k_img, Ni_img;


function setup() {

	createCanvas(windowWidth, windowHeight);

	for(var i = 0; i < 12; i++){
		status[i] = 0;
	}

  //off_img = loadImage("assets/m_face_closed.jpg");
	//on_img = loadImage("assets/m_face_open.jpg");

	off_img = loadImage("assets/mixed_closed.png");
	on_img = loadImage("assets/mixed_open.png");


	Sa_img = loadImage("assets/Sa.jpeg");
	Re_img = loadImage("assets/Re.jpeg");
	Re_k_img = loadImage("assets/Re_k.jpeg");
	Ga_k_img = loadImage("assets/Ga_k.jpeg");
	Ga_img = loadImage("assets/Ga.jpeg");
	Ma_img = loadImage("assets/Ma.jpeg")
	Ma_t_img = loadImage("assets/Ma_t.jpeg")
	Pa_img = loadImage("assets/Pa.jpeg");
	Dha_k_img = loadImage("assets/Dha_k.jpeg");
	Dha_img = loadImage("assets/Dha.jpeg");
	Ni_k_img = loadImage("assets/Ni_k.jpeg");
	Ni_img = loadImage("assets/Ni.jpeg");

  xAxisScale = 100	;
	drawKeyboard();
}

function draw() {

	WebMidi.enable(function (err) {
    //console.log(WebMidi.inputs);
    //console.log(WebMidi.outputs);

		var input = WebMidi.getInputByName("VI49")
		input.addListener('noteon', "all", function(e) {
		console.log("Note value: " + e.note.name);
		status[int(e.note.number % 12)] = 1;
		drawKeyboard();
	 test = e;
		});

		input.addListener('noteoff', "all", function(e) {
		console.log("Note value: " + e.note.name);
	  status[int(e.note.number % 12)] = 0;
		drawKeyboard();
		});
});


	//noLoop();
}

function isWhiteKey(key){

	for(let i = 0; i < whiteKeys.length; i++){
		if(key == whiteKeys[i]){
			return 1;
		}
		return 0;
	}
}

function drawKeyboard(){
		background(0);

	// WHITE KEYS
	for(var i = 0; i < whiteKeys.length; i++){

		note_name = drawText(whiteKeys[i]);

		// Note off
		if(status[whiteKeys[i]] == 0){
			image(off_img, 200 + i*xAxisScale, 300, off_img.width/image_closed_scaling, off_img.height/image_closed_scaling);
		}
		// Note on
		else if(status[whiteKeys[i]]  == 1){

			image(on_img, 190 + i*xAxisScale , 250, on_img.width/image_open_scaling, on_img.height/image_open_scaling);
			tint(255, 70);
			image(note_name,190 + i*xAxisScale , 390, note_name.width * 0.2, note_name.height * 0.2);
			tint(255, 255);
		}
	}

  // BLACK KEYS
	for(var i = 0; i < blackKeys.length; i++){

		note_name = drawText(blackKeys[i]);

		// Note off
		if(status[blackKeys[i]] == 0){
			image(off_img, 190 + (blackKeyOffsets[i]* xAxisScale), 120, off_img.width/image_closed_scaling, off_img.height/image_closed_scaling);
		}
		// Note on
		else if(status[blackKeys[i]]  == 1){
			image(on_img, 185 + (blackKeyOffsets[i] * xAxisScale) ,70, on_img.width/image_open_scaling, on_img.height/image_open_scaling);
			tint(255, 70);
			image(note_name, 185 + (blackKeyOffsets[i] * xAxisScale) , 200,  note_name.width * 0.2, note_name.height * 0.2);
			tint(255, 255);
		}
	}

}

function drawText(note_number){

	if(note_number == 0){
		return Sa_img
	}
	else if(note_number == 1){
		return Re_k_img
	}
	else if(note_number == 2){
		return Re_img
	}
	else if(note_number == 3){
		return Ga_k_img
	}
	else if(note_number == 4){
		return Ga_img
	}
	else if(note_number == 5){
		return Ma_img
	}
	else if(note_number == 6){
		return Ma_t_img
	}
	else if(note_number == 7){
		return Pa_img
	}
	else if(note_number == 8){
		return Dha_k_img
	}
	else if(note_number == 9){
		return Dha_img
	}
	else if(note_number == 10){
		return Ni_k_img
	}
	else if(note_number == 11){
		return Ni_img
	}
}
