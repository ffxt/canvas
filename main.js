var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

setCanvas();
window.onresize = setCanvas;
function setCanvas() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  context.strokeStyle = 'red';
  context.lineWidth = 5;
}

var mode = 'painting';
var clicked = false;

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
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function eraser(x, y){
  context.clearRect(x - 5, y - 5, 10, 10);
}

eraser_svg.onclick = function() {
  eraser_svg.classList.add('active');
  brush_svg.classList.remove('active');
  mode = 'eraser';
  console.log(mode);
};

brush_svg.onclick = function() {
  eraser_svg.classList.remove('active');
  brush_svg.classList.add('active');
  mode = 'painting';
  console.log(mode);
};

eraser_svg.onclick = function() {
  eraser_svg.classList.add('active');
  brush_svg.classList.remove('active');
  mode = 'eraser';
  console.log(mode);
};

garbage_svg.onclick = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
};




red.onclick = function(){
  red.classList.add('active');
  blue.classList.remove('active');
  green.classList.remove('active');
  context.strokeStyle = 'red'
}

green.onclick = function(){
  red.classList.remove('active');
  blue.classList.remove('active');
  green.classList.add('active');
  context.strokeStyle = 'green'
}

blue.onclick = function(){
  red.classList.remove('active');
  blue.classList.add('active');
  green.classList.remove('active');
  context.strokeStyle = 'blue'
}

thin.onclick = function(){
  context.lineWidth = 5;
  thin.classList.add('active');
  thick.classList.remove('active');
}

thick.onclick = function(){
  context.lineWidth = 10;
  thick.classList.add('active');
  thin.classList.remove('active');
}

