class View {

  #FPS;
  #canvas;
  #scene;
  
  setScene = function(scene){
    this.#scene =  scene;
  }
  
  setCanvas = function(canvas) {
    this.#canvas = canvas;
  };

  setFPS = function(fps) {
    this.#FPS = fps;
  };

  frameAnimation = function(callback) {
    window.setInterval(callback, 1000/this.#FPS);
  };

  render = function() {
    var itens = this.#scene.getItens();
    var ctx = this.#canvas.getContext("2d");
    var vp = this.#scene.getViewport();
    ctx.clearRect(vp.x, vp.y, vp.width, vp.height);
    
    for(var i = 0;i < itens.length; ++i){
      var item = itens[i];
      for (var j = 0; j < item.getCoords().length; ++j) {
        var coord = item.getCoords()[j];
      
      ctx.beginPath();
      
      ctx.arc(coord.x, coord.y, 10, 0, Math.PI * 2);
      ctx.fill();
      }
      
      
      
      
    }
  }

}
