var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var shapeChoice = document.getElementById('shape-choice');
var shapeWidth = document.getElementById('shape-width');
var shapeColor = document.getElementById('color-choice');
var eraseSquares = document.getElementById('eraseSquares');
var eraseCircles = document.getElementById('eraseCircles');
var eraseAll = document.getElementById('eraseAll');
var randomFill = document.getElementById('randomFill');
var squareArray = [];
var circleArray = [];

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

Square.prototype.erase = function () {
  ctx.fillStyle = 'white';
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

Circle.prototype.erase = function () {
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(this.x, this.y, this.w/2, 0, Math.PI*2, false);
  ctx.fill();
};

function drawShape(x, y, w, color) {
  if (shapeChoice.value === 'square') {
    var square = new Square(x,y,w, color);
    square.draw();
    squareArray.push(square);
  } else {
    var circle = new Circle(x,y,w, color);
    circle.draw();
    circleArray.push(circle);
  }
}

function onClick(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  var w = shapeWidth.value || 100;
  var color = shapeColor.value;
  drawShape(x, y, w, color);
}

canvas.addEventListener('click', onClick);

function erase(shapeArray) {
  shapeArray.forEach(function (shape) {
    shape.erase();
  });
}

eraseSquares.addEventListener('click', function () {
  erase(squareArray);
});

eraseCircles.addEventListener('click', function () {
  erase(circleArray);
});

eraseAll.addEventListener('click', function () {
  erase(squareArray);
  erase(circleArray);
});

randomFill.addEventListener('click', function () {
  for (var i = 0; i < 100; i++) {
    var color = Math.floor(Math.random()*16777215).toString(16);
    var width = Math.floor(Math.random()*(canvas.width));
    var x = Math.floor(Math.random()*(canvas.width));
    var y = Math.floor(Math.random()*(canvas.height));
    if (i%2 === 0) {
      shapeChoice.value = 'square';
    } else {
      shapeChoice.value = 'circle';
    }
    drawShape(x, y, w, color);
  }
});

//draw triangle
// ctx.fillStyle = 'yellow';
// ctx.beginPath();
// ctx.moveTo(350, 50);
// ctx.lineTo(350, 150);
// ctx.lineTo(450, 150);
// ctx.closePath();
// ctx.fill();
