
/**实现简易版的可写流
  let fs = require('fs');
  let ws = fs.createWriteStream('./1.txt',{
      flags:'w',
      mode:0o666,
      autoClose:true,//是否自动关闭文件
      encoding:'utf8',
      highWaterMark:3
  });
  let i = 9;
  function write(){
      let flag = true;
      while(flag && i>0){
          flag = ws.write((i--)+'');
      }
  }
  write();
  ws.on('drain',function () {
      write();
  });*/

/**
 * 1.
 * 2. 继承自EventEmitter
 *    借助util
 *    EventEmitter.call(this)
 * 3. 解构options参数到this上
 * 4. prototype.open方法
 * 5. prototype.write方法
 *    实现思路
 *    1) 判断当前后台是否在写入过程中，如果在写入过程中，则把这个数据放在待处理的缓存中；
 *    2) 如果不在写入过程中，可以直接写；
 *    实现步骤
 *    1) 内部添加一个缓存，使用数组代替 this.buffers
 *    2) 调用write方法，需要注意，open方法是个异步函数，优先级低，有可能调用write方法时，文件还没打开；
 *        ==》 判断this.fd  如果没有打开，调用open,然后在 回调中调用write
 *    3)
 *    4) 缓存区 > 水位线，触发drain
 *       只有缓存区写满了，那么
 *
 *    注意: 有一个bug，第二次fs.write的执行时机就不对了，这个时间需要往后延迟，使用process.nextTick或setImmediate

 * */

let EventListener = require('events');
