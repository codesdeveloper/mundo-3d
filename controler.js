class Control {

  rotate = { x: 0, y: 0, z: 0 };
  translate = { x: 0, y: 0, z: 0 };
  isTouchpad = false;
  itens_scene = [];
  itens_show = [];
  itens_available = [];
  isFull = true;
  lookat = { x: 0, y: 0, z: 0 };
  
  #longclick = null;
  #start = {x: 0, y: 0}
  #isMove = false;
  #move_event = null;

  #initHtml = function () {
    $('body').append($('<div/>').addClass('control')
      .html(`<form id="itens-list"><div class="itens-list"></div></form><input type="checkbox" id="modal-check" />
    <label for="modal-check" class="modal-bg"></label><div class="modal-other"><h3>Addicionar Itens</h3>
    <label for="modal-check" class="modal-close"><i class="bi bi-x"></i></label><div class="modal-list"></div></div>   
    <label class="full"><input type="checkbox" class="full-check"><i class="a bi bi-arrows-fullscreen"></i>
    <i class="b bi bi-arrows-angle-contract"></i></label><div class="refresh"><i class="bi bi-arrow-clockwise"></i></div>
    <span id="toast"></span>`));

    let itens_list = $('.itens-list');
    for (let i = 0; i < 9; i++)
      itens_list.append($('<label/>').addClass('item')
        .html(`<input type="radio" name="rad"/><img src="images/terra_lado.png"/>`));

    itens_list.append($('<label/>').addClass('item other').attr('for', 'modal-check').html('<i class="bi bi-three-dots"></i>'));

    let modal_list = $('.modal-list');
    for (let i = 0; i < 42; i++) {
      modal_list.append($('<div/>').addClass('modal-item')
        .html(`<img src="images/terra_lado.png"/>`));
    }

    // mobile touchpad
    //<div class="move-full">


  }

  toast = function (msg) {
    var toast = $("#toast");
    if (msg == null) toast.hide();
    else toast.html(msg).show();
  };

  init = () => {

    this.#initHtml();
    $(".control").show();

    //add efect check list
    $('#itens-list').change(() => {
      $('.itens-list .item input').parent().css('background', 'transparent');
      $('.itens-list .item input:checked').parent().css('background', '#333a');
    })

    //load scene of local storage
    let scene_lookat = window.localStorage.getItem('scene_lookat');
    if (scene_lookat != null) {
      let obj = JSON.parse(scene_lookat);
      scene.setCamera(new Matrix(obj.data, obj.lookat));
    }

    //load scene of local storage
    let scene_position = window.localStorage.getItem('scene_position');
    if (scene_position != null) {
      let obj = JSON.parse(scene_position);
      scene.getCamera().setPosition(obj.x, obj.y, obj.z);
    }

    //load scene of local storage
    let itens_scene = window.localStorage.getItem('itens_scene');
    if (itens_scene != null) {
      let itens = JSON.parse(itens_scene);
      if (itens.length > 0) {
        this.itens_scene = itens;
        itens.map(e => {
          scene.addItem(new Textures.createCube(), e.x, e.y, e.z);
        })
      }
    }

    //refresh local storage e itens
    $('.refresh').click(() => {
      let is = confirm('Deseja excluir todos os itens?');
      if (is) {
        window.localStorage.removeItem('itens_scene');
        window.localStorage.removeItem('scene_position');
        window.localStorage.removeItem('scene_lookat');
        this.itens_scene = [];
        window.location.reload();
      }
    })
    
    //addicionar evenetos
    $(document).on({
      click: (e) => this.#click(e, this),
      keydown: (e) => this.#keydown(e),
      keyup: (e) => this.#keyup(),
      mousedown:  (e) => this.#mousedown(e, this),
      mousemove:  (e) => this.#mousemove(e, this),
      mouseup:  (e) => this.#mouseup(e, this)
    });

    $('.full').click(this.#full);

    //touchpad mobile controller
    /* if (config.isTouchpad) {
       $('.move-full').show().on({
         touchmove: function (t) {
           var touch = t.touches[0];
           var x = ((touch.clientX - (canvas.width / 2)) / (canvas.width / 2));
           var y = ((touch.clientY - (canvas.height / 2)) / (canvas.height / 2));
           x = (x < -1) ? -1 : (x > 1) ? 1 : x;
           y = (y < -1) ? -1 : (y > 1) ? 1 : y;
           var c = Math.cos(lookat.y),
             s = Math.sin(lookat.y);
           config.rotate = { x: y * -c * 0.07, y: x * 0.07, z: y * s * 0.07, };
         },
         touchend: function () {
           config.rotate = { x: 0, y: 0, z: 0 };
         }
       })
     }*/

  }

  #click = function (e, thiz) {
    var retorno = view.getClick(e.clientX, e.clientY);

    if (retorno == null) return;
    var item = retorno.entity;
    var ind = retorno.ind;

    let points = item.getPoints();
    let pos = item.getPosition();

    let polys = item.getPolygonus();
    let verts = polys[ind].vertices;

    let a = points[verts[0]];
    let b = points[verts[1]];
    let c = points[verts[2]];
    let d = points[verts[3]];

    let x = (a.x + b.x + c.x + d.x) / 4;
    let y = (a.y + b.y + c.y + d.y) / 4;
    let z = (a.z + b.z + c.z + d.z) / 4;

    scene.addItem(new Textures.createCube(), (pos.x + (x * 2)), (pos.y + (y * 2)), (pos.z + (z * 2)));
    thiz.itens_scene.push({ type: 'cube', x: (pos.x + (x * 2)), y: (pos.y + (y * 2)), z: (pos.z + (z * 2)) });
    window.localStorage.setItem('itens_scene', JSON.stringify(this.itens_scene));
  };

  #keydown = function (e) {
    var c = Math.cos(this.lookat.y),
      s = Math.sin(this.lookat.y);
    switch (e.keyCode) {
      case 65:
        this.translate = { x: -c, y: 0, z: s };
        break;
      case 68:
        this.translate = { x: c, y: 0, z: -s };
        break;
      case 87:
        this.translate = { x: s, y: 0, z: c };
        break;
      case 83:
        this.translate = { x: -s, y: 0, z: -c };
        break;
      case 69:
        this.translate.y = 1;
        break;
      case 81:
        this.translate.y = -1;
        break;
      case 37:
        this.rotate.y = -0.1;
        break;
      case 39:
        this.rotate.y = 0.1;
        break;
      case 38:
        this.rotate = { x: 0.1 * c, y: 0, z: 0.1 * -s };
        break;
      case 40:
        this.rotate = { x: 0.1 * -c, y: 0, z: 0.1 * s };
        break;
    }

    let cam = scene.getCamera();
    window.localStorage.setItem('scene_position', JSON.stringify(cam.getPosition()));
    window.localStorage.setItem('scene_lookat', JSON.stringify({ lookat: cam.getLookat(), data: cam.getData() }));
  }

  #keyup = function () {
    this.translate = { x: 0, y: 0, z: 0 };
    this.rotate = { x: 0, y: 0, z: 0 };
  }

  #mousedown = function (a) {
    this.#start.x = a.clientX;
    this.#start.y = a.clientY;
    this.#isMove = true;
    
    this.#longclick = window.setInterval(() => {
      let retorno = view.getClick(a.clientX, a.clientY);
      if (retorno == null) return;
      var item = retorno.entity;
      scene.remove(item);
      let pos = item.getPosition();
      thiz.itens_scene = this.itens_scene.filter(e => {
        if (e.x == pos.x && e.y == pos.y && e.z == pos.z);
        else return e;
      })
      window.localStorage.setItem('itens_scene', JSON.stringify(this.itens_scene));
    }, 1000);
    
  }

  #mousemove = function (e) {
    if (!this.#isMove) return;

    if(this.#move_event)clearTimeout(this.#move_event);

    var c = Math.cos(this.lookat.y),
      s = Math.sin(this.lookat.y);
    var x = (e.clientX - this.#start.x);
    var y = (e.clientY - this.#start.y);

    x = (x < -10) ? -10 : (x > 10) ? 10 : x;
    y = (y < -10) ? -10 : (y > 10) ? 10 : y;

    let vel = 0.008;
    this.rotate = { x: y * -c * vel, y: x * vel, z: y * s * vel };
    let cam = scene.getCamera();
    window.localStorage.setItem('scene_lookat', JSON.stringify({ lookat: cam.getLookat(), data: cam.getData() }));

   this.#move_event = setTimeout(() => {
      this.rotate = { x: 0, y: 0, z: 0 };
    }, 10);
  }

  #mouseup = function () {
    this.#isMove = false;
    this.rotate = { x: 0, y: 0, z: 0 };
    window.clearInterval(this.#longclick);
  }

  #full = function () {
    var elem = document.documentElement;
    if (this.isFull) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      this.isFull = false;
    } else {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
      canvas.height = scene.getViewport().height = screen.height;
      this.isFull = true;

    }
  };



}




//Adicionar Controle

/*

//touchpad mobile controller
var size = (canvas.width + canvas.height) * 0.08;




/*
      
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
          var touch = t.touches[0];
          var ofset = div2.position();
          var x = ((touch.clientX - ofset.left - (size / 2)) / (size / 2));
          var y = ((touch.clientY - ofset.top - (size / 2)) / (size / 2));
          x = (x < -1) ? -1 : (x > 1) ? 1 : x;
          y = (y < -1) ? -1 : (y > 1) ? 1 : y;
          var c = Math.cos(lookat.y),
            s = Math.sin(lookat.y);
          control.translate = { x: x * c + y * -s, y: 0, z: x * -s + y * -c };
        },
        touchend: function () {
          control.translate = { x: 0, y: 0, z: 0 };
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
          var touch = t.touches[0];
          var ofset = div3.position();
          var y = ((touch.clientY - ofset.top - (size / 2)) / (size / 2));
          y = (y < -1) ? -1 : (y > 1) ? 1 : y;
          control.translate.y = -y;
        },
        touchend: function () {
          control.translate.y = 0;
        }
      });
      $("body").append(div3);
    
    };

    */