class doodleObject{

  constructor(doodle_objects, x, y, scale){
    this.objects = doodle_objects;
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.currentDoodleIndex = 0;
  }

  refreshDrawing(newDoodle){

    if(newDoodle == true){
      this.currentDoodleIndex = int(random(this.objects.length));
    }

    var doodle_object =  this.objects[this.currentDoodleIndex];
    var doodle_json = JSON.parse(doodle_object);
    //console.log(doodle_json);

    if(doodle_json.recognized == false){
        this.refreshDrawing(newDoodle);
    }

    noFill(0);
    stroke(0);
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
  }

  setDoodleParameters(x, y, scale){
    this.x = x;
    this.y = y;
    this.scale = scale;

  }
}
