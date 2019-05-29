var objects = ['eye', 'nose', 'ear', 'mouth', 'circle'];
var doodles = {};

let video;
let poseNet;

let video2;

var eye, eye2, nose, mouth;

let startDoodling = false;

let xOffset = 30, yOffset = 20;

//const video = document.getElementById('video');
//const poseNet = ml5.poseNet(video, modelLoaded);

function preload(){
	for(var i = 0; i < objects.length; i++){
		var data = loadStrings("assets/" + objects[i] + ".txt");
		doodles[objects[i]] = new doodleObject(data, 0, 0, 0.25);
	}

	// Add a few more doodles for 2nd ear and eye
	data = loadStrings("assets/eye.txt");
	doodles["eye2"] = new doodleObject(data, 0, 0, 0.25);

	data = loadStrings("assets/ear.txt");
	doodles["ear2"] = new doodleObject(data, 0, 0, 0.25);

	eye = createVector(0,0);
	eye2 = createVector(0,0);
	nose = createVector(0,0);
	mouth = createVector(0,0);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	console.log("set up");

	video = createCapture(VIDEO);
	video.size(width, height);
	video.hide();

	video2 = createCapture(VIDEO);
	video2.hide();
	//console.log(ml5);

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function draw() {


		background(0);
		image(video2, 0, 0, width/3, height/3);
		//filter(THRESHOLD);

		//console.log("printing")

		if(startDoodling){

			let axis = eye.x - eye2.x;
			fill(100,100,100, 100);
			ellipse(nose.x, nose.y, 2* axis, 3* axis )

			doodles["eye"].setDoodleParameters(eye.x, eye.y, 0.25);
			doodles["eye2"].setDoodleParameters(eye2.x, eye2.y, 0.25);
			doodles["nose"].setDoodleParameters(nose.x, nose.y, 0.25);
			doodles["mouth"].setDoodleParameters(mouth.x, mouth.y, 0.45);

			doodles["eye"].refreshDrawing(false);
			doodles["eye2"].refreshDrawing(false);
			doodles["nose"].refreshDrawing(false);
			doodles["mouth"].refreshDrawing(false);

		}

		if(frameCount % 20 == 0){
			doodles["eye"].refreshDrawing(true);
			doodles["eye2"].refreshDrawing(true);
			doodles["nose"].refreshDrawing(true);
			doodles["mouth"].refreshDrawing(true);
		}

}

// Poset Net stuff

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

function gotPoses(poses){
	//console.log(poses);
	if(poses.length > 0){

		startDoodling = true;

		let newPoint = createVector(poses[0].pose.keypoints[1].position.x - xOffset, poses[0].pose.keypoints[1].position.y - yOffset);
		eye.set(lerp(eye.x, newPoint.x, 0.8), lerp(eye.y, newPoint.y, 0.8));


		newPoint = createVector(poses[0].pose.keypoints[2].position.x - xOffset, poses[0].pose.keypoints[2].position.y - yOffset);
		eye2.set(lerp(eye2.x, newPoint.x, 0.8), lerp(eye2.y, newPoint.y, 0.8));

		newPoint = createVector(poses[0].pose.keypoints[0].position.x - xOffset, poses[0].pose.keypoints[0].position.y - yOffset);
		nose.set(lerp(nose.x, newPoint.x, 0.8), lerp(nose.y, newPoint.y, 0.8));

		mouth.set(nose.x - 20, nose.y + 70);
	}
	else{
		startDoodling = false;
	}


}
