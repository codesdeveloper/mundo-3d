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

Util.addController(scene.getCamera(), canvas);

view.frameAnimation(() => {
  // cube.rotate(0, 0.01, 0, 0);
  
  scene.getCamera().translate(controllConfig.translate.x, controllConfig.translate.y, controllConfig.translate.z);
   scene.getCamera().rotate(controllConfig.rotate.x, controllConfig.rotate.y, controllConfig.rotate.z);
  pyramid.rotate(0, 0.01, 0);
  
  scene.render();
  view.render();
});




