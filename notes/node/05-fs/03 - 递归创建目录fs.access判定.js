// 创建目录 和 删除目录 

let fs = require('fs');
// 创建目录 需要保证创建的目录父级存在

// 文件存在后不能再次创建  fs.access
function mkDir(path, cbFn) {
  let dirs = path.split('/'),
    count = 0
  function next() { // 进行迭代操作
    if (count == dirs.length) return cbFn()
    let curPath = __dirname + '/' + dirs.slice(0, ++count).join('/')
    fs.access(curPath, err => {
      err ? fs.mkdir(curPath, () => next()) : next()
      // 当前文件夹存在就继续迭代
    })
  }
  next()
}
mkDir('a/b/c', () => console.log('创建完成'))

/* let fs = require('fs')
function mkdirSync(p) {
  let dirs = p.split('/'); // [m,q,d]
  for(let i = 0 ; i<dirs.length;i++){
    let currentPath = __dirname + '/' + dirs.slice(0, i+1).join('/');
    try{
      fs.accessSync(currentPath);
    }catch(e){
      fs.mkdirSync(currentPath);
    }
  }
}
mkdirSync('m/q/d'); */
