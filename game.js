//Definição de variaveis
const width = window.innerWidth,
  height = window.innerHeight;
let canvas = document.getElementById("canvas");
let scene = new Scene();
let view = new View();

// Configurações do game
canvas.width = width;
canvas.height = height;
scene.setViewport({ width: width, height: height, x: 0, y: 0 });
scene.getCamera().setPosition(0, 0, -4);
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
cube2.getStyle().type = Entity.TYPELINES;
cube2.getStyle().size = 20;

//Adicionar itens no layout
scene.addItem(plane, 0, -1, 0);
scene.addItem(cube2, 0, 0, 0);
// scene.addItem(cube.clone(), -7, 0, 0);
// scene.addItem(pyramid, 7, 0, 0);

//Configurações do controle
var controll = {
  active: true,
  rotate: { x: 0, y: 0, z: 0 },
  translate: { x: 0, y: 0, z: 0 },
  start: { x: 0, y: 0 },
  isMove: false,
  isTouchpad: false
}

//Start animação
view.frameAnimation(() => {
  var trans = controll.translate;
  var rot = controll.rotate;
  scene.getCamera().translate(trans.x, trans.y, trans.z);
   scene.getCamera().rotate(rot.x, rot.y, rot.z);
  // cube2.rotate(0.02, 0, 0);
  scene.render();
  view.render();
  //view.stopAnimation();
});








//Adicionar Controle
var lookat = scene.getCamera().getLookat();
$(document).on({
  click: function (e) {
    if (!controll.active) return;
    // var retorno = view.getClick(e.clientX, e.clientY, 1);

    // if(retorno != null){
    //   var item = retorno.entity;
    //   var ind = retorno.ind;

    //   var points = item.getPoints();
    //   print(ind);
    //   points.splice(ind, 1);

    // }



  },
  keydown: function (e) {
    if (!controll.active) return;
    var c = Math.cos(lookat.y),
      s = Math.sin(lookat.y);console.log(e.keyCode);
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
  keyup: function () {
    if (!controll.active) return;
    controll.translate = { x: 0, y: 0, z: 0 };
    controll.rotate = { x: 0, y: 0, z: 0 };
  },
  mousedown: function (e) {
    if (!controll.active) return;
    controll.start.x = e.clientX;
    controll.start.y = e.clientY;
    controll.isMove = true;
  },
  mousemove: function (e) {

    var retorno = view.getClick(e.clientX, e.clientY, 1);

    if (!controll.active || !controll.isMove) return;
    var c = Math.cos(lookat.y),
      s = Math.sin(lookat.y);
    var x = (e.clientX - controll.start.x);
    var y = (e.clientY - controll.start.y);
    x = (x < -10) ? -10 : (x > 10) ? 10 : x;
    y = (y < -10) ? -10 : (y > 10) ? 10 : y;
    controll.rotate = { x: y * -c * 0.005, y: x * 0.005, z: y * s * 0.005 };
  },
  mouseup: function (e) {
    if (!controll.active) return;
    controll.isMove = false;
    controll.rotate = { x: 0, y: 0, z: 0 };
  }
});

var size = (canvas.width + canvas.height) * 0.08;
if (controll.isTouchpad) {
  var div1 = $("<div/>").css({
    width: canvas.width,
    height: canvas.height,
    position: "absolute",
    left: 0,
    top: 0,
  }).on({
    touchmove: function (t) {
      if (!controll.active) return;
      var touch = t.touches[0];
      var x = ((touch.clientX - (canvas.width / 2)) / (canvas.width / 2));
      var y = ((touch.clientY - (canvas.height / 2)) / (canvas.height / 2));
      x = (x < -1) ? -1 : (x > 1) ? 1 : x;
      y = (y < -1) ? -1 : (y > 1) ? 1 : y;
      var c = Math.cos(lookat.y),
        s = Math.sin(lookat.y);
      controll.rotate = { x: y * -c * 0.07, y: x * 0.07, z: y * s * 0.07, };
    },
    touchend: function () {
      if (!controll.active) return;
      controll.rotate = { x: 0, y: 0, z: 0 };
    }
  });
  $("body").append(div1);

  var div2 = $("<div/>").css({
    width: size,
    height: size,
    left: 10,
    bottom: 10,
    border: "2px solid green",
    position: "absolute",
    "border-radius": "10px"
  }).on({
    touchmove: function (t) {
      if (!controll.active) return;
      var touch = t.touches[0];
      var ofset = div2.position();
      var x = ((touch.clientX - ofset.left - (size / 2)) / (size / 2));
      var y = ((touch.clientY - ofset.top - (size / 2)) / (size / 2));
      x = (x < -1) ? -1 : (x > 1) ? 1 : x;
      y = (y < -1) ? -1 : (y > 1) ? 1 : y;
      var c = Math.cos(lookat.y),
        s = Math.sin(lookat.y);
      controll.translate = { x: x * c + y * -s, y: 0, z: x * -s + y * -c };
    },
    touchend: function () {
      if (!controll.active) return;
      controll.translate = { x: 0, y: 0, z: 0 };
    }
  });
  $("body").append(div2);

  var div3 = $("<div/>").css({
    width: size / 2,
    height: size,
    right: 10,
    bottom: 10,
    border: "2px solid green",
    position: "absolute",
    "border-radius": "10px"
  }).on({
    touchmove: function (t) {
      if (!controll.active) return;
      var touch = t.touches[0];
      var ofset = div3.position();
      var y = ((touch.clientY - ofset.top - (size / 2)) / (size / 2));
      y = (y < -1) ? -1 : (y > 1) ? 1 : y;
      controll.translate.y = -y;
    },
    touchend: function () {
      if (!controll.active) return;
      controll.translate.y = 0;
    }
  });
  $("body").append(div3);

};

var div4 = $("<div/>").css({
  width: size / 4,
  height: size / 4,
  right: 10,
  top: 10,
  border: "2px solid green",
  position: "absolute",
  "border-radius": "10px"
}).click(function () {
  var elem = document.documentElement;
  if (!controll.active) retutn;
  if (controll.isFull) {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    controll.isFull = false;
  } else {
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    canvas.height = scene.getViewport().height = screen.height;
    controll.isFull = true;
  }
});
$("body").append(div4);

var span = $("<span/>")
span.hide().attr("id", "print").css({
  position: "absolute",
  bottom: "10px",
  left: "50%",
  color: "red",
  border: "2px solid green",
  padding: "7px",
  "border-radius": "10px"
});
$("body").append(span);

window.print = function (msg) {
  var print = $("#print");
  if (msg == null) print.hide();
  else print.html(msg).show();
};
