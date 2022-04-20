
var cos = Math.cos, sin = Math.sin, round = Math.round, PI = Math.PI;  
var print = function(msg){document.getElementById("print").innerHTML = msg + "<br/>";};
document.body.style.margin = 0;

//objects
var textures = new Textures();
var plane = textures.plane(30, 30);
var cube = textures.cube();
var pyramid = textures.pyramid();
plane.scale(2, 2, 2);
plane.style = ["lines", [0, 255, 255] , 0.5];
cube.style = ["solid", [255, 255, 0] , 0.5];
cube.scale(0.5, 0.5, 0.5);
pyramid.style = ["solid", [255, 255, 0] , 0.5];

//configs
var cv = document.getElementById("base");
var controll = new Controll();
var scene = new Scene();
var view = new View();
cv.width = window.innerWidth, cv.height = 800;  
controll.width = cv.width;
controll.height = cv.height;
controll.onfull = document.getElementById("play");
controll.start();
scene.viewport.width = cv.width;
scene.viewport.heigth = cv.height;
scene.camera.translate(0, 3, -2);
scene.camera.rotate(0, 0, 0);
view.canvas = cv;
view.scene = scene;

//add objects
scene.push(plane, [0, 0, 0]);
scene.push(cube, [0, 0, 3]);
scene.push(pyramid, [-3, 0, 0]);

//start animation
window.setInterval(
 function(){
  view.render(true);
  
  var lookat = scene.camera.getLookat();
  
  var c = cos(lookat[1]), s = sin(lookat[1]);
  var x = controll.direction.x * 0.1, y = -controll.gravity * 0.1, z = controll.direction.y * 0.1;
  scene.camera.translate((x*c) + (z*s), y, (x*s) + (-z*c));
  
  var c = cos(lookat[0]), s = sin(lookat[0]);
  var x = -controll.lookat.x * 0.01, y = controll.lookat.y * 0.01;
  scene.camera.rotate(y, x * c, x * s);
  
  cube.rotate(0, 0.005, 0);
  pyramid.rotate(0, 0.005, 0);
  
 }, 1000 / 60);

