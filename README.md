
# TODO LIST
- 使用一些便捷的组件（redux-actions redux-saga等）
- 添加API模拟。https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#integrating-with-an-api-backend
- 单元测试用例相关

# 目录结构

```
|- build  打包生成的目录
|- doc  文档目录
|- public  静态资源目录，该文件夹不会被webpack打包
|- src  源代码目录
|-- actions  Action目录
|-- components  组件View目录
|-- containers  组件容器目录
|-- middlewares  中间件目录
|-- reducers  reducer目录
|-- routes  路由目录
|-- store  store目录
|-- utils  工具目录
|-- index.css  全局定义的CSS样式（不会被模块化）
|-- index.js  程序的主入口
|- package.json
```


