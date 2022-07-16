class View {

  #FPS;
  #canvas;
  #scene;

  setScene = function(scene) {
    this.#scene = scene;
  }

  setCanvas = function(canvas) {
    this.#canvas = canvas;
  };

  setFPS = function(fps) {
    this.#FPS = fps;
  };

  frameAnimation = function(callback) {
    window.setInterval(callback, 1000 / this.#FPS);
  };

  render = function() {
    var itens = this.#scene.getItens();
    var ctx = this.#canvas.getContext("2d");
    var vp = this.#scene.getViewport();
    ctx.clearRect(vp.x, vp.y, vp.width, vp.height);

    for (var i = 0; i < itens.length; ++i) {
      var item = itens[i];
      var coords = item.getCoords();
      var style = item.getStyle();

      ctx.fillStyle = "rgb(" + style.color + ")";
      ctx.strokeStyle = "rgb(" + style.color + ")";

      if (style.type == Entity.TYPEPOINTS)
        for (var j = 0; j < coords.length; ++j) {
          var coord = coords[j];
          if (coord.z <= 0) continue;
          ctx.beginPath();
          ctx.arc(coord.x, coord.y, style.size / (coord.z * 0.2), 0, Math.PI * 2);
          ctx.fill();
        }

      if (style.type == Entity.TYPELINES)
        for (var j = 0; j < item.getEdges().length; ++j) {
          var edge = item.getEdges()[j];
          var a = coords[edge.a], b = coords[edge.b];
          if (a.z <= 0 && b.z <= 0) continue

          var ind = (a.z + b.z) * 0.5;
          if(ind < 1)ind = 1;
          ctx.lineWidth = style.size / ind;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }



    }
  }

}
