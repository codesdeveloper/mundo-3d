var Scene = function(){

 this.camera = new Matrix();
 this.viewport = {x: 0, y: 0, width: 1024, heigth: 670};
 this.entities = [];
 this.lights = [];

 this.push = function(item, position){
  this.entities.push(item);
  if(position){
   var base = item.matrix.getMatrix();
   base[09] = position[0];
   base[10] = position[1];
   base[11] = position[2];
  }return this;
 };

 this.get = function(x, y, z){
  for(var j = 0; j < this.entities.length; ++j){
   var pos = this.entities[j].matrix.getPosition();
   if(pos.x == x && pos.y == y && pos.z == z)
	return this.entities[j];
   else return null;
  }
 };

 this.addLight = function(item, position){
  this.lights.push(item);
  if(position){
   item.x = position[0];
   item.y = position[1];
   item.z = position[2];
  }return this;
 };

 this.render = function(){
  for(var j = 0; j < this.entities.length; ++j){
   var entity = this.entities[j]; 
   var pos = entity.pos = [0, 0, 0];

   //render points
   var vpw = this.viewport.width / 2, vph = this.viewport.heigth / 2;
   var cp = this.camera.getPosition();
   var ep = entity.matrix.getPosition();;
   var es = entity.matrix.getScale();
   var len = entity.points.length;
   for(var i = 0;i < len;++i){
	var p = entity.points[i];
	var o = entity.transform(p[0] * es[0], p[1] * es[1], p[2] * es[2]);
	var o = this.camera.transform(o[0] + ep[0] - cp[0], o[1] + ep[1] - cp[1], o[2] + ep[2] - cp[2]);
	var z = (o[2]) > 0 ? (o[2]) : 0.001; 
	
	p[3] = o[0] / (z), p[4] = o[1] / (z), p[5] = o[2];
	
	p[6] = vpw + (o[0] / (z * 0.2) * (vpw + vph) / 2 * 0.5);
	p[7] = vph - (o[1] / (z * 0.2) * (vpw + vph) / 2 * 0.5);
	
	pos[0] += o[0] / len, pos[1] += o[1] / len, pos[2] += o[2] / len;
   };

   //render polygonus
   if(entity.style[0] == "solid"){
	for(var i = 0;i < entity.polygonus.length;++i){
	 var v = entity.polygonus[i];
	 var p = entity.points;
	 
	 var x = (p[v[0]][3] + p[v[1]][3] + p[v[2]][3] + p[v[3]][3]) / 4;
	 var y = (p[v[0]][4] + p[v[1]][4] + p[v[2]][5] + p[v[3]][4]) / 4;
	 var z = (p[v[0]][5] + p[v[1]][5] + p[v[2]][5] + p[v[3]][5]) / 4;
	 
	 v[5] = Math.sqrt(x*x + y*y + z*z);
	 v[6] = [x, y, z];
	 
	 var pos = v.pos;
	 var o  = entity.transform(pos[0], pos[1], pos[2]);
	 v.coords = this.camera.transform(o[0], o[1], o[2]);
	 
	 };
   };

   //sort polygonus
   entity.polygonus.sort(function(a, b){
	 return a[5] < b[5] ? 1 : -1; 
   });
   //
  };
  
  //sort objects
  this.entities.sort(function(a, b){
	 return a.pos[2] > b.pos[2] ? -1 : 1; 
   });
  
 };


};
