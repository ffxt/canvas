var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

setCanvas();
window.onresize = setCanvas;
function setCanvas() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

var mode = 'painting';
var clicked = false;

eraser_button.onclick = function() {
  mode = 'eraser';
  console.log(mode);
};

var lastPoint = {
  x: null,
  y: null
}

function drawDot(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
}

canvas.onmousedown = function(event) {
  clicked = true;
  switch(mode){
    case 'painting':
      lastPoint.x = event.clientX;
      lastPoint.y = event.clientY;
      break;
    case 'eraser':
      eraser(event.clientX, event.clientY);
      break;
    default: 
      break;
  }
}

canvas.onmouseup = function(event) {
  clicked = false;
}

canvas.onmousemove = function() {
  if(clicked){
    switch(mode){
      case 'painting':
        var x = event.clientX;
        var y = event.clientY;
        drawLine(lastPoint.x, lastPoint.y, x, y);
        var newPoint = {x: x, y: y};
        lastPoint = newPoint;
        break;
      case 'eraser':
        var x = event.clientX;
        var y = event.clientY;
        eraser(x, y);
        break;
      default: 
        break;
    }
  }
}

function drawLine(x1, y1, x2, y2){
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function eraser(x, y){
  context.clearRect(x - 5, y - 5, 10, 10);
}
