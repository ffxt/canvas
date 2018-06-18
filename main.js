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

brush_button.onclick = function() {
  mode = 'painting';
  console.log(mode);
};


var lastPoint = {
  x: null,
  y: null
}

//特性检测
if(document.body.ontouchstart !== undefined){
  canvas.ontouchstart = function(event) {
    console.log('touch start');
    clicked = true;
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    console.log(x, y)
    switch(mode){
      case 'painting':
        lastPoint.x = x;
        lastPoint.y = y;
        break;
      case 'eraser':
        eraser(x, y);
        break;
      default: 
        break;
    }
  }
  
  canvas.ontouchmove = function(event) {
    console.log('touch move');
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
    console.log(x, y)
    if(clicked){
      switch(mode){
        case 'painting':
          var x = x;
          var y = y;
          drawLine(lastPoint.x, lastPoint.y, x, y);
          var newPoint = {x: x, y: y};
          lastPoint = newPoint;
          break;
        case 'eraser':
          var x = x;
          var y = y;
          eraser(x, y);
          break;
        default: 
          break;
      }
    }
  }
  
  canvas.ontouchend = function(event) {
    console.log('touch end');
    clicked = false;
  }
}

else {  
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
    console.log("mouse down");
  }
  
  canvas.onmouseup = function(event) {
    clicked = false;
    console.log("mouse up");
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
    console.log("mouse move");
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

