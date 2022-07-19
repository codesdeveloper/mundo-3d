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
          var a = coords[edge.a],
            b = coords[edge.b];
          if (a.z <= 0 && b.z <= 0) continue

          var ind = (a.z + b.z) * 0.5;
          if (ind < 1) ind = 1;
          ctx.lineWidth = style.size / ind;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

      if (style.type == Entity.TYPEPOLYGONUS)
        for (var j = 0; j < item.getPolygonus().length; ++j) {
          
      //     ctx.save();
          
      //     var poly = item.getPolygonus()[j];

      //     ctx.fillStyle = "rgb(" + (poly.color ? poly.color : style.color) + ")";

      //     var vert = poly.vertices;

      //     var a = coords[vert[0]],
      //       b = coords[vert[1]],
      //       c = coords[vert[2]],
      //       d = coords[vert[3]];

      //     if (a.z < 1 && b.z < 1 && c.z < 1 && d.z < 1) continue

      //     ctx.beginPath();

      //     ctx.moveTo(a.x, a.y);
      //     ctx.lineTo(b.x, b.y);
      //     ctx.lineTo(c.x, c.y);
      //     ctx.lineTo(d.x, d.y);

      //     ctx.strokeStyle = "red";
          
      //     ctx.clip();

           
      //     // ctx.closePath();

      //     ctx.fill();
      //     ctx.stroke();

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
            
      //       print(data[0]);
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
        
        









        
        
        
        
        
        
          ctx.save();
          
          var poly = item.getPolygonus()[j];

          ctx.fillStyle = "rgb(" + (poly.color ? poly.color : style.color) + ")";
          
          
          

          var vert = poly.vertices;

          var a = coords[vert[0]],
            b = coords[vert[1]],
            c = coords[vert[2]],
            d = coords[vert[3]];

          // if (a.z < 1 && b.z < 1 && c.z < 1 && d.z < 1) continue


          ctx.strokeStyle = "gray";
          ctx.fillStyle = "gray";
          //primeiro triangulo
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineTo(c.x, c.y);
          ctx.clip();
          ctx.fill();
          ctx.stroke();
          var img = document.createElement("img");
          img.src = poly.texture;
          var data = item.getData();
          var out = item.transform(1, 1, 1);
          ctx.setTransform((b.x - a.x),  (b.y - a.y), (c.x - b.x), (c.y - b.y), a.x, a.y);
          ctx.drawImage(img, 0, 0, 1, 1)
          ctx.restore();
          /* //segundo triangulo */
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(c.x, c.y);
          ctx.lineTo(d.x, d.y);
          ctx.clip();
          ctx.fill();
          ctx.stroke();
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
            
            print(data[0]);
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
         ctx.restore();
        
        // ctx.fill();





        }
        
        


    }
  }

}
