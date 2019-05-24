class nodes{
  constructor(x, y, quality, size){
    this.x = x;
    this.y = y;
    //this.faded = 1;
    this.size = size;
    this.quality = quality
    if(this.quality == 1){
      this.color = color(10, random(50,200), 10);
    }
    else if(this.quality == 2){
      this.color = color(130 + random(40), 60 + random(30), 15 + random(30));
    }
  }

  draw(){

    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}
