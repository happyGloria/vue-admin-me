Promise.all([1, 2, 3, 4]).then(data => {
  console.log('data:', data)
})

Promise.all([1, 2, 3, 4]).then(([,,a,b,d = 'hello']) => {
  console.log('values:', a, b, d)
})