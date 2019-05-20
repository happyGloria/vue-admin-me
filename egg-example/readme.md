```
egg-project
├── package.json
├── app.js (可选) // 自定义启动时的初始化
├── agent.js (可选)
├── app
|   ├── router.js // 配置 URL 路由规则
│   ├── controller // 解析用户输入，处理后返回相应结果
│   |   └── home.js
│   ├── service (可选) // 业务逻辑层
│   |   └── user.js
│   ├── middleware (可选) // 中间件
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选) // 静态资源
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选) // 框架的扩展
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config // 配置文件
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test // 单元测试
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```