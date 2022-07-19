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
// scene.getCamera().rotate(0, -90 / 360 * Math.PI, 0);
view.setFPS(60);
view.setScene(scene);
view.setCanvas(canvas);

var cube = Textures.createCube();
var pyramid = Textures.createPyramid();
var plane = Textures.createPlane(70, 70);

plane.setStyle({color: [255, 255, 255], size: 10, type: Entity.TYPELINES});
cube.setStyle({color: [0, 0, 255], size: 10, type: Entity.TYPELINES});
pyramid.getStyle().color = [255, 255, 255];
pyramid.getStyle().type = Entity.TYPEPOLYGONUS;

var cube2 = cube.clone();
cube2.setStyle({color: [0, 255, 0], size: 10, type: Entity.TYPEPOLYGONUS});

scene.addItem(plane, 0, -1, 0);/*
scene.addItem(cube, 0, 0, 0);
scene.addItem(cube.clone(), -7, 0, 0);
scene.addItem(pyramid, 7, 0, 0);*/
// scene.addItem(cube2, 0, 2, 0);
/*
cube2.getPolygonus()[0].color = [255, 0, 0];
cube2.getStyle().color = [0, 0, 255];*/
cube2.getPolygonus()[0].texture = "images/terra_lado.png";
cube2.getPolygonus()[1].texture = "images/terra_lado.png";
cube2.getPolygonus()[2].texture = "images/terra_lado.png";
cube2.getPolygonus()[3].texture = "images/terra_lado.png";
cube2.getPolygonus()[4].texture = "images/terra_cima.jpeg";
cube2.getPolygonus()[5].texture = "images/terra_baixo.jpg";

scene.addItem(cube2.clone(), -6, 0, 8);
scene.addItem(cube2.clone(), -4, 0, );
scene.addItem(cube2.clone(), -2, 0, 8);
scene.addItem(cube2.clone(), 0, 0, 6);
scene.addItem(cube2.clone(), 2, 0, 8);
scene.addItem(cube2.clone(), 4, 0, 10);
scene.addItem(cube2.clone(), 6, 0, 8);


Util.addController(scene.getCamera(), canvas);

view.frameAnimation(() => {
  // cube.rotate(0, 0.01, 0, 0);
  
  scene.getCamera().translate(controllConfig.translate.x, controllConfig.translate.y, controllConfig.translate.z);
   scene.getCamera().rotate(controllConfig.rotate.x, controllConfig.rotate.y, controllConfig.rotate.z);
  ;
  
  cube2.rotate(0.02, 0, 0)
  
  scene.render();
  view.render();
});


// cube2.rotate(0, 0, 0.5, 0, 0)

