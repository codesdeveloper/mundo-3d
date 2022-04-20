var Matrix = function(data){
 var base = (data) ? data : [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0];//matrix[9], position[3], scale[3], lookat[3]   

 this.rotate = function(x, y, z){
  var m = base.slice(), c = Math.cos(x), s = Math.sin(x);
  base[3] = m[3] * c + m[6] * s; base[4] = m[4] * c + m[7] * s; base[5] = m[5] * c + m[8] * s;
  base[6] = m[6] * c - m[3] * s; base[7] = m[7] * c - m[4] * s; base[8] = m[8] * c - m[5] * s;
  base[15] += x;
  var m = base.slice(), c = Math.cos(y), s = Math.sin(y);
  base[0] = m[0] * c + m[6] * s; base[1] = m[1] * c + m[7] * s; base[2] = m[2] * c + m[8] * s;
  base[6] = m[6] * c - m[0] * s; base[7] = m[7] * c - m[1] * s; base[8] = m[8] * c - m[2] * s;
  base[16] += y;
  var m = base.slice(), c = Math.cos(z), s = Math.sin(z);
  base[0] = m[0] * c + m[3] * s; base[1] = m[1] * c + m[4] * s; base[2] = m[2] * c + m[5] * s;
  base[3] = m[3] * c - m[0] * s; base[4] = m[4] * c - m[1] * s; base[5] = m[5] * c - m[2] * s;
  base[17] += z;
 };

 this.translate = function(x, y, z){
  base[09] += x;
  base[10] += y;
  base[11] += z;
 };

 this.scale = function(x, y, z){
  base[12] *= x;
  base[13] *= y;
  base[14] *= z;
 };

 this.transform = function(x, y, z){
  var b = base;  
  return [b[0] * x + b[1] * y + b[2] * z, b[3] * x + b[4] * y + b[5] * z, b[6] * x + b[7] * y + b[8] * z];
 };

 this.getMatrix = function(){  
  return base;
 };

 this.getPosition = function(){
  return [base[9], base[10], base[11]];
 };

 this.getScale = function(){
  return [base[12], base[13], base[14]];
 };

 this.getLookat = function(){
  return [base[15], base[16], base[17]];
 };

 this.clone = function(){
  return new Matrix(base.slice());
 };

};
