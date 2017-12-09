> 这是第一次用`vue`打造的项目(我是`react`玩家，拿`vue`练练手，挺容易上手的，也挺好玩)，界面随便设计的，也没做适配。
> [项目预览](https://littlezong.github.io)

### 项目用到的技术(适合对es6有所了解的同学参考学习)
> 0.基于`vue-cli`脚手架，主要使用了`vue` + `vue-router` + `es6` + `sass`；

> 1.安装了`element-ui`，按需加载。吐槽下这框架真不好用，组件少，而且用个按钮组件没问题但控制台老是报`elFormItem`错误。可能这套ui不适于博客类型网站；

> 2.利用了`lean-cloud`来存储数据(其实也就访问量和点赞数)，leancloud文档[地址](https://leancloud.cn/docs/leanstorage_guide-js.html)；

> 3.通过`marked.js`和`highlight.js`实现了**解析markdown文件**和**高亮代码块**；

> 4.通过`axios`来异步请求加载数据；

> 5.引入了`font-awesome`图标库；


### Setup

```bash
# 将项目拷贝到mydir目录下
$ git clone https://github.com/littlezong/gnoz.git mydir

# 进入项目
$ cd mydir

# 安装依赖(推荐yarn，记得设置淘宝代理)
$ npm install (or yarn install)

# 本地运行
$ npm start (or yarn start)

# 打包
$ npm run build (or yarn run build)
```

### npm start成功后可访问 http://localhost:8085

#### 如有发现问题欢迎反馈，也可以互相学习交流。
