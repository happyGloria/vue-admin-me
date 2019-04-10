function* fun() {
  console.log('执行了')
}

var gen = fun();
gen.next();  //调用next()后,fun才会执行，否则永远不会执行
setTimeout(() => {
  gen.next();
}, 1000);

