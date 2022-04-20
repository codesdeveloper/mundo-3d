var View = function(){

 this.canvas = null;
 this.scene = null;

 this.render = function(isScene){
  if(isScene)this.scene.render();
  var ctx = this.canvas.getContext("2d");
  var vp = this.scene.viewport;
  ///corigir cv para vp eidth heigh
  ctx.clearRect(vp.x, vp.y, cv.width, cv.height);
  for(var j = 0; j < this.scene.entities.length; ++j){
   var entity = this.scene.entities[j];
   var style = entity.style;

   //mode points
   if(entity.style[0] == "points"){
	ctx.fillStyle = "rgb(" + style[1] + ")";
	for(var i = 0;i < entity.points.length;++i){
	 var c = entity.points[i];
	 ctx.beginPath();
	 if(c[5] <= 0)continue;
	 //add lights
     ctx.arc(c[6], c[7], style[1] / c[5] * 10, 0, 2 * Math.PI);
     ctx.fill();
   	};
   };

   //mode lines
   if(entity.style[0] == "lines"){
	ctx.strokeStyle = "rgb(" + style[1] + ")";
	for(var i = 0;i < entity.edges.length;++i){
	 var e = entity.edges[i];
	 var p1 = entity.points[e[0]];
	 var p2 = entity.points[e[1]];
	 if(p1[5] < 0 && p2[5] < 0)continue;
	 //add lights
	 ctx.lineWidth = style[1] / ((p1[5] + p2[5]) / 2) * 10;
	 ctx.beginPath();
	 ctx.moveTo(p1[6], p1[7]);
	 ctx.lineTo(p2[6], p2[7]);
	 ctx.stroke();
	};
   };

   //mode solid
   if(entity.style[0] == "solid"){
	var c = entity.points;
	for(var i = 0; i < entity.polygonus.length; ++i){
	 var p = entity.polygonus[i];
	 //add lights
     var color = compLight(p, style[1]);
	 ctx.fillStyle = "rgb(" + color + ")";
	 ctx.beginPath();
	 ctx.lineTo(c[p[0]][6], c[p[0]][7]);
	 ctx.lineTo(c[p[1]][6], c[p[1]][7]);
	 ctx.lineTo(c[p[2]][6], c[p[2]][7]);
	 ctx.lineTo(c[p[3]][6], c[p[3]][7]);
	 ctx.fill(); //, ctx.stroke();
	};
   };

  }


 };

 /*
  //ligh of posicao para edges
  var compLight = function(item, pos){
  //iniciar configuracoes de point light

  //var  lpos =  this.cube.matrix.getPosition(); //{x: -2, y: 3, z: 2};//positiion da luz
  var lIntensity = 1;//intensidade da luz;
  var lcolor = [25, 2, 25];//cor da luz;

  var rgb = [0, 0, 0];

  var sub = {
  x: pos[0] - lpos.x,
  y: pos[1] - lpos.y,
  z: pos[2] - lpos.z};

  var distance = Math.sqrt(sub.x*sub.x + sub.y*sub.y + sub.z*sub.z);
  var dot = pos[0] * lpos.x + pos[1] * lpos.y + pos[2] * lpos.z;
  //if(dot <= 0)dot = 1;  //return rgb;

  //var attenuation = 1 * distance;
  var brightness = dot / distance; //dot * lIntensity / attenuation;

  var msg = "<br/> pos: " + pos;   
  msg += "<br/> lpos: " + lpos.x + ' ' + lpos.y + ' ' + lpos.z;
  msg += "<br/> distance: " + distance;
  msg += "<br/> dot: " + dot;
  msg += "<br/>britnees: " + brightness;
  print(msg);

  rgb[0] += brightness * lcolor[0];
  rgb[1] += brightness * lcolor[1];
  rgb[2] += brightness * lcolor[2];

  return [Math.min(rgb[0], 255), Math.min(rgb[1], 255), Math.min(rgb[2], 255)];  //*/

 //};

 var compLight = function(poly, color){
  
  //dados da luz
  var light = {
   color : [1, 0.2, 1],
   direct : [0, 0, -1],
   intensity : 1,
  };
  
  var rgb = [0, 0, 0];
  
  var d = light.direct;
  var c = poly.coords;
  
  var dot = c[0] * d[0] + c[1] * d[1] + c[2] * d[2];
  
  if(dot <= 0)return rgb;
    
  dot = dot * light.intensity;
  /*
  rgb[0] += Math.ceil(dot * color[0]);
  rgb[1] += Math.ceil(dot * color[1]);
  rgb[2] += Math.ceil(dot * color[2]);
  /*/
  rgb[0] += Math.ceil(dot * light.color[0] * color[0]);
  rgb[1] += Math.ceil(dot * light.color[1] * color[1]);
  rgb[2] += Math.ceil(dot * light.color[2] * color[2]);
  //*/
  return [Math.min(rgb[0], 255), Math.min(rgb[1], 255), Math.min(rgb[2], 255)]; 
   /////////////////////////////////////////////
   /////////////////////////////////////////////
   /////////////////////////////////////////////*/
  /*
   //iniciar configuracoes de point light
   var  pos = item.matrix.getPosition();//position do objeto
   var  lpos = {x: -2, y: 3, z: 2};//positiion da luz
   var lIntensity = 1;//intensidade da luz;
   var lcolor = [25, 2, 25];//cor da luz;

   var rgb = [0, 0, 0];

   var sub = {
   x: pos.x - lpos.x,
   y: pos.y - lpos.y,
   z: pos.z - lpos.z};

   var distance = Math.sqrt(sub.x*sub.x + sub.y*sub.y + sub.z*sub.z);
   var dot = pos.x * lpos.x + pos.y * lpos.y + pos.z * lpos.z;
   if(dot <= 0)return rgb;

   var attenuation = 1 * distance;
   var brightness = dot * lIntensity / attenuation;

   var msg = "";   
   msg += "<br/> distance: " + distance;
   msg += "<br/> dot: " + dot;
   msg += "<br/>britnees: " + brightness;
   print(msg);

   rgb[0] += brightness * lcolor[0];
   rgb[1] += brightness * lcolor[1];
   rgb[2] += brightness * lcolor[2];

   return [Math.min(rgb[0], 255), Math.min(rgb[1], 255), Math.min(rgb[2], 255)]; */ 
 }; 

};
