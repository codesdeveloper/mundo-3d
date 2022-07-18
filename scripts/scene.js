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
        out = this.getCamera().transform(
          position.x + out.x - cposition.x,
          position.y + out.y - cposition.y,
          position.z + out.z - cposition.z);

        var dist = (out.z) * 0.2;
        var size = (vp.width + vp.height) * 0.04;

        if (dist <= 0) dist = 0.0001;

        coords.push({
          x: vp.width / 2 + out.x * size / dist,
          y: vp.height / 2 + -out.y * size / dist,
          z: (out.z < 0) ? 0 : out.z
        });

      }

      item.sortPolygonus((a, b) => {
        var av = a.vertices,
          bv = b.vertices;
          
          var ax = (coords[av[0]].x + coords[av[1]].x + coords[av[2]].x + coords[av[3]].x) / 4;
          var bx = (coords[bv[0]].x + coords[bv[1]].x + coords[bv[2]].x + coords[bv[3]].x) / 4;
          
          var ay = (coords[av[0]].y + coords[av[1]].y + coords[av[2]].y + coords[av[3]].y) / 4;
          var by = (coords[bv[0]].y + coords[bv[1]].y + coords[bv[2]].y + coords[bv[3]].y) / 4;
          
          var az = (coords[av[0]].z + coords[av[1]].z + coords[av[2]].z + coords[av[3]].z) / 4;
          var bz = (coords[bv[0]].z + coords[bv[1]].z + coords[bv[2]].z + coords[bv[3]].z) / 4;
          
          var ar = Math.sqrt(ax * ax + ay * ay + az * az)
          var br = Math.sqrt(bx * bx + by * by + bz * bz)
          
          return (ar < br ? 1 : -1); 
          
      });

      item.setCoords(coords);

    }
  };

}
