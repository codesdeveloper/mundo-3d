var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

var controllConfig = {
  translate : {x:0, y:0, z:0},
  rotate : {x:0, y:0, z:0}
};



const Util = {

  cloneObject: function(object) {
    if (object == null) return null;

    if (object instanceof Array) {
      var arr = [];
      for (var i = 0; i < object.length; ++i)
        arr.push(this.cloneObject(object[i]));
      return arr;
    };

    if (object instanceof Object) {
      var item = {};
      //var arr = Object.entries(object);console.log(arr);
      var arr = Object.keys(object);
      for (var i = 0; i < arr.length; ++i) {
        var key = arr[i];
        item[this.cloneObject(key)] = this.cloneObject(object[key]);
      }
      return item
    };

    if (typeof object == "string") {
      return (object + "");
    };

    if (typeof object == "number") {
      return (object + 0);
    };

    if (typeof object == "boolean") {
      if (object) return true;
      else return false;
    };
  },

  addController: function(camera, area) {
    var lookat = camera.getLookat();
    var isMove = false;
    var velocity = 0.1;
    var start = { x: 0, y: 0 };
    var isFull = false;

    area.onkeydown = function(e) {
      var c = Math.cos(lookat.y),
        s = Math.sin(lookat.y);
      switch (e.keyCode) {
        case 37:
          print(43423423);
          camera.translate(-c, 0, -s);
          break;
        case 39:
          camera.translate(c, 0, s);
          break;
        case 38:
          camera.translate(-s, 0, c);
          break;
        case 40:
          camera.translate(s, 0, -c);
          break;
        case 87:
          camera.translate(0, 1, 0);
          break;
        case 83:
          camera.translate(0, -1, 0);
          break;
      };
    };
    area.onmousedown = function(e) {
      start.x = e.clientX;
      start.y = e.clientY;
      isMove = true;
    }
    area.onmousemove = function(e) {
      if (!isMove) return;
      var posX = (e.clientX - start.x);
      var posY = (e.clientY - start.y);
      posX = (posX < -10) ? -10 : (posX > 10) ? 10 : posX;
      posY = (posY < -10) ? -10 : (posY > 10) ? 10 : posY;

      var c = Math.cos(lookat.y),
        s = Math.sin(lookat.y);

      camera.rotate(
        posY * -c * velocity,
        posX * velocity,
        posY * s * velocity);
    }
    area.onmouseup = function(e) {
      isMove = false;
    }


    var size = (area.width + area.height) * 0.08;
    var margin = 10;
    var style = "border:2px solid green; position:absolute; border-radius:10px;";


    var controller = document.createElement("div");
    controller.setAttribute("style", "position:absolute;");
    controller.style.width = area.width + "px";
    controller.style.height = area.height + "px";
    controller.style.left = 0;
    controller.style.top = 0;
    controller.ontouchmove = controller.ontouchstart = function(t) {
      var touch = t.touches[0];
      var x = ((touch.clientX - (area.width / 2)) / (area.width / 2));
      var y = ((touch.clientY - (area.height / 2)) / (area.height / 2));
      x = (x < -1) ? -1 : (x > 1) ? 1 : x;
      y = (y < -1) ? -1 : (y > 1) ? 1 : y;
      var c = Math.cos(lookat.y),
        s = Math.sin(lookat.y);
         controllConfig.rotate = {x:y * -c * velocity, y:x * velocity, z:y * s * velocity,};
      //camera.rotate(0, x * velocity, 0);
    };
     controller.ontouchend = function() {
       controllConfig.rotate = { x: 0, y: 0, z: 0 };
     }

    var touchpad = document.createElement("div");
    touchpad.setAttribute("style", style);
    touchpad.style.width = size + "px";
    touchpad.style.height = size + "px";
    touchpad.style.left = margin + "px";
    touchpad.style.bottom = margin + "px";
    touchpad.ontouchmove = touchpad.ontouchstart = function(t) {
      var touch = t.touches[0];
      var x = ((touch.clientX - touchpad.offsetLeft - (size / 2)) / (size / 2));
      var y = ((touch.clientY - touchpad.offsetTop - (size / 2)) / (size / 2));
      x = (x < -1) ? -1 : (x > 1) ? 1 : x;
      y = (y < -1) ? -1 : (y > 1) ? 1 : y;
      var c = Math.cos(lookat.y),
        s = Math.sin(lookat.y);
        
         controllConfig.translate = {x:x*c+y*-s, y:0, z:x*-s+y*-c};
      // camera.translate(x * c + y * -s, 0, x * -s + y * -c);
    };
    
    touchpad.ontouchend = function() {
      controllConfig.translate = {x:0, y:0, z:0};
    }

    var updown = document.createElement("div");
    updown.setAttribute("style", style);
    updown.style.width = (size / 2) + "px";
    updown.style.height = size + "px";
    updown.style.right = margin + "px";
    updown.style.bottom = margin + "px";
    updown.ontouchmove = updown.ontouchstart = function(t) {
      var touch = t.touches[0];
      var y = ((touch.clientY - touchpad.offsetTop - (size / 2)) / (size / 2));
      y = (y < -1) ? -1 : (y > 1) ? 1 : y;
       controllConfig.translate.y = -y;
      // camera.translate(0, -y, 0);
    };
    
    updown.ontouchend = function(){
      controllConfig.translate.y = 0;  
    }

    var full = document.createElement("div");
    full.setAttribute("style", style);
    full.style.width = (size / 4) + "px";
    full.style.height = (size / 4) + "px";
    full.style.right = margin + "px";
    full.style.top = margin + "px";
    full.ontouchstart = function() {
      if (isFull) {
        closeFullscreen();
        isFull = false;
      } else {
        openFullscreen();
        isFull = true;
      }

    }

    document.body.appendChild(controller);
    document.body.appendChild(touchpad);
    document.body.appendChild(updown);
    document.body.appendChild(full);



    /*
      var updown = document.createElement("div");
      updown.setAttribute("style", style);
      
      updown.style.width = (size/2) + "px";
      updown.style.height = size + "px";
      updown.style.right = 10 + "px";
      updown.style.bottom = 10 + "px";
          
      
          
      var point = document.createElement("div");
      point.setAttribute("style", style);
      
      point.style.width = (size / 4) + "px";
      point.style.height = (size / 4) + "px";
      point.style.background = "blue"; 
      point.style.left = 10 + "px";
      point.style.top = 10 + "px";
      
      //touchpad.appendChild(point);
      //updown.appendChild(point.cloneNode());
      
      log(document.body.appendChild(touchpad));
      document.body.appendChild(updown);
      document.body.appendChild(full);
      document.body.appendChild(point);
      */
    /*
    var width = area.width * 0.4, height = area.height * 0.4;
    var x = (area.width - width) / 2, y = (area.height - height) / 2;
    
    
    var style = "<style> #block{top:"+y+"px; left:"+x+"px; width:"+width+"px;height:"+height+"px; border:2px solid red; position:absolute;}   </style>";
    var div = document.createElement("div");
    div.id = "block"; 
     document.head.innerHTML += style;
     document.body.appendChild(div);
     */
  }

}

