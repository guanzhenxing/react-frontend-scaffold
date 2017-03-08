
# TODO LIST
- 添加API模拟。https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#integrating-with-an-api-backend
- 单元测试用例相关
- 直接运行的项目。例如：运行npm run start:prod 即可运行生产环境
# 目录结构

```
|- _doc  文档目录
|- build  打包生成的目录
|- config  配置目录
|- public  静态资源目录，该文件夹不会被webpack打包
|- scripts  运行脚本目录
|- src  源代码目录
|-- actions  action目录
|-- components  组件View目录
|-- constants   常量目录
|-- containers  组件容器目录
|-- models  业务模块处理目录（主要为saga使用）
|-- reducers  reducer目录
|-- repositories 持久化（数据请求）
|-- store  store目录
|---- middlewares  中间件目录
|-- utils  工具目录
|-- global-styles.js  全局定义的CSS样式（不会被模块化）
|-- index.js  程序的主入口
|-- routes.js 路由
|- package.json
```

# 附加说明

- i18n暂时不提供，可以使用Intl。参考：[react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)
