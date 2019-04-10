/* 不能使用小括号的情况 */
/* let [(webName)] = ['蚂蚁部落'] // 小括号是运算符，它与操作数webName构成一个表达式
console.log(webName) // SyntaxError: Unexpected token ( */

let node = {
    type: '123',
    name: '456'
  }/* ,
  type = 'Number',
  name = 5  */
  
({
  type: type,
  name: nName
} = node)
console.log(type, nName) // String foo

let url
({ url } = { url: 'www.softwhy.com' })
console.log(url)