// para dins de criação
var log = console.log;


//Definição de variaveis
const width = window.innerWidth,
  height = window.innerHeight;
let canvas = document.getElementById("canvas");
let scene = new Scene();
let view = new View();
//Configurações do game
canvas.width = width;
canvas.height = height;
scene.setViewport({ width: width, height: height, x: 0, y: 0 });
scene.getCamera().setPosition(0, 2, -6);
view.setFPS(60);
view.setScene(scene);
view.setCanvas(canvas);
Util.addController(scene.getCamera(), canvas);
//Definir objetos
var cube = Textures.createCube();
var pyramid = Textures.createPyramid();
var plane = Textures.createPlane(70, 70);
var cube2 = cube.clone();
//Configurações dos objetos
plane.setStyle({color: [255, 255, 255], size: 10, type: Entity.TYPELINES});
cube.setStyle({color: [0, 0, 255], size: 10, type: Entity.TYPELINES});
pyramid.getStyle().color = [255, 255, 255];
pyramid.getStyle().type = Entity.TYPEPOLYGONUS;
cube2.setStyle({color: [0, 255, 0], size: 10, type: Entity.TYPEPOLYGONUS});
cube2.getPolygonus()[0].color = [255, 0, 0];
cube2.getStyle().color = [0, 0, 255];
cube2.getPolygonus()[0].texture = "images/terra_lado.png";
cube2.getPolygonus()[1].texture = "images/terra_lado.png";
cube2.getPolygonus()[2].texture = "images/terra_lado.png";
cube2.getPolygonus()[3].texture = "images/terra_lado.png";
cube2.getPolygonus()[4].texture = "images/terra_cima.jpeg";
cube2.getPolygonus()[5].texture = "images/terra_baixo.jpg";
//Adicionar itens no layout
scene.addItem(plane, 0, -1, 0);
scene.addItem(cube, 0, 0, 0);
scene.addItem(cube.clone(), -7, 0, 0);
scene.addItem(pyramid, 7, 0, 0);
scene.addItem(cube2, 0, 2, 0);
scene.addItem(cube2.clone(), -6, 0, 8);
scene.addItem(cube2.clone(), -4, 0, );
scene.addItem(cube2.clone(), -2, 0, 8);
scene.addItem(cube2.clone(), 0, 0, 6);
scene.addItem(cube2.clone(), 2, 0, 8);
scene.addItem(cube2.clone(), 4, 0, 10);
scene.addItem(cube2.clone(), 6, 0, 8);
//Start animação
view.frameAnimation(() => {
   scene.getCamera().translate(controllConfig.translate.x, controllConfig.translate.y, controllConfig.translate.z);
   scene.getCamera().rotate(controllConfig.rotate.x, controllConfig.rotate.y, controllConfig.rotate.z);
  cube2.rotate(0.02, 0, 0)
  scene.render();
  view.render();
});
