function getInfo(name: string, age?: number): string {
  if (age) {
    return `${name} --- ${age}`;
  } else {
    return `${name} --- 年龄保密`;
  }
}

console.log(getInfo('Gloria', 22));

function ajax(url: string, method: string = 'post', blob?: string): void {
  console.log(url, method);
}

// 剩余运算符
function sum(...result: number[]): number {
  var sum = 0;
  for (var i = 0; i < result.length; i++) {
    sum += result[i];
  }
  return sum;
}
console.log('sum: ', sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

function sum2(...args: number[]): number {
  return args.reduce((prev, cur) => {
    return cur + prev;
  }, 0);
}
console.log('sum2: ', sum2(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
