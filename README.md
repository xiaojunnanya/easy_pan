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
│   └── react-app-env.d.ts
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


## 待解决
- [ ] 设置模块
- [ ] 修改头像
- [ ] 修改密码
- [ ] 重命名
- [ ] 移动
- [ ] 批量移动
- [ ] 空数据的时候上传文件+新建文件夹
- [ ] 文件预览：pdf+doc+ppt+excel+视频+音频