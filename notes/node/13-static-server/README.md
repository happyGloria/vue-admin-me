# zd-static-server 静态文件服务器说明

作用： 以任意目录作为静态文件根目录, 启动服务，获取资源

ps:
- node版本 v8.9.3

## 使用方式

1. npm安装 zd-static-server
```
$ npm install zd-static-server -g
```
2. 启动
```
$ npm install 
$ npm link
$ server -d pulic -p 8080 -o localhost

```
参数说明：

- -d/--dir //指定静态文件根目录 
- -p/--port //指定端口号
- -o/--host //指定监听的主机 

