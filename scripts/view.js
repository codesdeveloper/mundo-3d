class View {

  #FPS;
  #canvas;
  #scene;
  #animation;

  setScene = function (scene) {
    this.#scene = scene;
  }

  setCanvas = function (canvas) {
    this.#canvas = canvas;
  };

  setFPS = function (fps) {
    this.#FPS = fps;
  };

  frameAnimation = function (callback) {
    this.#animation = window.setInterval(callback, 1000 / this.#FPS);
  };

  stopAnimation = function () {
    window.clearInterval(this.#animation);
  }

  getClick = function (x, y) {
    var itens = this.#scene.getItens();

    for (var i = itens.length - 1; i >= 0; --i) {
      var item = itens[i];
      if (item.disable) continue;

      var style = item.getStyle();

      var coords = item.getCoords();// Util.cloneObject(item.getCoords());
      /*coords.sort(function(a, b){
        return (a.z > b.z ? -1 : 1)
      });*/

      //search point
      if (style.type == Entity.TYPEPOINTS)
        for (var j = 0; j < coords.length; ++j) {
          let coord = coords[j];
          if (this.context.isPointInPath(coord.path, x, y)) {
            return {
              type: Entity.TYPEPOINTS,
              entity: item,
              ind: j
            }
          };
        }

      // search edges
      if (style.type == Entity.TYPELINES)
        for (var j = item.getEdges().length - 1; j >= 0; --j) {
          let edge = item.getEdges()[j];
          if (this.context.isPointInStroke(edge.path, x, y)) {
            return {
              type: Entity.TYPELINES,
              entity: item,
              ind: j
            }
          };
        }

      //search polygonus
      if (style.type == Entity.TYPEPOLYGONUS)
        for (var j = item.getPolygonus().length - 1; j >= 0; --j) {
          let poly = item.getPolygonus()[j];
          if (this.context.isPointInPath(poly.path, x, y)) {
            return {
              type: Entity.TYPEPOLYGONUS,
              entity: item,
              ind: j
            }
          };
        }

    }

  };

  render = function () {
    var itens = this.#scene.getItens();
    var ctx = this.context = this.#canvas.getContext("2d");
    var vp = this.#scene.getViewport();
    ctx.clearRect(vp.x, vp.y, vp.width, vp.height);

    ctx.beginPath();
    ctx.moveTo(vp.x, vp.y);
    ctx.lineTo(vp.x + vp.width, vp.y);
    ctx.lineTo(vp.x + vp.width, vp.y + vp.height);
    ctx.lineTo(vp.x, vp.y + vp.height);
    ctx.lineTo(vp.x, vp.y);
    ctx.clip();
    ctx.stroke();

    for (var i = 0; i < itens.length; ++i) {
      var item = itens[i];
      if (item.disable) continue;
      let coords = item.getCoords();
      let style = item.getStyle();

      ctx.fillStyle = "rgb(" + style.color + ")";
      ctx.strokeStyle = "rgb(" + style.color + ")";

      //renderizar points
      if (style.type == Entity.TYPEPOINTS)
        for (var j = 0; j < coords.length; ++j) {
          var coord = coords[j];
          if (coord.z <= 0) continue;
          var path = coord.path = new Path2D();
          path.arc(coord.x, coord.y, style.size / (coord.z * 0.2), 0, Math.PI * 2);
          ctx.fill(path);
        }

      //renderizar linhas
      if (style.type == Entity.TYPELINES)
        for (var j = 0; j < item.getEdges().length; ++j) {
          var edge = item.getEdges()[j];
          var a = coords[edge.a], b = coords[edge.b];
          if (a.z <= 0 && b.z <= 0) continue;
          var path = edge.path = new Path2D();
          var ind = (a.z + b.z) * 0.5;
          if (ind < 1) ind = 1;
          ctx.lineWidth = style.size / ind;
          path.moveTo(a.x, a.y);
          path.lineTo(b.x, b.y);
          ctx.stroke(path);
        }

      //renderizar polygonus
      if (style.type == Entity.TYPEPOLYGONUS)
        for (var j = 0; j < item.getPolygonus().length; ++j) {

          let poly = item.getPolygonus()[j];
          let path = poly.path = new Path2D();
          let vert = poly.vertices;

          var a = coords[vert[0]],
            b = coords[vert[1]],
            c = coords[vert[2]],
            d = coords[vert[3]];

          if (!style.twoSides && poly.wordCoords.z > 0) continue;

          let endX = vp.x + vp.width;
          let endY = vp.y + vp.height;

          if (a.z < 1 && b.z < 1 && c.z < 1 && d.z < 1) continue
          if (a.x < vp.x && b.x < vp.x && c.x < vp.x && d.z < vp.x) continue
          if (a.y < vp.y && b.y < vp.y && c.y < vp.y && d.y < vp.y) continue
          if (a.x > endX && b.x > endX && c.x > endX && d.x > endX) continue;
          if (a.y > endY && b.y > endY && c.y > endY && d.y > endY) continue;
          if (a.z > vp.z) continue;

          path.moveTo(a.x, a.y);
          path.lineTo(b.x, b.y);
          path.lineTo(c.x, c.y);
          path.lineTo(d.x, d.y);

          let color = style.color;
          if (poly.color) color = poly.color;

          let z = -poly.wordCoords.z;
          let bri = style.shine;
          color = [
            Math.max(Math.round(color[0] * z * bri), 0),
            Math.max(Math.round(color[1] * z * bri), 0),
            Math.max(Math.round(color[2] * z * bri), 0)
          ];

          ctx.fillStyle = 'rgb(' + color + ')';
          ctx.strokeStyle = 'green';

          ctx.fill(path);
          ctx.stroke(path);



          {
            //     if (poly.texture) {
            //       var img = document.createElement("img");
            //       img.src = poly.texture;

            //       var x = Math.min(a.x, b.x, c.x, d.x);
            //       var y = Math.min(a.y, b.y, c.y, d.y);

            //       var w = Math.max(a.x, b.x, c.x, d.x);
            //       var h = Math.max(a.y, b.y, c.y, d.y);

            //       var data = item.getData();
            //       var out = item.transform(1, 1, 1);

            //       // ctx.translate(vp.with/2, vp.height/2);

            //      
            //       // ctx.setTransform(data[0], -data[1],
            //       //                   -data[3], data[4],
            //       //                   a.x, a.y);

            //       // ctx.setTransform((b.x - a.x),  (b.y - a.y),
            //       //                             (d.x - a.x), (d.y - a.y),
            //       //                           a.x, a.y);

            //       // ctx.rotate(-item.getLookat().z);


            //       // start
            //       var rad = item.getLookat().x + item.getLookat().y + item.getLookat().z;
            //       var cos = Math.cos(rad);
            //       var sin = Math.sin(rad);

            //       var mx = b.x - a.x;
            //       var my = b.y - a.y;

            //       var tes = (my * -sin  + mx * cos);

            //       //segundo

            //       var mx = d.x - a.x;
            //       var my = d.y - a.y;

            //       var tes2 = (my * cos + mx * sin);
            //       //end
            //       // ctx.scale(100, 100);

            //       ctx.drawImage(img, 0, 0, 1, 1)



            //     }

            //   ctx.restore();

            //   // ctx.fill();













            /*
            
            
            
              ctx.save();
              
              var poly = item.getPolygonus()[j];
    
              ctx.fillStyle = "rgb(" + (poly.color ? poly.color : style.color) + ")";        
    
              var vert = poly.vertices;
    
              var a = coords[vert[0]],
                b = coords[vert[1]],
                c = coords[vert[2]],
                d = coords[vert[3]];
    
              // if (a.z < 1 && b.z < 1 && c.z < 1 && d.z < 1) continue
    
    
              //ctx.strokeStyle = "red";
              //ctx.fillStyle = "gray";
              //primeiro triangulo
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.lineTo(c.x, c.y);
              ctx.clip();
              ctx.fill();
              // ctx.stroke();
              var img = document.createElement("img");
              img.src = poly.texture;
              var data = item.getData();
              var out = item.transform(1, 1, 1);
              ctx.setTransform((b.x - a.x),  (b.y - a.y), (c.x - b.x), (c.y - b.y), a.x, a.y);
              ctx.drawImage(img, 0, 0, 1, 1)
              ctx.restore();
              /* //segundo triangulo *//*
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(c.x, c.y);
  ctx.lineTo(d.x, d.y);
  ctx.clip();
  ctx.fill();
  // ctx.stroke();
  var img = document.createElement("img");
  img.src = poly.texture;
  var data = item.getData();
  var out = item.transform(1, 1, 1);
  ctx.setTransform((c.x - d.x), (c.y - d.y), (d.x - a.x), (d.y - a.y), a.x, a.y);
  ctx.drawImage(img, 0, 0, 1, 1);
  ctx.restore();
  // */

            /*
                      ctx.strokeStyle = "red";
                      
                      ctx.clip();
            
                        //segundo triangulo
                       ctx.beginPath();
                       
                       ctx.moveTo(a.x, a.y);
                       ctx.lineTo(b.x, b.y);
                       ctx.lineTo(c.x, c.y);
                       ctx.lineTo(d.x, d.y);
                       
                       ctx.strokeStyle = "red";
                       
                       ctx.clip();
                       */

            // ctx.closePath();
            /*
                      ctx.fill();
                      ctx.stroke();
            
                      if (poly.texture) {
                        var img = document.createElement("img");
                        img.src = poly.texture;
            
                        var x = Math.min(a.x, b.x, c.x, d.x);
                        var y = Math.min(a.y, b.y, c.y, d.y);
                        
                        var w = Math.max(a.x, b.x, c.x, d.x);
                        var h = Math.max(a.y, b.y, c.y, d.y);
                        
                        var data = item.getData();
                        var out = item.transform(1, 1, 1);
                        
                        // ctx.translate(vp.with/2, vp.height/2);
                        
                        
                        // ctx.setTransform(data[0], -data[1],
                        //                   -data[3], data[4],
                        //                   a.x, a.y);
                         
                        // ctx.setTransform((b.x - a.x),  (b.y - a.y),
                        //                             (d.x - a.x), (d.y - a.y),
                        //                           a.x, a.y);
                           
                        // ctx.rotate(-item.getLookat().z);
                        
                        
                        // start
                        var rad = item.getLookat().x + item.getLookat().y + item.getLookat().z;
                        var cos = Math.cos(rad);
                        var sin = Math.sin(rad);
                      
                        var mx = b.x - a.x;
                        var my = b.y - a.y;
                        
                        var tes = (my * -sin  + mx * cos);
                        
                        //segundo
                        
                        var mx = d.x - a.x;
                        var my = d.y - a.y;
                        
                        var tes2 = (my * cos + mx * sin);
                        //end
                        // ctx.scale(100, 100);
                        
                        ctx.drawImage(img, 0, 0, 1, 1)
            // 
            
            
                      }
                    */
            //  ctx.restore();

            // ctx.fill();
          }


        }




    }
  }

}
