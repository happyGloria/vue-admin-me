var obj1 = {
    a: 1
  },
  obj2 = {
    b: 2
  },
  newObj = {
    ...obj1,
    ...obj2
  }

console.log(newObj)