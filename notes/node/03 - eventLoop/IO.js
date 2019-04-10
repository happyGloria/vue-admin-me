var http = require('http');
var wait = function (mils) {
  var now = new Date();
  while(new Date() - now <= mils);
}