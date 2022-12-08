//Definição de variaveis
const width = window.innerWidth;
const height = window.innerHeight;
const canvas = document.getElementById("canvas");
const scene = new Scene();
const control = new Control(scene);
const view = new View();

// Configurações do game
canvas.width = width;
canvas.height = height;
scene.setViewport({ width: width, height: height, x: 0, y: 0, z: 100});
scene.getCamera().setPosition(0, 12, -29);
scene.getCamera().rotate(-0.4, 0, 0);
view.setFPS(60);
view.setScene(scene);
view.setCanvas(canvas);
control.init();

//Definir objetos
var cube = Textures.createCube();
//var pyramid = Textures.createPyramid();
var plane = Textures.createPlane(80, 80);
var sofa = Itens_Textures.createSofa();

//Configurações dos objetos
plane.setStyle({ color: [0, 25, 0], size: 10, type: Entity.TYPEPOLYGONUS, twoSides: false});
cube.setStyle({ color: [255, 0, 0], size: 50, type: Entity.TYPEPOLYGONUS, twoSides: true, shine: 0.6});

plane.setScale(4, 4, 4);

//Adicionar itens no layout
//scene.addItem(plane, 0, -1, 20);

scene.addItem(cube.clone(), -2, -1, 2);
scene.addItem(cube.clone(), 0, -1, 2);
scene.addItem(cube.clone(), 2, -1, 2);

scene.addItem(cube.clone(), -2, -1, 0);
scene.addItem(cube.clone(), 0, -1, 0);
scene.addItem(cube.clone(), 2, -1, 0);

scene.addItem(cube.clone(), -2, -1, -2);
scene.addItem(cube.clone(), 0, -1, -2);
scene.addItem(cube.clone(), 2, -1, -2);

//Start animação
view.frameAnimation(() => {
  control.lookat = scene.getCamera().getLookat();
  var trans = control.translate;
  var rot = control.rotate;
  scene.getCamera().translate(trans.x, trans.y, trans.z);
  scene.getCamera().rotate(rot.x * 0.5, rot.y * 0.5, rot.z * 0.5);
   //cube.rotate(0, 0.02, 0);
  scene.render();
  view.render();
  //view.stopAnimation();

  let pos = scene.getCamera().getPosition();
  control.toast("x: " + Math.round(pos.x) + ", y: " + Math.round(pos.y) + ", z: " +  Math.round(pos.z));
});


