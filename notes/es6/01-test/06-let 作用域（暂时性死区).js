for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('i:', i) // 0 1 2
  }, 1000)
}
for (var j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log('j:', j) // 3 3 3
  }, 1000)
}
for (let k = 0; k < 3; k++) {
  (function() {
    setTimeout(() => {
      console.log('k:', k) // 0 1 2
    }, 1000)
  })(k)
}
