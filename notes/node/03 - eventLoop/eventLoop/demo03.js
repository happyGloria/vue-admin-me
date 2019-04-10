var fs = require("fs");
var debug = require('./debug.js')('example3');

debug("begin");

setTimeout(function(){
  debug("timeout1");
  while (true);
});

setTimeout(function(){
  debug("timeout2");
});

debug('end');