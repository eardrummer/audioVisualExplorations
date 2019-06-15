var coltraneImg;
var sourcePosition;

var emojiImgs = [];
var midiFlag = false;

function preload(){
	// TODO: Load all emoji images here
	coltraneImg = loadImage("assets/coltrane.jpg");


	for(var i = 0; i < 12; i++){

		emojiImgs[i] = loadImage("assets/" + str(i) + ".png");
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	sourcePosition = createVector(480, 470); // Posiiton seen from images

	emojiNotes = new Queue();
}

function draw() {
	background(0);
	tint(255,255);
	image(coltraneImg, 0, 0);


	WebMidi.enable( function(err){

    //console.log(WebMidi.inputs);
		if(midiFlag == false){

			midiFlag = true;

    	var input = WebMidi.getInputByName("MIDIIN2 (microKORG XL+)");
			console.log(input);

    	input.addListener('noteon', 'all', function(e){
    	addEmojiAtom(e.note.number, e.rawVelocity);
    	//console.log(e)
    });


		}
});


// Drawing the emojis Stuff

for(var i = 0; i < emojiNotes.items.length; i++){
	emojiNotes.items[i].draw();
	emojiNotes.items[i].move();

	if(emojiNotes.items[i].alpha < 5){
		emojiNotes.dequeue();
	}
}


if(frameCount % 10 == 0){
	for(var i = 0; i < emojiNotes.items.length; i++){
		emojiNotes.items[i].alpha -= 10;
	}
}

}

function addEmojiAtom(note, velocity){

		var node = new emojiAtom(sourcePosition.x + random(-2,2), sourcePosition.y, emojiImgs[note%12]);
		emojiNotes.enqueue(node);

}

// Testing for finding points on canvas
function mouseClicked(){
	console.log(mouseX, mouseY);
}
