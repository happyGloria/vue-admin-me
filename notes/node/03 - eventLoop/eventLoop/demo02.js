function bar() {
  console.log(1);
  process.nextTick(function() {
    console.log('nextTick1');
  });
}

function foo() {
  console.log(2);
  bar();
}

setTimeout(() => {
  console.log(3)
});

foo();

