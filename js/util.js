var Textures = function(){

 this.plane = function(w, h){
  var base = "[Entity[|Plane|0|", points = "", edges = "", polygonus = "", ind = 0;
  for(var y = 0; y <= h; y++) for(var x = 0; x <= w; ++x){
	points += (x - (w / 2)) + "," + 0 + "," + (y - (h / 2) + ",");
	if(y > 0)edges += ind + "," + (ind - w - 1) + ",";
	if(x > 0)edges += (ind) + "," + (ind - 1) + ",";
	if(x > 0 && y > 0)polygonus += (ind - 1) + "," + ind + "," + (ind - w - 1) + "," + (ind - w - 2) + ".";
	ind++;
   }return Entity.Decode(base + points + "|" + edges.slice(0, -1) + "|" + polygonus.slice(0, -1));
 };

 this.cube = function(){
  var base = "[Entity[|Cube|0|-1,1,1,1,1,1,1,-1,1,-1,-1,1,-1,1,-1,1,1,-1,1,-1,-1,-1,-1,-1|0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,4,0,5,1,6,2,7,3|1,0,3,2.4,5,6,7.0,1,5,4.7,6,2,3.0,4,7,3.5,1,2,6";
  return Entity.Decode(base);
 };

 this.pyramid = function(){
  var base = "[Entity[|Pyramid|0|0,1,0,-1,-1,1,1,-1,1,1,-1,-1,-1,-1,-1|1,2,2,3,3,4,4,1,0,1,0,2,0,3,0,4|4,3,2,1.0,3,4,0.0,2,3,0.0,2,1,0.0,4,1,0";
  return Entity.Decode(base);
 };

};




var Controll = function(){

 this.width = 500;
 this.height = 500;
 this.lookat = {x:0, y:0};
 this.direction = {x:0, y:0};
 this.gravity = 0;
 this.onfull = null; 
 var isFull = false;
 
 this.start = function(){
  var thiz = this;
  
  var lookat = document.getElementById("lookat");
  var lookat_style = "width: " + this.width + ";height:" + this.height + "px";
  lookat.setAttribute("style", lookat_style);
 
  var move = {x: 0, y: 0};
  lookat.ontouchstart = function(e){
   var touch = e.touches[0];
   move.x = touch.clientX;
   move.y = touch.clientY;
  };
  
  lookat.ontouchmove = function(e){
   var touch = e.touches[0];
   var x = (touch.clientX - move.x) / ((thiz.width + thiz.height) / 2 * 0.2);
   thiz.lookat.x = (x < -1) ? -1 : (x > 1) ? 1 : x;
   var y = (touch.clientY - move.y) / ((thiz.width + thiz.height) / 2 * 0.2);
   thiz.lookat.y = (y < -1) ? -1 : (y > 1) ? 1 : y;
  }; 

  lookat.ontouchend = function(e){
   thiz.lookat = {x:0, y:0};
  }; 
  
  var direction = document.getElementById("direction");
  var w = (this.width + this.height) / 2 * 0.2, t = this.height - w;
  var style = "width: " + w + "px;height:" + w + "px;top:" + t + "px;left:" + 0 + "px;margin-left:10px;margin-top:-20px;";
  direction.setAttribute("style", style);

  direction.ontouchstart = function(e){
   this.ontouchmove(e);
  };
  
  direction.ontouchmove = function(e){
   var touch = e.touches[0];
   var x = (touch.clientX - (w / 2)) / (w / 2);
   thiz.direction.x = (x < -1) ? -1 : (x > 1) ? 1 : x;
   var y = (touch.clientY - t - (w / 2)) / (w / 2);
   thiz.direction.y = (y < -1) ? -1 : (y > 1) ? 1 : y;
  }; 

  direction.ontouchend = function(e){
   thiz.direction = {x:0, y:0};
  };

  var gravity = document.getElementById("gravity");
  var l = this.width - w / 2;
  var style = "width: " + (w / 2) + "px;height:" + w + "px;top:" + t + "px;left:" + l + "px;margin-top:-20px;margin-left:-20px";
  gravity.setAttribute("style", style);
  
  gravity.ontouchstart = gravity.ontouchmove = function(e){
   var touch = e.touches[0];
   var y = (touch.clientY - t - (w / 2)) / (w / 2);
   thiz.gravity = (y < -1) ? -1 : (y > 1) ? 1 : y;
   }; 

  gravity.ontouchend = function(e){
   thiz.gravity = 0;
  };
  
  var full = document.getElementById("full");
  style = "width:"+w*0.2 + ";height:"+w*0.2+";top:o;left:"+(this.width - w*0.2)+";margin-left:-20";
  full.setAttribute("style", style);
  
  full.ontouchstart = function(){
   thiz.onfull.requestFullscreen();
   console.log("full screen is start...");
  };
  
 };

};

