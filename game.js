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
//scene.getCamera().setPosition(0, 0, -4);
view.setFPS(60);
view.setScene(scene);
view.setCanvas(canvas);
control.init();

//Definir objetos
var cube = Textures.createCube();
//var pyramid = Textures.createPyramid();
var plane = Textures.createPlane(120, 120);
var sofa = Itens_Textures.createSofa();

//Configurações dos objetos
plane.setStyle({ color: [255, 255, 25], size: 10, type: Entity.TYPEPOLYGONUS, twoSides: false});
sofa.setStyle({ color: [10, 10, 255], size: 50, type: Entity.TYPEPOINTS, twoSides: true, shine: 0.6});

plane.scale(2, 2, 2);

//Adicionar itens no layout
//scene.addItem(plane, 0, -1, 0);
scene.addItem(cube, 0, -1, 5);

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


