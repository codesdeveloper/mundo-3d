var Entity = function(){
 this.points = []; //position[3], coords[3]                
 this.edges = []; //a[1], b[1], coords[3]
 this.polygonus = []; //vertices[4], normal[3], coords[3], color[3], textures, direct   //var verts = polygonus[2].splice(0, 3); var direct = []

 this.style = ["solid", [175, 175, 175] , 0.5]; // viewtype[1], color[3], lineWidth[1]  

 this.name = "";
 this.id = 0;
 this.disable = false;

 this.matrix = new Matrix();
 this.rotate = this.matrix.rotate;
 this.translate = this.matrix.translate;
 this.scale = this.matrix.scale;
 this.transform = this.matrix.transform; 


 //function implementada para adicionar luzess
 this.normalize = function(){
  for(var i = 0; i < this.polygonus.length; ++i){
   var v = this.polygonus[i];
   var p = this.points;
   v.pos = [(p[v[0]][0] + p[v[1]][0] + p[v[2]][0] + p[v[3]][0]) / 4,
	(p[v[0]][1] + p[v[1]][1] + p[v[2]][1] + p[v[3]][1]) / 4,
	(p[v[0]][2] + p[v[1]][2] + p[v[2]][2] + p[v[3]][2]) / 4];
  }
 };



 this.clone = function(){
  var base = new Entity();
  for(var i = 0; i < this.points.length; i++) base.points.push(this.points[i].slice());
  for(var i = 0; i < this.edges.length; i++) base.edges.push(this.edges[i].slice());
  for(var i = 0; i < this.polygonus.length; i++) base.polygonus.push(this.polygonus[i].slice());
  base.style = this.style.slice();
  base.name = this.name + "";
  base.id = this.id + 0;
  base.matrix = this.matrix.clone();
  return base;
 };

 this.toString = function(){ 
  return ("[Entity[" + this.name + "]]");
 };
};

//key, name, id, points, edges, polygnos, matrix
Entity.Decode = function(data){
 var entity = new Entity();
 var split = data.split("|");
 //key
 if(split[0] != "[Entity["){ console.log("type of input invaid"); return;}
 entity.name = split[1];
 entity.id = split[2];
 //points
 var p = split[3].split(",");
 for(var i = 0;i < p.length;i += 3)entity.points.push([parseInt(p[i]), parseInt(p[i + 1]), parseInt(p[i + 2]), 0, 0, 0]);
 //edges
 if(!split[4])return entity;
 var p = split[4].split(",");
 for(var i = 0;i < p.length;i += 2)entity.edges.push([p[i], p[i + 1]]);
 //polygonus
 if(!split[5])return entity;
 var p = split[5].split(".");
 for(var i = 0; i < p.length; ++i)entity.polygonus.push(p[i].split(","));
 entity.normalize();
 return entity;
};

  
