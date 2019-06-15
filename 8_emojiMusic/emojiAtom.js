class emojiAtom{
  constructor(x, y, img){
    this.x = x;
    this.y = y;
    this.alpha = 255;
    this.img = img
  }

  move(){
    this.x += 4;
    this.y += random(-10, 10);
  }

  draw(){
    tint(255, this.alpha);
    image(this.img, this.x, this.y, 40, 40);
  }

}
