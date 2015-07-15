var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var shapeChoice = document.getElementById('shape-choice');
var shapeWidth = document.getElementById('shape-width');
var shapeColor = document.getElementById('color-choice');

//draw square
//fillRect(x, y, width, height)
function drawSquare(x,y,w, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x-w/2, y-w/2, w, w);
}

//draw circle
//arc(x, y, radius, startAngle, endAngle, anticlockwise);
function drawCircle(x, y, w, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, w/2, 0, Math.PI*2, false);
  ctx.fill();
}

function onClick(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  var w = shapeWidth.value;
  var color = shapeColor.value;
    if (shapeChoice.value === 'square') {
    drawSquare(x,y,w, color);
  } else {
    drawCircle(x,y,w, color);
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
