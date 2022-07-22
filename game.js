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

//Definir objetos
var cube = Textures.createCube();
var pyramid = Textures.createPyramid();
var plane = Textures.createPlane(70, 70);
var cube2 = cube.clone();

//Configurações dos objetos
plane.setStyle({ color: [255, 255, 255], size: 10, type: Entity.TYPELINES });
cube.setStyle({ color: [0, 0, 255], size: 10, type: Entity.TYPELINES });
pyramid.getStyle().color = [255, 255, 255];
pyramid.getStyle().type = Entity.TYPEPOLYGONUS;
cube2.setStyle({ color: [0, 255, 0], size: 10, type: Entity.TYPEPOLYGONUS });
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
scene.addItem(cube2, 0, 0, 0);
scene.addItem(cube.clone(), -7, 0, 0);
scene.addItem(pyramid, 7, 0, 0);

var controll = {
  active: true,
  rotate: { x: 0, y: 0, z: 0 },
  translate: { x: 0, y: 0, z: 0 },
  start: { x: 0, y: 0 },
  isMove: false,
}

//Start animação
view.frameAnimation(() => {
  var trans = controll.translate;
  var rot = controll.rotate;
  scene.getCamera().translate(trans.x, trans.y, trans.z);
  scene.getCamera().rotate(rot.x, rot.y, rot.z);
  cube2.rotate(0.02, 0, 0);
  scene.render();
  view.render();
});


var lookat = scene.getCamera().getLookat();
$(document).on({

  click: function() {
    if (!controll.active) return;

  },

  keydown: function(e) {
    if (!controll.active) return;
    var c = Math.cos(lookat.y),
      s = Math.sin(lookat.y);
    switch (e.keyCode) {
      case 65:
        controll.translate = { x: -c, y: 0, z: s };
        break;
      case 68:
        controll.translate = { x: c, y: 0, z: -s };
        break;
      case 87:
        controll.translate = { x: s, y: 0, z: c };
        break;
      case 83:
        controll.translate = { x: -s, y: 0, z: -c };
        break;
      case 69:
        controll.translate.y = 1;
        break;
      case 81:
        controll.translate.y = -1;
        break;
      case 37:
        controll.rotate.y = -0.1;
        break;
      case 39:
        controll.rotate.y = 0.1;
        break;
      case 38:
        controll.rotate = { x: 0.1 * c, y: 0, z: 0.1 * -s };
        break;
      case 40:
        controll.rotate = { x: 0.1 * -c, y: 0, z: 0.1 * s };
        break;
    }
  },

  keyup: function() {
    if (!controll.active) return;
    controll.translate = { x: 0, y: 0, z: 0 };
    controll.rotate = { x: 0, y: 0, z: 0 };
  },

  mousedown: function(e) {
    if (!controll.active) return;
    controll.start.x = e.clientX;
    controll.start.y = e.clientY;
    controll.isMove = true;
  },

  mousemove: function(e) {
    if (!controll.active || !controll.isMove) return;
    var c = Math.cos(lookat.y),
      s = Math.sin(lookat.y);
    var x = (e.clientX - controll.start.x);
    var y = (e.clientY - controll.start.y);
    x = (x < -10) ? -10 : (x > 10) ? 10 : x;
    y = (y < -10) ? -10 : (y > 10) ? 10 : y;
    controll.rotate = {x: y * -c * 0.005, y: x * 0.005, z: y * s * 0.005};
  },

  mouseup: function(e) {
    if (!controll.active) return;
    controll.isMove = false;
    controll.rotate = { x: 0, y: 0, z: 0 };
  }

});