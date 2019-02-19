var obj = {
  name: 'zhang'
}
Object.defineProperty(obj, 'name', {
  configurable: false,
  writable: false,
  value: 'ddd' // 是否可修改
})
console.log(obj)