const Textures = {

  createCube: function() {
    var item = new Entity();
    item.setName("Cube");
    item.setPoints([{ x: -1, y: 1, z: 1 }, { x: 1, y: 1, z: 1 }, { x: 1, y: -1, z: 1 }, { x: -1, y: -1, z: 1 }, { x: -1, y: 1, z: -1 }, { x: 1, y: 1, z: -1 }, { x: 1, y: -1, z: -1 }, { x: -1, y: -1, z: -1 }]);
    item.setEdges([{ a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 0 }, { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 }, { a: 7, b: 4 }, { a: 0, b: 4 }, { a: 1, b: 5 }, { a: 2, b: 6 }, { a: 3, b: 7 }]);
    item.setPolygonus([{ vertices: [1, 0, 3, 2] }, { vertices: [0, 4, 7, 3] }, { vertices: [4, 5, 6, 7] }, { vertices: [5, 1, 2, 6] }, { vertices: [0, 1, 5, 4] }, { vertices: [7, 6, 2, 3] }]);
    return item;
  },

  createPyramid: function() {
    var item = new Entity();
    item.setName("Pyramid");
    item.setPoints([{ x: 0, y: 1, z: 0 }, { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: -1, z: -1 }, { x: -1, y: -1, z: -1 }]);
    item.setEdges([{ a: 0, b: 1 }, { a: 0, b: 2 }, { a: 0, b: 3 }, { a: 0, b: 4 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 4, b: 1 }]);
    item.setPolygonus([{ vertices: [0, 0, 1, 2] }, { vertices: [0, 0, 2, 3] }, { vertices: [0, 0, 3, 4] }, { vertices: [0, 0, 4, 1] }, { vertices: [4, 3, 2, 1] }]);
    return item;
  },

  createPlane: function(w, h) {
    var item = new Entity();
    item.setName("Plane");

    var points = [],
      edges = [],
      polygonus = [];

    var ind = 0;

    for (var z = h / 2; z >= -h / 2; --z) {
      for (var x = -w / 2; x <= w / 2; ++x) {
        points.push({ x: x, y: 0, z: z });
        if (x > -w / 2) edges.push({ a: ind, b: ind - 1 });
        if (z < h / 2) edges.push({ a: ind, b: ind - w - 1 });
        if (x > w / 2 && x < h / 2) polygonus.push([{ vertices: [ind - w - 2, ind - w - 1, ind, ind - 1] }]);
        ++ind;
      }
    }

    item.setPoints(points);
    item.setEdges(edges);
    item.setPolygonus(polygonus);
    return item;
  },

}
