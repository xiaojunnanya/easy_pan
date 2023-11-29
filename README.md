## 网盘项目

个人网盘项目

后端部分：[kbws13/Netdisk](https://github.com/kbws13/Netdisk)

个人博客：www.xiaojunnan.cn



## 前提

- node版本：16.16.0
- 安装环境：`npm i`
- 运行：`npm start`
- React + TS



## 项目结构

```markdown
├── public
│   └── favicon.ico               # 图标
|   └── index.html                # 根
├── src
│   ├── assets                    # 静态文件
│   ├── components                # 组件
│   ├── router                    # 路由
│   ├── service                   # 前后端交互
│   ├── store                     # 仓库
│   ├── utils                     # 工具
│   ├── views                     # 视图
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   └── setupProxy.js             # 本地开发设置代理
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## 依赖

常见的并没有做解释
- `spark-md5`：用户输入密码加密
- `highlight.js`：代码高亮
- `copy-to-clipboard`：复制到剪切板
- `react-pdf`：pdf预览
- `DPlayer`：视频播放


## 待解决

- 设置模块
- 修改头像
- 修改密码
- 重命名
- 移动
- 批量移动
- 空数据的时候上传文件+新建文件夹
- 文件预览：pdf+doc+ppt+excel+音频
- 面包屑
- 注册
- 忘记密码
- QQ快捷登录
- 验证码
- 文件上传+web worket
- 分页
- 视频加载速度的优化

## 其他的问题

对于每个模块的复用性感觉做的不是很好，特别是对于表格发复用，在多处的地方都用到了表格，
但是每个地方的标题与展示内容都造成了对于其封装的困难

## 项目难点与亮点

对于网盘项目来说，项目的难点与亮点自然就是大文件上传了
我计划添加web worker来解决对于文件过大阻塞单一线程造成浏览器卡顿的问题