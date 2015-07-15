var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var onClick = function (event) {
  var x = event.clientX - canvas.offsetLeft;
  var y = event.clientY - canvas.offsetTop;
  alert('you clicked at ' + x + ', ' + y);
};

canvas.addEventListener('click', onClick);

//draw square
//fillRext(x, y, width, height)
ctx.fillStyle = 'blue';
ctx.fillRect(200, 50, 100, 100);

//draw circle
//arc(x, y, radius, startAngle, endAngle, anticlockwise);
ctx.fillStyle = 'green';
ctx.arc(100, 100, 50, 0, Math.PI*2, false);
ctx.fill();

//draw triangle
ctx.fillStyle = 'yellow';
ctx.beginPath();
ctx.moveTo(350, 50);
ctx.lineTo(350, 150);
ctx.lineTo(450, 150);
ctx.closePath();
ctx.fill();
