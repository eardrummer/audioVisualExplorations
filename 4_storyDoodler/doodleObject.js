class doodleObject{

  constructor(doodle_objects, x, y, scale){

    this.objects = doodle_objects;
    this.x = x;
    this.y = y;
    this.scale = scale;

    this.nextStop = createVector(this.x, this.y);
    this.vx = 0;
    this.vy = 0;
    this.pace = 10;
    this.status = 0;

    this.moves = new Queue();

  }

  refreshDrawing(sky_background){

      var doodle_object =  this.objects[int(random(this.objects.length))];
      var doodle_json = JSON.parse(doodle_object);
      //console.log(doodle_json);

      if(doodle_json.recognized == false){
        this.refreshDrawing(sky_background);
      }

      //draw(doodle_json.drawing, sky_background)
      noFill(0);
    	stroke(200 - sky_background);
    	strokeWeight(3);

    	beginShape();

    	for(let path of doodle_json.drawing){
    		for(let i = 0; i < path[0].length; i++){
    			let x = path[0][i] * this.scale;
    			let y = path[1][i] * this.scale;
    			vertex(int(x + this.x), int(y + this.y));
    		}
    	}

      endShape();

      this.x += this.vx;
      this.y += this.vy;

      if(abs(this.x - this.nextStop.x) < 5 && abs(this.y - this.nextStop.y) < 5){
          //console.log("reached");

          if(!this.moves.isEmpty()){
            this.moves.dequeue();
          }

          this.status = 0;
          this.vx = 0;
          this.vy = 0;
      }
      if(abs(this.x - this.nextStop.x) < 5){
          this.vx = 0;
      }

      if(abs(this.y - this.nextStop.y) < 5){
          this.vy = 0;
      }

      // Update the drawing based on current Move
      if(!this.moves.isEmpty()){
        console.log("should add move");
        this.nextStop = this.moves.front();
        straight_move(this, this.nextStop.x, this.nextStop.y);
      }

  }
}
