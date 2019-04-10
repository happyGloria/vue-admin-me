var arr = [1, [[2, 3], 4], [5, 6]];
/* var flat = function* (a) {
  a.forEach((item) => {
    if (typeof item !== 'number') {
      yield * flat(item);
    } else {
      yield item;  //报错，因为forEach函数是个普通函数
    }
  })
}

for (var f of flat(arr)) {
  console.log(f);
} */

var flat = function* (a) {
  var len = a.length;
  for(var i=0;i<len;i++){
    var item = a[i];
    if(typeof item !== 'number'){
      yield* flat(item);
    }else{
      yield item;
    }
  }
}

for(var f of flat(arr)){
  console.log(f);
}