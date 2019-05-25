var positiveNotes;
var negativeNotes;
var trunk_length = 40;

var tree_trunk_img;

var center;

function preload(){
  tree_trunk_img = loadImage("assets/tree.jpg");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  center = createVector(windowWidth/2, windowHeight * 2/3);

  positiveNotes = new Queue();
  negativeNotes = new Queue();
}

function draw(){

  background(0);
  stroke(255);

  // Line for trunk
  line(center.x, center.y, center.x, center.y - trunk_length);
  image(tree_trunk_img, center.x - 50, center.y - 60, 100, 100);

  // Straight line floor
  line(center.x - windowWidth/3, center.y, center.x + windowWidth/3, center.y);

  WebMidi.enable( function(err){

    console.log(WebMidi.inputs);

    var input = WebMidi.getInputByName('loopMIDI Port');

    input.addListener('noteon', 'all', function(e){
      addNode(e.note.number, e.rawVelocity, e.channel);
      //console.log(e)
    });
  });

  // Draw all notes currently in the Queue
  for(var i = 0; i < positiveNotes.items.length; i++){

    if(positiveNotes.items[i].faded > 50){
      stroke(255, 255, 255, positiveNotes.items[i].faded);
      line(center.x, center.y - trunk_length, positiveNotes.items[i].x, positiveNotes.items[i].y)
    }
    positiveNotes.items[i].draw();
  }

  for(var i = 0; i < negativeNotes.items.length; i++){

    if(negativeNotes.items[i].faded > 50){
      stroke(255, 255, 255, negativeNotes.items[i].faded);
      line(center.x, center.y, negativeNotes.items[i].x, negativeNotes.items[i].y)
    }
    negativeNotes.items[i].draw();
  }

  // Every 2 seconds dequeue half the elements
  if(frameCount % 120 == 0){

    for(var i = 0; i < positiveNotes.items.length/2; i++){
          positiveNotes.dequeue();
    }
    for(var i = 0; i < negativeNotes.items.length/2; i++){
          negativeNotes.dequeue();
    }
  }

  //Make the old notes fade
  if(frameCount % 10 == 0){
    for(var i = 0; i < positiveNotes.items.length; i++){
      positiveNotes.items[i].faded -= 30;
    }
    for(var i = 0; i < negativeNotes.items.length; i++){
      negativeNotes.items[i].faded -= 30;
    }
  }

}

function addNode(note, velocity, quality){

  var xPosition = random(-1 * windowWidth/3, windowWidth/3);

  // Then it is human played note
  if(quality == 1){

    var x = map(note, 36, 91, -windowWidth/3, windowWidth/3);
    var size = map(velocity, 0, 127, 20, 100);
    // 36 and 91 are the lowest and highest notes on my midi keyboard
    var y = map(note, 36, 91, trunk_length + 10, 500);

    var node = new nodes(center.x + xPosition, center.y - y, 1, size);
    positiveNotes.enqueue(node);
    //positiveNotes[positiveNotes.length] = new nodes(center.x + xPosition, center.y - y, 1, size);
  }

  // Then it is computer generated negative note
  else if(quality == 2){

        var x = map(note, 36, 91, -windowWidth/3, windowWidth/3);
        var size = map(velocity, 0, 127, 20, 100);
        // 36 and 91 are the lowest and highest notes on my midi keyboard
        var y = map(note, 36, 91, 220, 20);

        var node = new nodes(center.x - xPosition, center.y + y, 2, size);
        negativeNotes.enqueue(node);
        //negativeNotes[negativeNotes.length] = new nodes(center.x - xPosition, center.y + y, 2, size);


  }
}
