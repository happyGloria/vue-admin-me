var url = require('url');
/* 
console.log('url.parse()', url.parse('http://www.baidu.com'))
console.log('url.parse()', url.parse('http://www.baidu.com?name=zhagnsan&age=10'))
console.log('url.parse()', url.parse('http://www.baidu.com?name=zhagnsan&age=10', true)) */

console.log(url.resolve('http://example.com', '/one')) // http://example.com/one