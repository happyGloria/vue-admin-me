/**
 * 把本地一个 package.json 文件中的所有字母都改为小写，
 * 并保存到同目录下的 package-lower.json 文件下。
 * */

const fs = require('fs');
const rs = fs.createReadStream('./package.json');
const ws = fs.createWriteStream('./package-lower.json');

rs.pipe(lower).pipe(ws);
//https://www.cnblogs.com/dolphinX/p/6285240.html
