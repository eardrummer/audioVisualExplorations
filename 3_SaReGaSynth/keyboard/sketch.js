var note;
let off_img, on_img ;
let status = [];
var test;

var blackKeys = [1, 3, 6, 8, 10];
var whiteKeys = [0, 2, 4, 5, 7, 9, 11];
var blackKeyOffsets = [0.5, 1.5, 3.5, 4.5, 5.5];

var xAxisScale;


function setup() {

	createCanvas(windowWidth, windowHeight);

	for(var i = 0; i < 12; i++){
		status[i] = 0;
	}

  off_img = loadImage("assets/m_face_closed.jpg");
	on_img = loadImage("assets/m_face_open.jpg");

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


		// Note off
		if(status[whiteKeys[i]] == 0){
			image(off_img, 200 + i*xAxisScale, 300, off_img.width/10, off_img.height/10);
		}
		// Note on
		else if(status[whiteKeys[i]]  == 1){
			image(on_img, 190 + i*xAxisScale , 280, on_img.width/8, on_img.height/8);
		}
	}

  // BLACK KEYS
	for(var i = 0; i < blackKeys.length; i++){
		// Note off
		if(status[blackKeys[i]] == 0){
			image(off_img, 200 + (blackKeyOffsets[i]* xAxisScale), 150, off_img.width/10, off_img.height/10);
		}
		// Note on
		else if(status[blackKeys[i]]  == 1){
			image(on_img, 190 + (blackKeyOffsets[i] * xAxisScale) ,100, on_img.width/8, on_img.height/8);
		}
	}

}
