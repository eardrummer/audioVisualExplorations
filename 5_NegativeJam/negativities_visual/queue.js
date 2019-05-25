
class Queue{
  constructor(){
    this.items = [];
  }

  enqueue(element){
    this.items.push(element);
  }

  dequeue(){
    if(this.isEmpty()){
      console.log("underflow in queue");
      return "underflow"
    }
    return this.items.shift();
  }

  front(){
    //returns the front element of the Queue
    if(this.isEmpty()){
      return "No elements"
    }
    return this.items[0];
  }

  isEmpty(){
    return this.items.length == 0;
  }

  printQueue(){
    var str = "";
    for(var i = 0; i < this.items.length; i++)
      str += this.items[i] + " ";
    return str;
  }
}
