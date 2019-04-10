// 1. 属性接口

function printLabel(labelInfo: { label: string }): void {
  console.log('printLabel');
}
/* printLabel('hahah'); //错误写法
printLabel({ name: '张三' });  //错误的写法 */
printLabel({ label: '123' });

interface FullName {
  // 属性接口， 对传入对象的约束
  firstName: string;
  secondName?: string; // 可选参数
}

function printName(name: FullName) {
  console.log(name.firstName + '--' + name.secondName);
}

var param = {
  firstName: 'Zhang',
  secondName: 'San',
  age: 20,
};
printName(param); // 传入的参数，包含firstName secondName
