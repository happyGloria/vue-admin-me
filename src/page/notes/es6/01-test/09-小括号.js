let node = {
    type: 'String',
    name: 'foo'
  },
  type = 'Number',
  name = 5;
({
  type,
  name
} = node)
console.log(type, name) // String foo
