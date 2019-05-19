//var nouns = ['airplane', 'bird', 'butterfly', 'castle', 'cloud', 'house', 'rainbow', 'star', 'tree', 'sun','moon'];
var nouns = ['sun'];
var doodles = {};

var sky_background = 0;
var day_time = 0;


function preload(){
	for(var i = 0; i < nouns.length; i++){
		var data = loadStrings("assets/" + nouns[i] + ".txt");
		doodles[nouns[i]] = new doodleObject(data, 0, windowHeight, 0.25);
	}

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	console.log("set up")
}

function draw() {

	if(frameCount % 10 == 0){

		background(sky_background)

		// Refresh all elements in environment
		doodles[nouns[0]].refreshDrawing(sky_background);

		// Sun Behavior - if sun is present in story.
		sun(doodles['sun']);


		//noLoop()
	}

}


// *****************************************************************************

// Functions for Behaviors of different doodle_objects
function sun(noun_object){

	day_time = 1;
	sky_background += 5;
	if(sky_background > 200){
		sky_background = 200;
	}

	if(noun_object.status == 0){
		console.log("Adding in behavior")
		// Add the type of move :straight_move
		noun_object.moves.enqueue(createVector(windowWidth/3, 0));
		straight_move(noun_object, windowWidth/3, 0);
	}
	/*
	if(noun_object.status == 0){
		straight_move(noun_object, windowWidth*2/3, 0);
	}
	if(noun_object.status == 0){
		conole.log("3rd move")
		straight_move(noun_object, windowWidth, windowHeight);
	}*/


	//straight_move(noun_object, windowWidth*2/3, 0);

	//straight_move(noun_object, windowWidth, windowHeight);

	day_time = 0;
}


// *****************************************************************************

// Functions for Basic Utils of Behavior
function straight_move(noun_object, x, y){

  if(x > windowWidth || y > windowHeight){
		noun_object.status = 0;
    return;
  }

	if(abs(noun_object.x - x) < 5 && abs(noun_object.y - y) < 5){
			//console.log("reached");
			noun_object.status = 0;
			noun_object.vx = 0;
			noun_object.vy = 0;
	}
	else{
	noun_object.status = 1;
	noun_object.nextStop.x = x;
	noun_object.nextStop.y = y;

	 //console.log("moving")
	noun_object.vy = noun_object.pace * abs((y - noun_object.y)/(x - noun_object.x)) * (y - noun_object.y)/abs(y - noun_object.y);
  noun_object.vx = noun_object.pace * (x - noun_object.x)/abs(x - noun_object.x);
  }

	if(abs(noun_object.x - x) < 5){
		noun_object.vx = 0;
	}

	if(abs(noun_object.y - y) < 5){
		noun_object.vy = 0;
	}

}
