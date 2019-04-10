function getMsg(name: string):string;
function getMsg(age: number):string;
function getMsg(str: any): any {
  if(typeof str === 'string') {
    return '我叫：' + str;
  } else {
    return '我的年龄是' + str;
  }
}

console.log(getMsg(20));