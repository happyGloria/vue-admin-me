let path = require('path');
console.log(path.join('a', 'b', 'c')); // a\b\c
console.log(path.join(__dirname, './a', './b')); //f:\03-node\vue-admin-me\notes\node\06 - path\a\b
// 拼绝对地址
console.log(path.resolve('./a', './b')); //E:\framework\nodeJS\06 - path\a\b
console.log(path.resolve('/a', '/b'));  //E:\b 前面会丢掉
console.log(path.resolve('/a', './b'));  //E:\a\b
console.log(path.resolve('..', '.', 'a'));
