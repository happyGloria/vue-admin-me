function a () {
  setTimeout(() => {
    console.log('a2');
  }, 1000);

  process.nextTick(() => {
    setTimeout(() => {
      console.log('a4');
    });
    console.log('a3');
  }, 2000);

  console.log('a1');
}
function b () {
  process.nextTick(() => {
    console.log('b1');
  })
}

a();
b();