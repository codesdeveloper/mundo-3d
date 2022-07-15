const width = 400,
  height = 400;

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

scene.addItem(cube, 3, 3, 0);
cube.clone().getPosition();
scene.addItem(cube.clone());
scene.addItem(pyramid, 2, 2, 0);

view.frameAnimation(() => {

  cube.rotate(0.01, 0, 0);
  scene.render();

  view.render();
});
