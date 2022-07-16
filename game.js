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
scene.getCamera().setPosition(0, 2, -6);
view.setFPS(60);
view.setScene(scene);
view.setCanvas(canvas);

var cube = Textures.createCube();
var pyramid = Textures.createPyramid();
var plane = Textures.createPlane(70, 70);

plane.setStyle({color: [255, 255, 255], size: 10, type: Entity.TYPELINES});
cube.setStyle({color: [0, 0, 255], size: 10, type: Entity.TYPELINES});
pyramid.getStyle().color = [255, 255, 255];
pyramid.getStyle().type = Entity.TYPELINES;

scene.addItem(plane, 0, -1, 0);
scene.addItem(cube, 0, 0, 0);
scene.addItem(cube.clone(), -7, 0, 0);
scene.addItem(pyramid, 7, 0, 0);

view.frameAnimation(() => {
  // cube.rotate(0, 0.01, 0, 0);
  pyramid.rotate(0, 0.01, 0);
  scene.render();
  view.render();
});




var camera = cube;//scene.getCamera();
var lookat = camera.getLookat();

canvas.onkeydown = function(e){
  var c = Math.cos(lookat.y), s = Math.sin(lookat.y);
  switch(e.keyCode){ 
    case 37:
      camera.translate(-c, 0, -s);
    break;
    
    case 39:
      camera.translate(c, 0, s);
    break;
    
    case 38:
      camera.translate(-s, 0, c);
    break;
    
    case 40:  
      camera.translate(s, 0, -c);
    break;
    
    case 87:
      camera.translate(0, 1, 0);
    break;
    
    case 83:
      camera.translate(0, -1, 0);
    break;
    
  };
};

var start = {x:0, y:0};
var move = false;
velocity = 0.1;

canvas.onmousedown = function(e){
  start.x = e.clientX;
  start.y = e.clientY;
  move = true;
}

// camera.rotate(0, -Math.PI / 6, 0);

canvas.onmousemove = function(e){
  if(!move)return;
  var posX = (e.clientX < start.x) ? 1 : -1;
  var posY = (e.clientY > start.y) ? 1 : -1;    
  
  var c = Math.cos(lookat.y), s = Math.sin(lookat.y);
  
  print(c);
  
  camera.rotate(posY * velocity , 0, 0);
   camera.rotate(0, posX * velocity , 0);
  // camera.rotate(0, 0, posY * velocity * 0);
  
  start.x = e.clientX;
  start.y = e.clientY;
}

canvas.onmouseup = function(e){
  move = false;
}