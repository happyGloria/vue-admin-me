for (let i = 0; i < 10; i++) {
  console.log('内部i:', i)
}
console.log('外部i:', i) // ReferenceError: i is not defined
