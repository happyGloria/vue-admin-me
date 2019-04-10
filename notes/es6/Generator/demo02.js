function* gen () {
  yield 123 + 456;
}
var g = gen();
console.log(g.next()); //{ value: 579, done: false }
console.log(g.next()); //{ value: undefined, done: true }

function* gen2 () {
  yield 123 + 456;
  return 'ending';
  yield 'step 2';
  return 'end';
}

var g2 = gen2();
console.log(g2.next()); //{ value: 579, done: false }
console.log(g2.next()); //{ value: 'ending', done: true }
console.log(g2.next()); //{ value: undefined, done: true }

