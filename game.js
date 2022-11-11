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
scene.setViewport({ width: width, height: height, x: 0, y: 0 });
//scene.getCamera().setPosition(0, 0, -4);
view.setFPS(60);
view.setScene(scene);
view.setCanvas(canvas);
control.init();

//Definir objetos
var cube = Textures.createCube();
var pyramid = Textures.createPyramid();
//var plane = Textures.createPlane(70, 70);

//Configurações dos objetos
//plane.setStyle({ color: [255, 255, 25], size: 10, type: Entity.TYPELINES});
cube.setStyle({ color: [0, 0, 255], size: 50, type: Entity.TYPEPOLYGONUS});

//Adicionar itens no layout
//scene.addItem(plane, 0, -1, 0);
scene.addItem(cube, 0, -1, 5);

//Start animação
view.frameAnimation(() => {
  control.lookat = scene.getCamera().getLookat();
  var trans = control.translate;
  var rot = control.rotate;
  scene.getCamera().translate(trans.x * 0.3, trans.y * 0.3, trans.z * 0.5);
  scene.getCamera().rotate(rot.x * 0.1, rot.y * 0.1, rot.z * 0.1);
   //cube.rotate(0, 0.02, 0);
  scene.render();
  view.render();
  //view.stopAnimation();

  let pos = scene.getCamera().getPosition();
  //control.toast("x: " + Math.round(pos.x) + ", y: " + Math.round(pos.y) + ", z: " +  Math.round(pos.z));
});


