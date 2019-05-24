var positiveNotes = [];
var negativeNotes = [];
var trunk_length = 40;

var center;

function setup(){
  createCanvas(windowWidth, windowHeight);
  center = createVector(windowWidth/2, windowHeight * 2/3);
}

function draw(){

  background(0);
  stroke(255);
  line(center.x, center.y, center.x, center.y - trunk_length);
  line(center.x - windowWidth/3, center.y, center.x + windowWidth/3, center.y);

  WebMidi.enable( function(err){

    console.log(WebMidi.inputs);

    var input = WebMidi.getInputByName('loopMIDI Port');

    input.addListener('noteon', 'all', function(e){
      addNode(e.note.number, e.rawVelocity, e.channel);
      //console.log(e)
    });
  });


  // Draw the notes
  for(var i = 0; i < positiveNotes.length; i++){
    stroke(255);
    line(center.x, center.y - trunk_length, positiveNotes[i].x, positiveNotes[i].y);
    positiveNotes[i].draw();
  }

  for(var i = 0; i < negativeNotes.length; i++){
    stroke(255);
    line(center.x, center.y, negativeNotes[i].x, negativeNotes[i].y);
    negativeNotes[i].draw();
  }
}

function addNode(note, velocity, quality){

  var xPosition = random(-1 * windowWidth/3, windowWidth/3);

  // Then it is human played note
  if(quality == 1){

    var x = map(note, 36, 91, -windowWidth/3, windowWidth/3);
    var size = map(velocity, 0, 127, 20, 100);
    // 36 and 91 are the lowest and highest notes on my midi keyboard
    var y = map(note, 36, 91, trunk_length, 500);

    positiveNotes[positiveNotes.length] = new nodes(center.x + xPosition, center.y - y, 1, size);
  }

  // Then it is computer generated negative note
  else if(quality == 2){

        var x = map(note, 36, 91, -windowWidth/3, windowWidth/3);
        var size = map(velocity, 0, 127, 20, 100);
        // 36 and 91 are the lowest and highest notes on my midi keyboard
        var y = map(note, 36, 91, 220, 20);

        negativeNotes[negativeNotes.length] = new nodes(center.x - xPosition, center.y + y, 2, size);


  }
}
