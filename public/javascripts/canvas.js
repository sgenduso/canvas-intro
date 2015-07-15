var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var shapeChoice = document.getElementById('shape-choice');
var shapeWidth = document.getElementById('shape-width');
var shapeColor = document.getElementById('color-choice');

function Shape(x,y,w,color) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.color = color;
}

function Square(x, y, w, color) {
  Shape.call(this, x, y, w, color);
}

Square.prototype = new Shape();

Square.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x-this.w/2, this.y-this.w/2, this.w, this.w);
};

function Circle(x, y, w, color) {
  Shape.call(this, x, y, w, color);
}

Circle.prototype = new Shape();

Circle.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.w/2, 0, Math.PI*2, false);
  ctx.fill();
};

function onClick(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  var w = shapeWidth.value;
  var color = shapeColor.value;
  if (shapeChoice.value === 'square') {
    var square = new Square(x,y,w, color);
    square.draw();
  } else {
    var circle = new Circle(x,y,w, color);
    circle.draw();
  }
}

canvas.addEventListener('click', onClick);


//draw triangle
// ctx.fillStyle = 'yellow';
// ctx.beginPath();
// ctx.moveTo(350, 50);
// ctx.lineTo(350, 150);
// ctx.lineTo(450, 150);
// ctx.closePath();
// ctx.fill();
