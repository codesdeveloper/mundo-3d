class Controller {

  static TYPECOMPUTER = 212121;
  static TYPEPHONE = 378473;
  static TYPETECLADO = 738742;
    
  translate = {x:0, y:0, z: 0};
  rotate = {x: 0, y:0, z:0 };
  isFull = false;

  constructor(tye){print(000);
    document.onkeydown = function(e) {
      var c = Math.cos(lookat.y),
        s = Math.sin(lookat.y);
        
        print(e);
        
      switch (e.keyCode) {
        case 65:
          camera.translate(-c, 0, s);
          break;
        case 68:
          camera.translate(c, 0, -s);
          break;
        case 87:
          camera.translate(s, 0, c);
          break;
        case 83:
          camera.translate(-s, 0, -c);
          break;
        case 69:
          camera.translate(0, 1, 0);
          break;
        case 81:
          camera.translate(0, -1, 0);
          break;
      };
    };
  }

  active = function(){

  }

  desative = function(){

  }

    /*
    var elem = document.documentElement;
    function openFullscreen() {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox 
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari & Opera 
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { // IE/Edge 
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





addController: function(camera, area) {
    var lookat = camera.getLookat();
    var isMove = false;
    var velocity = 0.01  ;
    var start = { x: 0, y: 0 };
    var isFull = false;
   
    document.onkeydown = function(e) {
      var c = Math.cos(lookat.y),
        s = Math.sin(lookat.y);
        
        print(e.keyCode);
        
      switch (e.keyCode) {
        case 65:
          camera.translate(-c, 0, s);
          break;
        case 68:
          camera.translate(c, 0, -s);
          break;
        case 87:
          camera.translate(s, 0, c);
          break;
        case 83:
          camera.translate(-s, 0, -c);
          break;
        case 69:
          camera.translate(0, 1, 0);
          break;
        case 81:
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
        posY * s * velocity
        );
    }
    area.onmouseup = function(e) {
      isMove = false;
    }
    
    
    /*
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
      // 


  }
*/


};