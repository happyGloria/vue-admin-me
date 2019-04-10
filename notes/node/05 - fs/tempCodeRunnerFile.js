let fs = require('fs')
function mkdirSync(p) {
  let dirs = p.split('/'); // [m,q,d]
  for(let i = 0 ; i<dirs.length;i++){
    let currentPath = __dirname + '/' + dirs.slice(0,i+1).join('/');
    try{
      fs.accessSync(currentPath);
    }catch(e){
      fs.mkdirSync(currentPath);
    }
  }
}
mkdirSync('m/q/d');