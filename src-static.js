var mouse = {x: 0, y: 0};

var cV;
var ctx;

var isOn = false;
var isEraser = false;

function init() {
  
  var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
  
  cV = document.createElement("canvas");
  document.body.appendChild(cV);
  cV.style.position = "absolute";
  cV.style.pointerEvents = "none";
  cV.setAttribute("width", document.body.scrollWidth);
  cV.setAttribute("height", height);
  cV.style.zIndex = "9999";
  cV.style.left = "0";
  cV.style.top = "0";
  cV.style.right = "0";
  cV.style.bottom = "0";
  ctx = cV.getContext("2d");
  ctx.fillStyle = "black";
  
  window.addEventListener("resize",function(){
	var originW = cV.width;
  var originH = cV.height;
    var windW = document.body.scrollWidth;
    var windH = height;
  if (windW > originW && windH > originH) {
    var prev = ctx.getImageData(0,0,cV.width,cV.height);
    cV.width = windW;
    cV.height = windH;
    ctx.putImageData(prev,0,0);
  }
  });
  window.addEventListener("mousemove",function(e){
    if (isOn === false && isEraser === false){return}
    var rect = cV.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    if(isEraser === false){
    ctx.fillRect(mouse.x, mouse.y, 5, 5);
    }
    else{
      ctx.clearRect(mouse.x, mouse.y, 5, 5);
    }
  });
  window.addEventListener("keypress",function(e){
  var key = String.fromCharCode(e.keyCode).toLowerCase();
    if (key === "d"){
      isOn = !isOn;
      isEraser = false;
    }
    else if(key === "c"){
      ctx.fillStyle = prompt("Please enter a color below:");
    }
    else if(key === "e"){
      isEraser = !isEraser;
      isOn = false;
    }
  });
}

init()
