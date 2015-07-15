var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var shapeChoice = document.getElementById('shape-choice');

//draw square
//fillRect(x, y, width, height)
function drawSquare(x,y,w) {
ctx.fillStyle = 'blue';
ctx.fillRect(x-w/2, y-w/2, w, w);
}

//draw circle
//arc(x, y, radius, startAngle, endAngle, anticlockwise);
function drawCircle(x, y) {
ctx.beginPath();
ctx.fillStyle = 'green';
ctx.arc(x, y, 50, 0, Math.PI*2, false);
ctx.fill();
}

function onClick(event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  // alert('you clicked at ' + x + ', ' + y);
  if (shapeChoice.value === 'square') {
    drawSquare(x,y,100);
  } else {
    drawCircle(x,y);
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
