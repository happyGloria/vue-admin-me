setTimeout(function() {
  console.log('setTimeout');
  process.nextTick(function() {
    console.log('nextTick1');
  });
});

console.log('main1');

function say () {
  console.log('hello！');
  process.nextTick(function() {
    console.log('nextTick2');
  });
}

new Promise(function(resolve) {
  process.nextTick(function() {
    console.log('nextTick3');
  });
  console.log('primise 1')
  resolve('promise then');
}).then(function(data) {
  console.log(data);
});

console.log('main2');

process.nextTick(function() {
  console.log('nextTick4');
});

say();

