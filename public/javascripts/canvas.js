var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var shapeChoice = document.getElementById('shape-choice');
var shapeWidth = document.getElementById('shape-width');
var shapeColor = document.getElementById('color-choice');
var eraseSquares = document.getElementById('eraseSquares');
var eraseCircles = document.getElementById('eraseCircles');
var recolorSquares = document.getElementById('recolorSquares');
var recolorCircles = document.getElementById('recolorCircles');
var eraseAll = document.getElementById('eraseAll');
var randomFill = document.getElementById('randomFill');
var randomMove = document.getElementById('randomMove');
var stopMove = document.getElementById('stopMove');
var raf = window.requestAnimationFrame;
var squareArray = [];
var circleArray = [];
var shapesArray = [];


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

Square.prototype.recolor = function (color) {
  ctx.fillStyle = color;
  ctx.fillRect(this.x-this.w/2, this.y-this.w/2, this.w, this.w);
};

Square.prototype.update = function () {
    var dx = Math.floor(Math.random()*(21))-10;
    var dy = Math.floor(Math.random()*(21))-10;
    if(this.x + dx < 0 || this.x + dx > 500) dx=-dx;
    if(this.y + dy < 0 || this.y + dy > 500) dy=-dy;
    this.x += dx;
    this.y += dy;
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

Circle.prototype.recolor = function (color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(this.x, this.y, this.w/2, 0, Math.PI*2, false);
  ctx.fill();
};

Circle.prototype.update = function () {
    var dx = Math.floor(Math.random()*(21)) - 10;
    var dy = Math.floor(Math.random()*(21)) - 10;
    if(this.x + dx < 0 || this.x + dx > 500) dx=-dx;
    if(this.y + dy < 0 || this.y + dy > 500) dy=-dy;
    this.x += dx;
    this.y += dy;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.w/2, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
};

function drawShape(x, y, w, color) {
  if (shapeChoice.value === 'square') {
    var square = new Square(x,y,w, color);
    square.draw();
    squareArray.push(square);
    shapesArray.push(square);
  } else {
    var circle = new Circle(x,y,w, color);
    circle.draw();
    circleArray.push(circle);
    shapesArray.push(circle);
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

function recolor(shapeArray, color) {
  shapeArray.forEach(function (shape) {
    shape.recolor(color);
  });
}


recolorSquares.addEventListener('click', function () {
  recolor(squareArray, shapeColor.value);
});

recolorCircles.addEventListener('click', function () {
  recolor(circleArray, shapeColor.value);
});


randomFill.addEventListener('click', function () {
  for (var i = 0; i < 100; i++) {
    var color = '#' + Math.floor(Math.random()*16777215).toString(16);
    var w = Math.floor(Math.random()*(canvas.width/2));
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


//MOVE SHAPES

function move() {
  canvas.width = canvas.width;
  canvas.height = canvas.height;

shapesArray.forEach(function (shape) {
  shape.update();
});
}

var intervalSet;

randomMove.addEventListener('click', function () {
    intervalSet = setInterval(move, 10);
});

stopMove.addEventListener('click', function () {
  clearInterval(intervalSet);
});

eraseSquares.addEventListener('click', function () {
  clearInterval(intervalSet);
  recolor(squareArray, 'white');
});

eraseCircles.addEventListener('click', function () {
  clearInterval(intervalSet);
  recolor(circleArray, 'white');
});

eraseAll.addEventListener('click', function () {
  clearInterval(intervalSet);
  canvas.width = canvas.width;
  canvas.height = canvas.height;
});
