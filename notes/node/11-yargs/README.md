# 命令行程序开发

## 1. js可执行脚本, 创建hello文件。
文件第一行需要有 #!/usr/bin/env node
$ chmod 755 hello
$ .hello

- 如果想把 hello 前面的路径去除，可以将 hello 的路径加入环境变量 PATH。
但是，另一种更好的做法，是在当前目录下新建 package.json ，写入下面的内容:

{
  "name": "hello",
  "bin": {
    "hello": "hello"
  }
}

$ npm link  //执行npm link

相当于 在全局下增加了一个链接

D:\nodeJS\node_global\hello -> D:\nodeJS\node_global\node_modules\hello\hello

D:\nodeJS\node_global\node_modules\hello -> E:\frame\node-test\11-yargs

然后在全局下就可以执行hello命令，而不需要写./hello等方式，指定前面的路径了；

$ hello 

## 2. 命令行参数写法

1） 由系统变量process.argv获取, 前两个参数分别为，所以要从第三个参数获取，如果不传参数的话，是undefined;

['C:\\Program Files\\nodejs\\node.exe','D:\\nodeJS\\node_global\\node_modules\\hello\\hello']

2） 执行时，直接在脚本文件后面，加上参数即可。

$ hello zhaodan

上面这段代码其实执行的就是node hello zhaodan;


##  3. 新建进程

require('child_process') 模块新建子进程，从而执行unix系统命令；是node模块，不用单独安装；
```
#!/usr/bin/env node
var name = process.argv[2];
var exec = require('child_process').exec;

var child = exec('echo hello ' + name, function(err, stdout, stderr) {
  if (err) throw err;
  console.log(stdout);
});
```
$ ./hellochild -d
hello -d

## 4. shelljs模块

shelljs 模块重新包装了 child_process，调用系统命令更加方便, 需要安装；

$ npm install --save shelljs

## 5. yargs模块

shelljs 只解决了如何调用 shell 命令，而 yargs 模块能够解决如何处理命令行参数。它也需要安装。

1） yargs模块提供了argv模块，来读取命令行参数；
```
#!/usr/bin/env node
var argv = require('yargs').argv;
console.log('hello ' + argv.name)
```

$ ./helloyargs --name zhaodan
$ ./helloyargs --name=gloria

yargs将上述结果改成了一个对象，每个参数都是一个键值对

$ node hello --name=tom

相当于：
argv = {
  name: tom
};

2) 使用alias方法指定name是n的别名
```
var argv = require('yargs')
    .alias('n', 'name')
    .argv;
```
3) argv._ 属性 获取非连词线开头的参数

4) 命令行参数配置

- demand：是否必选
- default：默认值
- describe：提示

5) 通过option 统一配置参数
```
var argv = require('yargs')
    .option('n', {
        alias: 'name',
        demand: true,
        default: 'zhaodan',
        describe: 'your name',
        type: 'string'
    })
    .argv
```

6) 帮助信息
- usage：用法格式
- example：提供例子
- help：显示帮助信息
- epilog：出现在帮助信息的结尾

```
var argv = require('yargs')
    .option('n', {
        alias: 'name',
        demand: true,
        default: 'zz',
        describe: 'your name',
        type: 'string'
    })
    .usage('Usage hello [options]')
    .example('hello -n zhangsan', 'say hello tp zhangsan')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2018')
    .argv
```

7) 子命令

通过command方法，设置git风格的子命令


