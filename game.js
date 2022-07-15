// para dins de criação
var log = console.log;



const width = window.innerWidth,
  height = window.innerHeight;

let canvas = document.getElementById("canvas");
let scene = new Scene();
let view = new View();

canvas.width = width;
canvas.height = height;
scene.setViewport({ width: width, height: height, x: 0, y: 0 });
scene.getCamera().setPosition(0, 2, -5);
view.setFPS(60);
view.setScene(scene);
view.setCanvas(canvas);

var cube = Textures.createCube();
var pyramid = Textures.createPyramid();
var plane = Textures.createPlane(10, 10);

scene.addItem(cube, 0, 0, 0);
scene.addItem(cube.clone(), -7, 0, 0);
scene.addItem(pyramid, 7, 0, 0);

view.frameAnimation(() => {
  //cube.rotate(0, 0.01, 0, 0);
  //pyramid.rotate(0, 0.01, 0);
  //scene.getCamera().rotate(0, 0, 0.01);
  scene.render();
  view.render();
});


canvas.onkeydown = function(e){
  
  switch(e.keyCode){ 
    case 37:
      scene.getCamera().translate(-1, 0, 0);
    break;
    
    case 39:
      scene.getCamera().translate(1, 0, 0);
    break;
    
    case 38:
      scene.getCamera().translate(0, 0, 1);
    break;
    
    case 40:
      scene.getCamera().translate(0, 0, -1);
    break;
    
    case 87:
      scene.getCamera().translate(0, 1, 0);
    break;
    
    case 83:
      scene.getCamera().translate(0, -1, 0);
    break;
    
  };
};

var start = {x:0, y:0};
var move = false;
velocity = 0.02;

canvas.onmousedown = function(e){
  start.x = e.clientX;
  start.y = e.clientY;
  move = true;
}

canvas.onmousemove = function(e){
  if(!move)return;
  var posX = (e.clientX > start.x) ? 1 : -1;
  var posY = (e.clientY < start.y) ? 1 : -1;                                                
  scene.getCamera().rotate(posY * velocity, -posX * velocity, 0);
  start.x = e.clientX;
  start.y = e.clientY;
}

canvas.onmouseup = function(e){
  move = false;
}
