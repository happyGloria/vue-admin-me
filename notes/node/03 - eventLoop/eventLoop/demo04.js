var fs = require("fs");
var debug = require('./debug')('example1');

debug("begin");

fs.readFile('./package.json','utf-8',function(err,data){
  if(err)
    debug(err);
  else
    debug("get file content");
});

setTimeout(function(){
  debug("timeout2");
});

debug('end'); // 运行到这里之前，事件循环是暂停的