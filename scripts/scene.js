class Scene {

  #camera = new Matrix();
  #viewport = { width: 950, heigth: 500, x: 0, y: 0 };
  #itens = [];

  getCamera = function() {
    return this.#camera;
  }

  getViewport = function() {
    return this.#viewport;
  }

  getItens = function() {
    return this.#itens;
  }

  addItem = function(item, x, y, z) {
    if (x != null && y != null && z != null) item.setPosition(x, y, z);
    this.#itens.push(item);
  };

  setViewport = function(vp) {
    this.#viewport = vp;
  }

  render = function() {

    var vp = this.getViewport();
    var cposition = this.getCamera().getPosition();

    for (var i = 0; i < this.getItens().length; ++i) {
      var item = this.getItens()[i];

      var position = item.getPosition();

      var coords = [];

      for (var j = 0; j < item.getPoints().length; ++j) {
        var point = item.getPoints()[j];

        var out = item.transform(point.x, point.y, point.z);
        var dist = (out.z + position.z - cposition.z) * 0.2;

        coords.push({
          x: vp.width / 2 + (position.x - cposition.x + out.x) * (vp.width + vp.height) * 0.04 / dist,
          y: vp.height / 2 + (position.y + cposition.y + out.y) * (vp.width + vp.height) * 0.04 / dist,
          z: out.z
        })



      }

      item.setCoords(coords);


    }
  };

}
