let path = require('path');
console.log(path.join('a', 'b', 'c')); // a\b\c
console.log(path.join(__dirname, './a','./b'));  //f:\03-node\vue-admin-me\notes\node\06 - path\a\b

// 拼绝对地址
console.log(path.resolve('./a', './b')); // f:\03-node\vue-admin-me\a\b
console.log(path.resolve('/a', '/b')); // f:\b
console.log(path.resolve('/a', './b')); // f:\a\b
console.log(path.resolve('..', '.', 'a')); // f:\03-node\a


