setTimeout(function(){
  console.log('timer - value');
  setTimeout(arguments.callee, 10);
}, 1000);

setInterval(function(){
  console.log('interval - value');
}, 1000);