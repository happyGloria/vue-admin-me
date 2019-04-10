作为一个node新手，书写本文，是为了加深对node的http模块理解；

书写本文前，本人还未学习express框架；如果学习了express,就会知道express.static可以达到我们下文的目的
app.use(express.static('public'))

基本功能：
1. 在任意目录启动的静态文件服务器;
2. 显示目录下的文件列表和返回内容；
缓存、压缩、获取部分数据

1. 指定端口启动http server;
2. 当请求到达，根据url,设置静态文件目录,映射得到文件位置；
3. 检查文件是否存在； 
	 是：
	 	打开文件待读取，设置response header, 发送文件到客户端
	 否： 返回404，发送not found页面到客户端
	 

1. 借助yargs模块, 实现命令行启动服务
2. 