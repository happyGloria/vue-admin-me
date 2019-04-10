/* var oBox:any = document.getElementById('box');
oBox.style.color = 'red'; */

var num2:number | undefined;
console.log(num2);
num2 = 123;

function run():void {
  console.log('run');
}
run();

/* function run1(): undefined {
  // 错误， A function whose declared type is neither 'void' nor 'any' must return a value.
  console.log('run1')
}
run1() */

function run2():number {
  return 1;
}

console.log('run2:', run2());